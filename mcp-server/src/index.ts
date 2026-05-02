#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Octokit } from "@octokit/rest";
import { z } from "zod";

// Environment variables - ALL REQUIRED, NO DEFAULTS
const REQUIRED_ENV_VARS = [
  "GITHUB_TOKEN",
  "GITHUB_OWNER",
  "POLICIES_REPO",
  "SKILLS_REPO",
  "DEFAULT_BRANCH",
  "METADATA_PATH",
] as const;

// Validate all required environment variables
function validateEnvironment(): void {
  const missing: string[] = [];
  
  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    const errorMessage = [
      "❌ Missing required environment variables:",
      "",
      ...missing.map(v => `  - ${v}`),
      "",
      "Please ensure all required variables are set in your .env file.",
      "See .env.example for a complete list of required variables.",
      "",
      "Quick fix:",
      "  1. Copy .env.example to .env",
      "  2. Fill in all required values",
      "  3. Restart the server",
    ].join("\n");
    
    throw new Error(errorMessage);
  }
}

// Validate environment before proceeding
validateEnvironment();

// Load validated environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const POLICIES_REPO = process.env.POLICIES_REPO!;
const SKILLS_REPO = process.env.SKILLS_REPO!;
const DEFAULT_BRANCH = process.env.DEFAULT_BRANCH!;
const METADATA_PATH = process.env.METADATA_PATH!;

// Initialize Octokit
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// Zod schemas for tool parameters
const ReadPolicyFileSchema = z.object({
  path: z.string().describe("File path within the skillet-policies repository"),
});

const ListPolicyFilesSchema = z.object({
  path: z.string().optional().describe("Directory path within the skillet-policies repository (default: root)"),
});

const ReadSkillFileSchema = z.object({
  path: z.string().describe("File path within the skillet-skills repository"),
});

const WriteSkillFileSchema = z.object({
  path: z.string().describe("File path within the skillet-skills repository"),
  content: z.string().describe("Content to write to the file"),
  message: z.string().describe("Commit message"),
  branch: z.string().optional().describe("Branch name (default: main)"),
});

const ListSkillFilesSchema = z.object({
  path: z.string().optional().describe("Directory path within the skillet-skills repository (default: root)"),
});

const UpdateSkillMetadataSchema = z.object({
  content: z.string().describe("Updated JSON content for skill-index.json"),
  message: z.string().describe("Commit message"),
});

const CreatePullRequestSchema = z.object({
  title: z.string().describe("Pull request title"),
  body: z.string().describe("Pull request description/body"),
  head: z.string().describe("Source branch name"),
  base: z.string().optional().describe("Target branch name (default: main)"),
  repo: z.string().optional().describe("Repository name (default: SKILLS_REPO)"),
});

const CreateBranchSchema = z.object({
  branch: z.string().describe("New branch name"),
  from_branch: z.string().optional().describe("Source branch to create from (default: main)"),
  repo: z.string().optional().describe("Repository name (default: SKILLS_REPO)"),
});

// Helper function to get file content from GitHub
async function getFileContent(
  owner: string,
  repo: string,
  path: string,
  branch: string = DEFAULT_BRANCH
): Promise<{ content: string; sha: string }> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if ("content" in response.data && response.data.type === "file") {
      const content = Buffer.from(response.data.content, "base64").toString("utf-8");
      return { content, sha: response.data.sha };
    }

    throw new Error(`Path ${path} is not a file`);
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error(`File not found: ${path}`);
    }
    throw error;
  }
}

// Helper function to list directory contents
async function listDirectory(
  owner: string,
  repo: string,
  path: string = "",
  branch: string = DEFAULT_BRANCH
): Promise<Array<{ name: string; path: string; type: string }>> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (Array.isArray(response.data)) {
      return response.data.map((item) => ({
        name: item.name,
        path: item.path,
        type: item.type,
      }));
    }

    throw new Error(`Path ${path} is not a directory`);
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error(`Directory not found: ${path}`);
    }
    throw error;
  }
}

// Helper function to create or update a file
async function createOrUpdateFile(
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  branch: string = DEFAULT_BRANCH
): Promise<void> {
  try {
    // Try to get existing file to get its SHA
    let sha: string | undefined;
    try {
      const existing = await getFileContent(owner, repo, path, branch);
      sha = existing.sha;
    } catch (error) {
      // File doesn't exist, that's okay
    }

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      sha,
    });
  } catch (error: any) {
    throw new Error(`Failed to write file: ${error.message}`);
  }
}

// Create MCP server
const server = new Server(
  {
    name: "skillet-github-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
const tools: Tool[] = [
  {
    name: "read_policy_file",
    description: "Read a file from the skillet-policies repository (read-only access)",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "File path within the skillet-policies repository",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "list_policy_files",
    description: "List files in a directory within the skillet-policies repository",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Directory path within the skillet-policies repository (default: root)",
        },
      },
    },
  },
  {
    name: "read_skill_file",
    description: "Read a file from the skillet-skills repository",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "File path within the skillet-skills repository",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "write_skill_file",
    description: "Create or update a file in the skillet-skills repository",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "File path within the skillet-skills repository",
        },
        content: {
          type: "string",
          description: "Content to write to the file",
        },
        message: {
          type: "string",
          description: "Commit message",
        },
        branch: {
          type: "string",
          description: "Branch name (default: main)",
        },
      },
      required: ["path", "content", "message"],
    },
  },
  {
    name: "list_skill_files",
    description: "List files in a directory within the skillet-skills repository",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Directory path within the skillet-skills repository (default: root)",
        },
      },
    },
  },
  {
    name: "update_skill_metadata",
    description: "Update the skill-index.json metadata file in the skillet-skills repository",
    inputSchema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "Updated JSON content for skill-index.json",
        },
        message: {
          type: "string",
          description: "Commit message",
        },
      },
      required: ["content", "message"],
    },
  },
  {
    name: "create_pull_request",
    description: "Create a pull request in a GitHub repository",
    inputSchema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Pull request title",
        },
        body: {
          type: "string",
          description: "Pull request description/body",
        },
        head: {
          type: "string",
          description: "Source branch name",
        },
        base: {
          type: "string",
          description: "Target branch name (default: main)",
        },
        repo: {
          type: "string",
          description: "Repository name (default: SKILLS_REPO)",
        },
      },
      required: ["title", "body", "head"],
    },
  },
  {
    name: "create_branch",
    description: "Create a new branch in a GitHub repository",
    inputSchema: {
      type: "object",
      properties: {
        branch: {
          type: "string",
          description: "New branch name",
        },
        from_branch: {
          type: "string",
          description: "Source branch to create from (default: main)",
        },
        repo: {
          type: "string",
          description: "Repository name (default: SKILLS_REPO)",
        },
      },
      required: ["branch"],
    },
  },
];

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "read_policy_file": {
        const { path } = ReadPolicyFileSchema.parse(args);
        const { content } = await getFileContent(GITHUB_OWNER, POLICIES_REPO, path);
        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        };
      }

      case "list_policy_files": {
        const { path = "" } = ListPolicyFilesSchema.parse(args);
        const files = await listDirectory(GITHUB_OWNER, POLICIES_REPO, path);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(files, null, 2),
            },
          ],
        };
      }

      case "read_skill_file": {
        const { path } = ReadSkillFileSchema.parse(args);
        const { content } = await getFileContent(GITHUB_OWNER, SKILLS_REPO, path);
        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        };
      }

      case "write_skill_file": {
        const { path, content, message, branch = DEFAULT_BRANCH } = WriteSkillFileSchema.parse(args);
        await createOrUpdateFile(GITHUB_OWNER, SKILLS_REPO, path, content, message, branch);
        return {
          content: [
            {
              type: "text",
              text: `Successfully wrote to ${path} in ${SKILLS_REPO}`,
            },
          ],
        };
      }

      case "list_skill_files": {
        const { path = "" } = ListSkillFilesSchema.parse(args);
        const files = await listDirectory(GITHUB_OWNER, SKILLS_REPO, path);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(files, null, 2),
            },
          ],
        };
      }

      case "update_skill_metadata": {
        const { content, message } = UpdateSkillMetadataSchema.parse(args);
        // Validate JSON
        JSON.parse(content);
        await createOrUpdateFile(
          GITHUB_OWNER,
          SKILLS_REPO,
          METADATA_PATH,
          content,
          message
        );
        return {
          content: [
            {
              type: "text",
              text: `Successfully updated ${METADATA_PATH}`,
            },
          ],
        };
      }

      case "create_pull_request": {
        const { title, body, head, base = DEFAULT_BRANCH, repo = SKILLS_REPO } = CreatePullRequestSchema.parse(args);
        const pr = await octokit.pulls.create({
          owner: GITHUB_OWNER,
          repo,
          title,
          body,
          head,
          base,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                url: pr.data.html_url,
                number: pr.data.number,
                state: pr.data.state,
              }, null, 2),
            },
          ],
        };
      }

      case "create_branch": {
        const { branch, from_branch = DEFAULT_BRANCH, repo = SKILLS_REPO } = CreateBranchSchema.parse(args);
        
        // Get the SHA of the source branch
        const refResponse = await octokit.git.getRef({
          owner: GITHUB_OWNER,
          repo,
          ref: `heads/${from_branch}`,
        });
        
        const sha = refResponse.data.object.sha;
        
        // Create the new branch
        await octokit.git.createRef({
          owner: GITHUB_OWNER,
          repo,
          ref: `refs/heads/${branch}`,
          sha,
        });
        
        return {
          content: [
            {
              type: "text",
              text: `Successfully created branch '${branch}' from '${from_branch}' in ${repo}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Skillet GitHub MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

// Made with Bob

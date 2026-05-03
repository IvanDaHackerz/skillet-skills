# Frontend Docker Deployment

Sets up Docker containerization for frontend applications with deployment configurations and optimization. Use this when you need to containerize and deploy frontend projects with proper build optimization, multi-stage builds, and production-ready configurations. This skill creates Dockerfiles, docker-compose files, and deployment scripts following DevOps best practices.

**Version:** 1.0.0

**Category:** frontend
**Roles:** frontend, fullstack, devops

---

## Prerequisites

- Existing frontend project (React, Vue, Angular, or static HTML/CSS/JS)
- Docker installed on development machine
- Basic understanding of Docker concepts
- Node.js project with package.json (for framework-based projects)

---

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `framework` | string | Yes | Frontend framework: react, vue, angular, or static |
| `build_command` | string | Yes | Build command from package.json (e.g., "npm run build") |
| `output_dir` | string | Yes | Build output directory (e.g., "build", "dist", "public") |
| `port` | number | No | Port to expose (default: 80 for production, 3000 for dev) |

---

## Steps

### Step 1: Analyze Project Structure

First, use the `read_file` tool to examine the `package.json` file to understand the project's dependencies and build scripts.
Look for the build command, start command, and any environment-specific configurations.
Note the Node.js version required by checking the `engines` field if present.

### Step 2: Create Multi-Stage Dockerfile

Next, use the `write_to_file` tool to create a `Dockerfile` in the project root.
Implement a multi-stage build with separate stages for dependencies, building, and production serving.
Use an appropriate Node.js base image for the build stage and nginx:alpine for the production stage.
Include proper layer caching optimization by copying package files before source code.

### Step 3: Create Nginx Configuration

Then, use the `write_to_file` tool to create an nginx configuration file at `nginx.conf`.
Configure nginx to serve static files from the build output directory.
Include proper MIME types, gzip compression, and caching headers for optimal performance.
Add fallback routing for single-page applications (redirect all routes to index.html).

### Step 4: Create Docker Ignore File

After that, use the `write_to_file` tool to create a `.dockerignore` file in the project root.
Exclude `node_modules`, build directories, git files, and other unnecessary files from the Docker context.
This reduces build time and image size by preventing unnecessary files from being copied.

### Step 5: Create Docker Compose Configuration

Next, use the `write_to_file` tool to create a `docker-compose.yml` file for local development and testing.
Define services for the frontend application with proper port mapping and volume mounts.
Include environment variables for development and production configurations.
Add health checks to ensure the container is running properly.

### Step 6: Create Deployment Scripts

Then, use the `write_to_file` tool to create deployment scripts at `scripts/deploy.sh` (Unix) and `scripts/deploy.ps1` (Windows).
Include commands to build the Docker image, tag it appropriately, and push to a container registry.
Add error handling and logging for each deployment step.
Make scripts executable with proper permissions.

### Step 7: Test Docker Build

Finally, use the `execute_command` tool to run `docker build -t frontend-app .` to test the Docker build process.
Verify that the build completes successfully without errors.
Use `docker run -p 80:80 frontend-app` to test the container locally.
Check that the application is accessible at http://localhost and all routes work correctly.

---

## Outputs

- `Dockerfile` — Multi-stage Docker configuration with optimized build and production stages
- `nginx.conf` — Nginx configuration for serving static files with proper caching and routing
- `.dockerignore` — Docker ignore file to exclude unnecessary files from build context
- `docker-compose.yml` — Docker Compose configuration for local development and testing
- `scripts/deploy.sh` — Unix deployment script for building and pushing Docker images
- `scripts/deploy.ps1` — Windows deployment script for building and pushing Docker images

---

## Example Usage

**User request:**
> Set up Docker deployment for my React app that builds to the "build" folder using "npm run build"

**Expected output:**
- `Dockerfile` — Multi-stage build with Node.js 18 for building and nginx:alpine for serving
- `nginx.conf` — Configured to serve from /usr/share/nginx/html with SPA routing
- `.dockerignore` — Excludes node_modules, .git, build, and development files
- `docker-compose.yml` — Service definition with port 80:80 mapping and health checks
- `scripts/deploy.sh` — Build, tag, and push commands for container registry
- `scripts/deploy.ps1` — Windows equivalent deployment script

---

## Notes

- Multi-stage builds significantly reduce final image size by excluding build dependencies
- Use nginx:alpine for the smallest production image size (typically under 50MB)
- Enable gzip compression in nginx for faster load times
- Consider using Docker BuildKit for faster builds with better caching
- Tag images with version numbers or git commit hashes for better tracking

## Warnings

> ⚠️ Never include sensitive environment variables directly in Dockerfile. Use docker-compose or runtime environment injection.

> ⚠️ Ensure .dockerignore includes node_modules to prevent copying large dependency folders into the build context.

> ⚠️ Test the Docker image locally before deploying to production to catch configuration issues early.

> ⚠️ Use specific version tags for base images (e.g., node:18-alpine) instead of "latest" for reproducible builds.

## Related Skills

- CI/CD Pipeline Setup
- Kubernetes Deployment Configuration
- Environment Configuration Management

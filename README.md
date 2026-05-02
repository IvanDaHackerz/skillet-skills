# Skillet 🍳

> Turn tribal knowledge into automated excellence

**Skillet** is a reusable development skills management system powered by IBM Bob IDE. Teams create structured "skills" (markdown files) that codify best practices. Bob reads these skills and executes them consistently across any project.

---

## 🎯 What is Skillet?

Skillet helps development teams:
- **Codify best practices** into reusable skills
- **Automate repetitive tasks** with AI-powered execution
- **Ensure quality** through automated validation
- **Onboard faster** by documenting "how we do things here"
- **Stay consistent** across projects and team members

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│      GitHub Repository              │
│      (Source of Truth)              │
└──────────┬──────────────────────────┘
           │
    ┌──────┼──────┐
    │      │      │
┌───▼──┐ ┌─▼──┐ ┌▼────┐
│ Bob  │ │Dash│ │Orch.│
│ IDE  │ │board│ │(Opt)│
└──────┘ └────┘ └─────┘
```

---

## 📁 Repository Structure

```
skillet-skills/
├── skills/              # All reusable skills
│   ├── backend/         # Backend development skills
│   ├── frontend/        # Frontend development skills
│   ├── devops/          # DevOps and infrastructure skills
│   └── shared/          # Cross-functional skills
├── rules/               # Company standards
│   ├── coding-standards.md
│   ├── security-guidelines.md
│   └── skill-format.md
├── .bob/                # Bob IDE configuration
│   ├── modes/
│   │   └── skillet.md   # Custom Skillet mode
│   └── skills/
│       ├── create-skill.md    # Meta-skill: Create skills
│       ├── validate-skill.md  # Meta-skill: Validate skills
│       └── execute-skill.md   # Meta-skill: Execute skills
├── metadata/            # Metadata and configuration
│   ├── roles.json       # Role definitions
│   └── skill-index.json # Skill metadata
└── bob_sessions/        # Bob task reports (for judging)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- IBM Bob IDE
- GitHub account

### Setup

1. **Clone this repository**:
```bash
git clone https://github.com/IvanDaHackerz/skillet-skills.git
cd skillet-skills
```

2. **Open in VS Code with Bob IDE**:
```bash
code .
```

3. **Bob will automatically detect the Skillet mode** from `.bob/modes/skillet.md`

4. **Start using skills**:
```
Hey Bob, list all available skills
Hey Bob, create a new skill for [your use case]
Hey Bob, execute the [skill name] skill
```

---

## 💡 How It Works

### 1. Create a Skill
```
Developer: "Hey Bob, I want to create a skill for generating REST API 
endpoints with authentication and validation."

Bob: [Reads create-skill meta-skill]
     [Generates structured skill markdown]
     [Automatically validates it]
     [Shows validation report]
     
Bob: "Skill created and validated! Ready to save?"
```

### 2. Validate a Skill
Every skill is automatically validated with **4 checks**:
- ✅ **Guideline Compliance** (0-100 score)
- ✅ **Duplicate Detection** (similarity %)
- ✅ **Security Review** (pass/fail)
- ✅ **Completeness Check** (pass/fail)

### 3. Execute a Skill
```
Developer: "Hey Bob, use the REST API Endpoint Generator skill to 
create a POST endpoint for orders."

Bob: [Reads the skill]
     [Analyzes your project]
     [Generates code matching your patterns]
     [Shows diff for approval]
     
Bob: "Generated 3 files. Apply changes?"
```

---

## 📚 Available Skills

Skills will be added as the project progresses. Check the `skills/` directory for the latest.

### Backend
- REST API Endpoint Generator
- Database Migration Creator
- Error Handling Wrapper

### Frontend
- React Component Scaffold
- CSS Module Generator
- Form Validation Setup

### DevOps
- Docker Compose Setup
- CI/CD Pipeline Config

### Shared
- Unit Test Suite Generator
- API Documentation Generator

---

## 🎨 Using the Dashboard

A React dashboard is available to browse and view skills:

```bash
cd dashboard
npm install
npm run dev
```

Open http://localhost:5173 to browse skills.

---

## 🔧 Configuration

### Bob IDE Custom Mode
The Skillet mode is defined in `.bob/modes/skillet.md`. Bob automatically loads this when you open the repository.

### Rules Files
- `rules/coding-standards.md` - Code conventions
- `rules/security-guidelines.md` - Security best practices
- `rules/skill-format.md` - Required skill structure

### Metadata
- `metadata/roles.json` - Role definitions and categories
- `metadata/skill-index.json` - Skill metadata (auto-updated)

---

## 🤝 Contributing

### Creating a New Skill

1. Use Bob to create the skill:
```
Hey Bob, create a new skill for [your use case]
```

2. Bob will:
   - Generate structured markdown
   - Validate against company standards
   - Check for duplicates
   - Run security review
   - Verify completeness

3. Review the validation report

4. If approved, the skill is saved to `skills/{category}/{skill-name}.md`

### Skill Quality Standards

All skills must:
- Follow the format in `rules/skill-format.md`
- Pass all 4 validation checks
- Include clear, actionable steps
- Provide concrete examples
- Follow security guidelines

---

## 🏆 Validation System

Skillet's validation system ensures quality:

### 1. Guideline Compliance (0-100)
- Follows coding standards
- Clear and actionable steps
- Realistic prerequisites
- Well-defined outputs

### 2. Duplicate Detection (0-100%)
- Compares against existing skills
- Flags high similarity (>70%)
- Prevents redundancy

### 3. Security Review (Pass/Fail)
- No hardcoded credentials
- No SQL injection risks
- No XSS vulnerabilities
- Proper input validation

### 4. Completeness Check (Pass/Fail)
- All required sections present
- Meaningful content (no placeholders)
- Minimum 3 steps

---

## 📊 Project Stats

- **Total Skills**: 0 (will be updated as skills are added)
- **Categories**: 5 (backend, frontend, devops, qa, shared)
- **Roles**: 5 (backend, frontend, fullstack, devops, qa)

---

## 🎯 IBM Bob Dev Day Hackathon

This project was created for the IBM Bob Dev Day Hackathon 2026.

**Theme**: Turn idea into impact faster

**Technologies**:
- IBM Bob IDE (Core)
- watsonx Orchestrate (Optional)
- React + Vite
- Node.js + Express

---

## 📝 License

This project is created for the IBM Bob Dev Day Hackathon 2026.

---

## 🙏 Acknowledgments

- IBM Bob IDE team
- IBM watsonx team
- Hackathon organizers
- Team members

---

## 📞 Contact

For questions or feedback, please open an issue in this repository.

---

**Built with ❤️ using IBM Bob IDE**
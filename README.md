# Skillet 🍳

> Turn tribal knowledge into automated excellence

**Skillet** is a reusable development skills management system powered by IBM Bob IDE. Teams create structured "skills" (markdown files) that codify best practices. Bob reads these skills and executes them consistently across any project.

---

## 🎯 What Problem Does Skillet Solve?

Development teams face these challenges:
- ⏰ **Time wasted** on repetitive coding tasks
- 🔄 **Inconsistent implementations** across projects
- 📚 **Knowledge silos** - tribal knowledge not documented
- 🆕 **Slow onboarding** - new developers don't know "how we do things here"
- 🐛 **Quality issues** - best practices not consistently applied

**Skillet solves this** by letting teams codify their best practices into reusable skills that Bob can execute automatically.

---

## 💡 How It Works

### 1️⃣ Create a Skill
Developers use Bob to create structured skills:

```
Developer: "Hey Bob, create a skill for generating REST API endpoints 
with authentication and validation."

Bob: [Reads create-skill meta-skill]
     [Generates structured markdown]
     [Automatically validates it]
     [Shows validation report]
     
Bob: "Skill created and validated! Ready to save?"
```

### 2️⃣ Automatic Validation
Every skill is validated with **4 quality checks**:
- ✅ **Guideline Compliance** (0-100 score) - Follows coding standards
- ✅ **Duplicate Detection** (similarity %) - Prevents redundancy
- ✅ **Security Review** (pass/fail) - Catches vulnerabilities
- ✅ **Completeness Check** (pass/fail) - Ensures quality

### 3️⃣ Execute Skills
Developers use skills directly in their projects:

```
Developer: "Hey Bob, use the backend-rest-api-endpoint-generator skill 
to create a POST endpoint for orders."

Bob: [Reads the skill from skills/ folder]
     [Analyzes your project structure]
     [Generates code matching your patterns]
     [Shows diff for approval]
     
Bob: "Generated 3 files. Apply changes?"
```

---

## 📁 Repository Structure

```
skillet-skills/
├── skills/                          # All reusable skills (single folder)
│   ├── backend-rest-api-endpoint-generator.md
│   ├── backend-database-migration-creator.md
│   ├── frontend-react-component-scaffold.md
│   ├── frontend-css-module-generator.md
│   ├── devops-docker-compose-setup.md
│   └── shared-unit-test-suite-generator.md
│
├── rules/                           # Company standards
│   ├── coding-standards.md          # Code conventions
│   ├── security-guidelines.md       # Security best practices
│   └── skill-format.md              # Required skill structure
│
├── .bob/                            # Bob IDE configuration
│   ├── modes/
│   │   └── skillet.md               # Custom Skillet mode
│   └── skills/
│       ├── create-skill.md          # Meta-skill: Create skills
│       └── validate-skill.md        # Meta-skill: Validate skills
│
├── metadata/
│   ├── roles.json                   # Role definitions
│   └── skill-index.json             # Skill metadata
│
└── bob_sessions/                    # Bob task reports (for judging)
```

**Key Design Decision**: Single `skills/` folder with category prefixes (e.g., `backend-*.md`) to avoid naming conflicts and simplify file management.

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

3. **Bob automatically detects the Skillet mode** from `.bob/modes/skillet.md`

4. **Start using Skillet**:
```
Hey Bob, list all available skills
Hey Bob, create a new skill for [your use case]
Hey Bob, use the [skill-name] skill
```

---

## 📚 Available Skills

Skills will be added as the project progresses. Each skill follows the naming convention: `{category}-{skill-name}.md`

### Backend Skills
- `backend-rest-api-endpoint-generator.md` - Generate Express API endpoints with auth & validation
- `backend-database-migration-creator.md` - Create database migration files
- `backend-error-handling-wrapper.md` - Add consistent error handling

### Frontend Skills
- `frontend-react-component-scaffold.md` - Generate React components with tests
- `frontend-css-module-generator.md` - Create CSS modules with common patterns
- `frontend-form-validation-setup.md` - Set up form validation with React Hook Form

### DevOps Skills
- `devops-docker-compose-setup.md` - Create Docker Compose configurations
- `devops-cicd-pipeline-config.md` - Generate CI/CD pipeline files

### Shared Skills
- `shared-unit-test-suite-generator.md` - Generate unit tests with Jest/Vitest
- `shared-api-documentation-generator.md` - Create API documentation

---

## 🎨 Using the Dashboard (Optional)

A React dashboard is available to browse and view skills:

```bash
cd dashboard
npm install
npm run dev
```

Open http://localhost:5173 to browse skills visually.

---

## 🤝 Contributing

### Creating a New Skill

1. **Use Bob to create the skill**:
```
Hey Bob, create a new skill for [your use case]
```

2. **Bob will**:
   - Generate structured markdown
   - Validate against company standards (4 checks)
   - Check for duplicates
   - Run security review
   - Verify completeness

3. **Review the validation report**

4. **If approved**, the skill is saved to `skills/{category}-{skill-name}.md`

5. **Commit and push**:
```bash
git add skills/{category}-{skill-name}.md
git commit -m "feat: add {category}-{skill-name} skill"
git push origin main
```

### Skill Quality Standards

All skills must:
- ✅ Follow the format in `rules/skill-format.md`
- ✅ Pass all 4 validation checks
- ✅ Include clear, actionable steps
- ✅ Provide concrete examples
- ✅ Follow security guidelines
- ✅ Use category prefix in filename

---

## 🏆 Validation System

Skillet's validation system ensures quality through 4 automated checks:

### 1. Guideline Compliance (0-100)
- Follows coding standards
- Clear and actionable steps
- Realistic prerequisites
- Well-defined outputs
- **Scoring**: 90-100 (Excellent), 70-89 (Good), 50-69 (Fair), <50 (Poor)

### 2. Duplicate Detection (0-100%)
- Compares against all existing skills
- Calculates similarity based on purpose, steps, inputs/outputs
- **Levels**: 90-100% (Duplicate), 70-89% (High overlap), 50-69% (Some overlap), <50% (Unique)

### 3. Security Review (Pass/Fail)
- No hardcoded credentials
- No SQL injection risks
- No XSS vulnerabilities
- Proper input validation
- Uses environment variables

### 4. Completeness Check (Pass/Fail)
- All required sections present
- Meaningful content (no placeholders)
- Minimum 3 steps
- Clear inputs and outputs

**Verdict Logic**:
- ✅ **APPROVED**: All checks passed
- ⚠️ **NEEDS REVIEW**: Minor issues found
- ❌ **REJECTED**: Critical issues must be fixed

---

## 🔧 Configuration

### Bob IDE Custom Mode
The Skillet mode is defined in `.bob/modes/skillet.md`. Bob automatically loads this when you open the repository.

### Rules Files
- `rules/coding-standards.md` - JavaScript/Node.js conventions, error handling, testing
- `rules/security-guidelines.md` - Authentication, input validation, SQL injection prevention
- `rules/skill-format.md` - Required skill structure and template

### Metadata
- `metadata/roles.json` - Role definitions (backend, frontend, fullstack, devops, qa)
- `metadata/skill-index.json` - Skill metadata (auto-updated)

---

## 📊 Project Stats

- **Total Skills**: 0 (will be updated as skills are added)
- **Categories**: 5 (backend, frontend, devops, qa, shared)
- **Roles**: 5 (backend, frontend, fullstack, devops, qa)
- **Meta-Skills**: 2 (create-skill, validate-skill)

---

## 🎯 IBM Bob Dev Day Hackathon 2026

This project was created for the IBM Bob Dev Day Hackathon 2026.

**Theme**: Turn idea into impact faster

**Technologies**:
- IBM Bob IDE (Core - Required)
- watsonx Orchestrate (Optional - Enhanced validation)
- React + Vite (Dashboard)
- Node.js + Express (Backend API)

**Key Innovation**: Automated quality assurance through 4-check validation system ensures every skill meets company standards before being added to the library.

---

## 🌟 Key Features

- ✅ **Automated Skill Creation** - Bob guides developers through structured skill creation
- ✅ **4-Check Validation** - Ensures quality, security, and completeness
- ✅ **Duplicate Detection** - Prevents redundant skills
- ✅ **Security-First** - Catches vulnerabilities before they reach production
- ✅ **Consistent Execution** - Skills generate code matching your project patterns
- ✅ **Role-Based Filtering** - Developers see only relevant skills
- ✅ **Version Controlled** - All skills tracked in Git
- ✅ **Team Collaboration** - Share best practices across the organization

---

## 📝 Example Workflow

```
# 1. Developer creates a skill
Developer: "Hey Bob, create a skill for generating Docker Compose files"
Bob: [Creates skill, validates it, shows report]
Bob: "✅ APPROVED - Skill ready to save!"

# 2. Developer commits the skill
$ git add skills/devops-docker-compose-setup.md
$ git commit -m "feat: add devops-docker-compose-setup skill"
$ git push origin main

# 3. Team member pulls and uses the skill
$ git pull origin main
Developer: "Hey Bob, use the devops-docker-compose-setup skill"
Bob: [Generates docker-compose.yml matching project structure]
Bob: "Generated docker-compose.yml. Apply changes?"
Developer: "Yes"
Bob: [Applies changes]
```

---

## 🚧 Roadmap

- [x] Phase 1: Foundation (repo structure, Bob config, rules)
- [x] Phase 2: Meta-skills (create, validate)
- [ ] Phase 3: Sample skills (8 skills across categories)
- [ ] Phase 4: Backend API (GitHub integration)
- [ ] Phase 5: React dashboard (skill browser)
- [ ] Phase 6: Demo project (AcmeCorp API)
- [ ] Phase 7: Testing & integration
- [ ] Phase 8: watsonx Orchestrate (optional)
- [ ] Phase 9: Documentation & deliverables

---

## 📞 Contact

For questions or feedback about this hackathon project:
- **Repository**: https://github.com/IvanDaHackerz/skillet-skills
- **Hackathon**: IBM Bob Dev Day 2026

---

## 🙏 Acknowledgments

- IBM Bob IDE team for the amazing AI development tool
- IBM watsonx team for Orchestrate capabilities
- Hackathon organizers for the opportunity
- Team members for their contributions

---

**Built with ❤️ using IBM Bob IDE**

*Skillet: Because great teams cook up great code together* 🍳
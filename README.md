# Skillet Skills 🍳

> Reusable development skills library for the Skillet system

This repository contains **reusable development skills** that developers can create, share, and execute using IBM Bob IDE. Skills are validated against immutable company policies stored in the companion [skillet-policies](https://github.com/IvanDaHackerz/skillet-policies) repository.

---

## 🎯 What is Skillet?

**Skillet** is a skills management system that helps development teams:
- ⏰ **Save time** on repetitive coding tasks
- 🔄 **Ensure consistency** across projects
- 📚 **Codify best practices** into reusable skills
- 🆕 **Onboard faster** with documented workflows
- 🐛 **Maintain quality** through automated validation

---

## 🏗️ Two-Repository Architecture

Skillet uses a **two-repo system** for security and governance:

### 1. [skillet-policies](https://github.com/IvanDaHackerz/skillet-policies) - READ-ONLY
- **Purpose**: Immutable company policies and standards
- **Access**: Everyone reads, only leadership writes
- **Contents**: Coding standards, security guidelines, skill format, Bob configuration
- **Protection**: Strictest branch protection (2+ approvals required)

### 2. skillet-skills (This Repo) - READ-WRITE
- **Purpose**: Reusable development skills library
- **Access**: Developers can create/modify skills
- **Contents**: All skills (backend, frontend, devops, qa, shared)
- **Protection**: Category-based CODEOWNERS review (1 approval required)

**Why Two Repos?**
- Developers cannot bypass company policies locally
- Validation logic is immutable
- Clear separation between policies (governance) and skills (implementation)
- Only leadership can change standards

---

## 📁 Repository Structure

```
skillet-skills/
├── skills/                          # All reusable skills
│   ├── backend-rest-api-endpoint-generator.md
│   ├── backend-database-migration-creator.md
│   ├── frontend-react-component-scaffold.md
│   ├── frontend-css-module-generator.md
│   ├── devops-docker-compose-setup.md
│   └── shared-unit-test-suite-generator.md
│
├── metadata/
│   └── skill-index.json             # Skill metadata (auto-updated)
│
├── bob_sessions/                    # Bob task reports (for judging)
│   └── .gitkeep
│
├── CODEOWNERS                       # Category-based review requirements
└── README.md                        # This file
```

**Note**: Policies, rules, and Bob configuration are in the [skillet-policies](https://github.com/IvanDaHackerz/skillet-policies) repo.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- IBM Bob IDE
- GitHub account

### Setup

1. **Clone BOTH repositories** (required for Skillet to work):
```bash
cd "d:/ibm dev day"
git clone https://github.com/IvanDaHackerz/skillet-policies.git
git clone https://github.com/IvanDaHackerz/skillet-skills.git
```

2. **Open your project in VS Code with Bob IDE**

3. **Bob automatically detects both repos**:
   - Reads policies from `../skillet-policies/` (immutable)
   - Creates skills in `../skillet-skills/` (mutable)

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

## 🤝 Contributing

### Creating a New Skill

1. **Use Bob to create the skill**:
```
Hey Bob, create a new skill for [your use case]
```

2. **Bob will**:
   - Read immutable policies from `../skillet-policies/rules/`
   - Generate structured markdown
   - Validate against company standards (4 checks)
   - Check for duplicates
   - Run security review
   - Verify completeness

3. **Review the validation report**

4. **If approved**, the skill is saved to `skills/{category}-{skill-name}.md`

5. **Commit and push**:
```bash
cd skillet-skills
git add skills/{category}-{skill-name}.md
git commit -m "feat: add {category}-{skill-name} skill"
git push origin main
```

### Skill Quality Standards

All skills must:
- ✅ Pass 4 validation checks (guideline compliance, duplicate detection, security, completeness)
- ✅ Follow format from `skillet-policies/rules/skill-format.md`
- ✅ Follow coding standards from `skillet-policies/rules/coding-standards.md`
- ✅ Follow security guidelines from `skillet-policies/rules/security-guidelines.md`
- ✅ Include clear, actionable steps
- ✅ Provide concrete examples
- ✅ Use category prefix in filename

---

## 🔐 Validation System

Every skill is automatically validated with **4 checks**:

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

**Note**: Validation logic is in the immutable `skillet-policies` repo and cannot be bypassed.

---

## 🎨 Using Skills

### List Available Skills
```
Hey Bob, list all skills
Hey Bob, show me backend skills
Hey Bob, what skills are available for frontend developers?
```

### Execute a Skill
```
Hey Bob, use the backend-rest-api-endpoint-generator skill to create a POST endpoint for orders
```

Bob will:
1. Read the skill from `skills/backend-rest-api-endpoint-generator.md`
2. Analyze your project structure
3. Generate code matching your patterns
4. Follow standards from `skillet-policies/rules/coding-standards.md`
5. Show diff for approval

---

## 📊 Project Stats

- **Total Skills**: 0 (will be updated as skills are added)
- **Categories**: 5 (backend, frontend, devops, qa, shared)
- **Validation Checks**: 4 (guideline, duplicate, security, completeness)
- **Companion Repo**: [skillet-policies](https://github.com/IvanDaHackerz/skillet-policies)

---

## 🎯 IBM Bob Dev Day Hackathon 2026

This project was created for the IBM Bob Dev Day Hackathon 2026.

**Theme**: Turn idea into impact faster

**Technologies**:
- IBM Bob IDE (Core - Required)
- watsonx Orchestrate (Optional - Enhanced validation)
- React + Vite (Dashboard)
- Node.js + Express (Backend API)

**Key Innovation**: Two-repository architecture ensures immutable company policies that developers cannot bypass, while still allowing flexible skill creation.

---

## 🌟 Key Features

- ✅ **Automated Skill Creation** - Bob guides developers through structured skill creation
- ✅ **4-Check Validation** - Ensures quality, security, and completeness
- ✅ **Duplicate Detection** - Prevents redundant skills
- ✅ **Security-First** - Catches vulnerabilities before they reach production
- ✅ **Immutable Policies** - Developers cannot bypass company standards
- ✅ **Consistent Execution** - Skills generate code matching your project patterns
- ✅ **Role-Based Filtering** - Developers see only relevant skills
- ✅ **Version Controlled** - All skills tracked in Git
- ✅ **Team Collaboration** - Share best practices across the organization

---

## 📝 Example Workflow

```
# 1. Developer creates a skill
Developer: "Hey Bob, create a skill for generating Docker Compose files"
Bob: [Reads policies from ../skillet-policies/]
     [Creates skill, validates it, shows report]
Bob: "✅ APPROVED - Skill ready to save!"

# 2. Developer commits the skill
$ cd skillet-skills
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

## 🔗 Related Repositories

- **[skillet-policies](https://github.com/IvanDaHackerz/skillet-policies)** - Immutable company policies and standards (required)
- **skillet-skills** (this repo) - Reusable development skills library

**Both repositories must be cloned** for Skillet to work properly.

---

## 🚧 Roadmap

- [x] Phase 1: Two-repo architecture (policies + skills)
- [x] Phase 2: Validation system (4 checks)
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
- **Skills Repository**: https://github.com/IvanDaHackerz/skillet-skills
- **Policies Repository**: https://github.com/IvanDaHackerz/skillet-policies
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
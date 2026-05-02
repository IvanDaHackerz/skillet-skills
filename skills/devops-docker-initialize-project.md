# Docker Initialize Full Project Setup

## Description
Automates the complete Docker setup for a full-stack application with backend (Node.js/Express) and frontend (React/Vite) services. Creates Dockerfiles, docker-compose configuration, .dockerignore files, and environment setup. Use this when you need to containerize your entire project for consistent development, testing, and deployment environments across all team members and platforms.

## Category
devops

## Roles
devops, fullstack, backend, frontend

## Prerequisites
- Docker installed on the system (`docker --version` to verify, minimum version 20.10+)
- Docker Compose installed (`docker-compose --version` or `docker compose version`)
- Node.js project with package.json files in backend and frontend directories
- Git repository initialized (for .dockerignore patterns)
- Basic understanding of Docker concepts (images, containers, volumes)
- Sufficient disk space for Docker images (minimum 2GB free)

## Steps
1. Analyze project structure to identify backend and frontend directories
2. Create optimized Dockerfile for Node.js backend with multi-stage build
3. Create optimized Dockerfile for React/Vite frontend with Nginx serving
4. Generate .dockerignore files to exclude unnecessary files from Docker context
5. Create docker-compose.yml for orchestrating all services
6. Set up environment variable templates (.env.example) for Docker
7. Create Docker-specific npm scripts in package.json files
8. Generate docker-compose.dev.yml for development with hot-reload
9. Create README-DOCKER.md with comprehensive usage instructions
10. Validate Docker configuration with test build
11. Create helper scripts for common Docker operations (start, stop, rebuild)
12. Set up volume mounts for persistent data and development workflow

## Inputs
- Backend directory path (string, optional): Path to backend code, defaults to "./backend"
- Frontend directory path (string, optional): Path to frontend code, defaults to "./dashboard"
- Backend port (number, optional): Port for backend service, defaults to 3000
- Frontend port (number, optional): Port for frontend service, defaults to 5173
- Database service (boolean, optional): Include database container (MongoDB/PostgreSQL), defaults to false
- Development mode (boolean, optional): Include hot-reload configuration, defaults to true
- Nginx configuration (boolean, optional): Use Nginx for frontend production build, defaults to true
- Docker registry (string, optional): Registry for pushing images, defaults to none

## Outputs
- backend/Dockerfile: Multi-stage Node.js backend container configuration
- dashboard/Dockerfile: Multi-stage React/Vite frontend container with Nginx
- backend/.dockerignore: Exclusion patterns for backend Docker context
- dashboard/.dockerignore: Exclusion patterns for frontend Docker context
- docker-compose.yml: Production-ready service orchestration
- docker-compose.dev.yml: Development environment with hot-reload
- .env.docker.example: Template for Docker environment variables
- docker-scripts/start.sh: Script to start all services
- docker-scripts/stop.sh: Script to stop all services
- docker-scripts/rebuild.sh: Script to rebuild and restart services
- README-DOCKER.md: Comprehensive Docker usage documentation
- nginx.conf: Nginx configuration for frontend (if applicable)

## Example Usage

### Basic Full Project Dockerization
```bash
User: "Initialize Docker setup for the whole project with backend on port 3000 and frontend on port 5173"

Expected Output:
✅ Created backend/Dockerfile (Node.js 20 Alpine, multi-stage)
✅ Created dashboard/Dockerfile (Vite build + Nginx Alpine)
✅ Created backend/.dockerignore (excludes node_modules, .env, logs)
✅ Created dashboard/.dockerignore (excludes node_modules, dist, .env)
✅ Created docker-compose.yml (backend + frontend services)
✅ Created docker-compose.dev.yml (with hot-reload volumes)
✅ Created .env.docker.example (environment templates)
✅ Created docker-scripts/ (start.sh, stop.sh, rebuild.sh)
✅ Created README-DOCKER.md (usage instructions)

To start: docker-compose up -d
To develop: docker-compose -f docker-compose.dev.yml up
To stop: docker-compose down
```

### With Database Service
```bash
User: "Initialize Docker setup with MongoDB database included"

Expected Output:
✅ All standard Docker files created
✅ Added MongoDB service to docker-compose.yml
✅ Created mongo-init/ directory with initialization scripts
✅ Added database connection environment variables
✅ Configured volume for MongoDB data persistence
✅ Added health checks for all services

Services:
- backend (Node.js API) - http://localhost:3000
- frontend (React/Vite) - http://localhost:5173
- mongodb (Database) - mongodb://localhost:27017
```

### Development Environment Setup
```bash
# Start development environment with hot-reload
$ docker-compose -f docker-compose.dev.yml up

Creating network "ibm-dev-day_default" with the default driver
Creating volume "ibm-dev-day_node_modules_backend" with default driver
Creating volume "ibm-dev-day_node_modules_frontend" with default driver
Creating ibm-dev-day_backend_1  ... done
Creating ibm-dev-day_frontend_1 ... done

backend_1   | > skillet-backend@1.0.0 dev
backend_1   | > node --watch src/app.js
backend_1   | 
backend_1   | Server running on port 3000
backend_1   | Watching for file changes...

frontend_1  | > dashboard@0.0.0 dev
frontend_1  | > vite
frontend_1  | 
frontend_1  | VITE v8.0.10  ready in 523 ms
frontend_1  | ➜  Local:   http://localhost:5173/
frontend_1  | ➜  Network: http://172.18.0.3:5173/

✅ Development environment ready!
   Backend:  http://localhost:3000
   Frontend: http://localhost:5173
```

### Production Build and Deploy
```bash
# Build production images
$ docker-compose build

Building backend
Step 1/12 : FROM node:20-alpine AS builder
 ---> a1b2c3d4e5f6
Step 2/12 : WORKDIR /app
 ---> Using cache
 ---> b2c3d4e5f6g7
...
Successfully built backend:latest

Building frontend
Step 1/15 : FROM node:20-alpine AS builder
 ---> a1b2c3d4e5f6
...
Successfully built frontend:latest

# Start production services
$ docker-compose up -d

Creating network "ibm-dev-day_default" with the default driver
Creating ibm-dev-day_backend_1  ... done
Creating ibm-dev-day_frontend_1 ... done

# Check service status
$ docker-compose ps

NAME                    STATUS              PORTS
ibm-dev-day_backend_1   Up 10 seconds       0.0.0.0:3000->3000/tcp
ibm-dev-day_frontend_1  Up 10 seconds       0.0.0.0:80->80/tcp

✅ Production services running!
```

## Detailed File Examples

### backend/Dockerfile
```dockerfile
# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Production stage
FROM node:20-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/src ./src
COPY --chown=nodejs:nodejs package*.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["npm", "start"]
```

### dashboard/Dockerfile
```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: skillet-backend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    env_file:
      - ./backend/.env
    networks:
      - skillet-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  frontend:
    build:
      context: ./dashboard
      dockerfile: Dockerfile
    container_name: skillet-frontend
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - skillet-network
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  skillet-network:
    driver: bridge

volumes:
  backend_node_modules:
  frontend_node_modules:
```

### docker-compose.dev.yml
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: skillet-backend-dev
    ports:
      - "3000:3000"
    volumes:
      - ./backend/src:/app/src:ro
      - backend_node_modules:/app/node_modules
    environment:
      - NODE_ENV=development
      - PORT=3000
    env_file:
      - ./backend/.env
    command: npm run dev
    networks:
      - skillet-network

  frontend:
    build:
      context: ./dashboard
      dockerfile: Dockerfile.dev
    container_name: skillet-frontend-dev
    ports:
      - "5173:5173"
    volumes:
      - ./dashboard/src:/app/src:ro
      - ./dashboard/public:/app/public:ro
      - ./dashboard/index.html:/app/index.html:ro
      - frontend_node_modules:/app/node_modules
    environment:
      - NODE_ENV=development
      - VITE_API_URL=http://localhost:3000
    command: npm run dev -- --host
    networks:
      - skillet-network
    depends_on:
      - backend

networks:
  skillet-network:
    driver: bridge

volumes:
  backend_node_modules:
  frontend_node_modules:
```

### .dockerignore (Backend)
```
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
README.md
.vscode
.idea
*.log
coverage
.nyc_output
dist
build
```

### .dockerignore (Frontend)
```
node_modules
npm-debug.log
.env
.env.local
.env.*.local
.git
.gitignore
README.md
.vscode
.idea
*.log
dist
build
coverage
.cache
```

## Docker Helper Scripts

### docker-scripts/start.sh
```bash
#!/bin/bash
echo "🚀 Starting Skillet services..."
docker-compose up -d
echo "✅ Services started!"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:80"
docker-compose ps
```

### docker-scripts/stop.sh
```bash
#!/bin/bash
echo "🛑 Stopping Skillet services..."
docker-compose down
echo "✅ Services stopped!"
```

### docker-scripts/rebuild.sh
```bash
#!/bin/bash
echo "🔨 Rebuilding Skillet services..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d
echo "✅ Services rebuilt and started!"
docker-compose ps
```

### docker-scripts/logs.sh
```bash
#!/bin/bash
if [ -z "$1" ]; then
  echo "📋 Showing logs for all services..."
  docker-compose logs -f
else
  echo "📋 Showing logs for $1..."
  docker-compose logs -f $1
fi
```

## Common Docker Commands

### Building and Starting
```bash
# Build images
docker-compose build

# Build without cache
docker-compose build --no-cache

# Start services in background
docker-compose up -d

# Start services with logs
docker-compose up

# Start specific service
docker-compose up backend
```

### Stopping and Cleaning
```bash
# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all

# Remove all containers, networks, volumes
docker-compose down -v --remove-orphans
```

### Monitoring and Debugging
```bash
# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# Check service status
docker-compose ps

# Execute command in container
docker-compose exec backend sh

# View resource usage
docker stats
```

### Development Workflow
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Rebuild after dependency changes
docker-compose -f docker-compose.dev.yml up --build

# Run tests in container
docker-compose exec backend npm test

# Install new dependency
docker-compose exec backend npm install <package>
```

## Notes

### Best Practices
- Use multi-stage builds to minimize image size
- Run containers as non-root users for security
- Use .dockerignore to exclude unnecessary files
- Implement health checks for all services
- Use named volumes for persistent data
- Tag images with version numbers
- Keep Dockerfiles in the same directory as the code they containerize
- Use environment variables for configuration
- Document all required environment variables

### Performance Optimization
- Use Alpine Linux base images for smaller size
- Leverage Docker layer caching effectively
- Copy package.json before source code to cache dependencies
- Use .dockerignore to reduce build context size
- Minimize the number of layers in Dockerfile
- Use multi-stage builds to exclude build dependencies
- Consider using BuildKit for faster builds

### Security Considerations
- Never commit .env files with secrets
- Use Docker secrets for sensitive data in production
- Run containers as non-root users
- Keep base images updated
- Scan images for vulnerabilities (`docker scan`)
- Use specific image versions, not `latest`
- Limit container resources (CPU, memory)
- Use read-only file systems where possible
- Implement proper network isolation

### Development Tips
- Use volume mounts for hot-reload in development
- Keep development and production configs separate
- Use docker-compose.override.yml for local customization
- Set up proper logging and monitoring
- Use health checks to ensure service readiness
- Document all environment variables in .env.example
- Create helper scripts for common operations

## Troubleshooting

### Issue: "Cannot connect to Docker daemon"
**Solution**: 
```bash
# Start Docker service
sudo systemctl start docker

# Or on Windows/Mac, start Docker Desktop
```

### Issue: "Port already in use"
**Solution**:
```bash
# Find process using port
lsof -i :3000  # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Kill process or change port in docker-compose.yml
```

### Issue: "Build fails with permission denied"
**Solution**:
```bash
# Fix file permissions
chmod -R 755 ./backend ./dashboard

# Or run with sudo (not recommended)
sudo docker-compose build
```

### Issue: "Container exits immediately"
**Solution**:
```bash
# Check logs
docker-compose logs backend

# Run interactively to debug
docker-compose run backend sh
```

### Issue: "Changes not reflected in container"
**Solution**:
```bash
# Rebuild without cache
docker-compose build --no-cache

# Or remove volumes and rebuild
docker-compose down -v
docker-compose up --build
```

### Issue: "Out of disk space"
**Solution**:
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a --volumes
```

## Environment Variables

### Backend (.env)
```bash
# Server Configuration
NODE_ENV=production
PORT=3000

# GitHub API (if using)
GITHUB_TOKEN=your_github_token_here
GITHUB_OWNER=your_org
GITHUB_REPO=your_repo

# CORS
CORS_ORIGIN=http://localhost:80

# Logging
LOG_LEVEL=info
```

### Frontend (.env)
```bash
# API Configuration
VITE_API_URL=http://localhost:3000

# Environment
NODE_ENV=production
```

## Related Skills
- `devops-docker-compose-management`: Manage multi-container applications
- `devops-docker-registry-setup`: Set up private Docker registry
- `devops-kubernetes-deployment`: Deploy to Kubernetes
- `devops-ci-cd-docker-pipeline`: Automate Docker builds in CI/CD

## Version Compatibility
- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+ (for backend)
- Nginx 1.21+ (for frontend)
- Works on Windows, macOS, and Linux

## Additional Resources
- Docker Documentation: https://docs.docker.com
- Docker Compose Documentation: https://docs.docker.com/compose
- Node.js Docker Best Practices: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
- Docker Security Best Practices: https://docs.docker.com/develop/security-best-practices
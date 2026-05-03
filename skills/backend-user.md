# Backend User Management

Implements user authentication and management with JSON data structures and constants. Use this when you need to set up user-related API endpoints with proper data handling and validation. This skill creates standardized user models, authentication helpers, and constant definitions following backend best practices.

**Version:** 1.0.0

**Category:** backend
**Roles:** backend, fullstack

---

## Prerequisites

- Existing Node.js/Express project structure
- Database connection configured (MongoDB, PostgreSQL, or MySQL)
- Authentication middleware available or ready to implement
- Environment variables configured for sensitive data

---

## Inputs

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user_fields` | array | Yes | List of user model fields (e.g., email, username, password) |
| `auth_type` | string | Yes | Authentication type: jwt, session, or oauth |
| `database_type` | string | Yes | Database type: mongodb, postgresql, or mysql |

---

## Steps

### Step 1: Analyze Project Structure

First, use the `list_files` tool to examine the project structure and identify where user-related files should be placed.
Look for existing patterns in `models/`, `controllers/`, `routes/`, and `middleware/` directories.
Note the naming conventions and file organization used in the project.

### Step 2: Create User Model with Constants

Next, use the `write_to_file` tool to create a user model file at `models/User.js` (or appropriate path based on project structure).
Define user schema with the fields specified in `user_fields` input.
Include constants for user roles, statuses, and validation rules at the top of the file.
Use proper data types and validation constraints based on the `database_type`.

### Step 3: Create Authentication Helper

Then, use the `write_to_file` tool to create an authentication helper at `utils/auth.js`.
Implement functions for password hashing, token generation, and validation based on `auth_type`.
Include constants for token expiration, salt rounds, and other authentication parameters.
Ensure all sensitive values use environment variables (e.g., `process.env.JWT_SECRET`).

### Step 4: Create User Controller

After that, use the `write_to_file` tool to create a controller at `controllers/userController.js`.
Implement CRUD operations: register, login, getProfile, updateProfile, deleteUser.
Include proper error handling with try/catch blocks and meaningful error messages.
Use the authentication helper and user model created in previous steps.

### Step 5: Create User Routes

Next, use the `write_to_file` tool to create routes at `routes/users.js`.
Define RESTful endpoints: POST /register, POST /login, GET /profile, PUT /profile, DELETE /profile.
Apply authentication middleware to protected routes.
Include input validation middleware for each endpoint.

### Step 6: Register Routes in Main App

Then, use the `read_file` tool to examine the main application file (usually `app.js` or `server.js`).
Use the `apply_diff` tool to add the user routes import and registration.
Ensure routes are registered in the correct order relative to other middleware.

### Step 7: Create User Constants File

Finally, use the `write_to_file` tool to create a constants file at `constants/userConstants.js`.
Define all user-related constants: roles (ADMIN, USER, GUEST), statuses (ACTIVE, INACTIVE, BANNED), validation rules (MIN_PASSWORD_LENGTH, MAX_USERNAME_LENGTH).
Export constants as named exports for use throughout the application.

---

## Outputs

- `models/User.js` — User model with schema definition and validation
- `utils/auth.js` — Authentication helper functions with password hashing and token management
- `controllers/userController.js` — User controller with CRUD operations and error handling
- `routes/users.js` — RESTful user routes with authentication and validation middleware
- `constants/userConstants.js` — User-related constants for roles, statuses, and validation rules

---

## Example Usage

**User request:**
> Set up user management with email, username, password fields using JWT authentication and MongoDB

**Expected output:**
- `models/User.js` — MongoDB schema with email, username, password fields
- `utils/auth.js` — JWT token generation and password hashing with bcrypt
- `controllers/userController.js` — Register, login, profile management functions
- `routes/users.js` — POST /register, POST /login, GET /profile endpoints
- `constants/userConstants.js` — USER_ROLES, USER_STATUS, VALIDATION_RULES constants

---

## Notes

- Always use environment variables for sensitive data (JWT secrets, database credentials)
- Implement rate limiting on authentication endpoints to prevent brute force attacks
- Use bcrypt with at least 10 salt rounds for password hashing
- Include proper input validation and sanitization to prevent injection attacks

## Warnings

> ⚠️ Never store passwords in plain text. Always hash passwords before saving to database.

> ⚠️ Ensure JWT_SECRET is a strong, randomly generated string stored in environment variables.

> ⚠️ Implement proper error handling to avoid exposing sensitive information in error messages.

## Related Skills

- API Security Implementation
- Database Schema Generator
- Authentication Middleware Setup

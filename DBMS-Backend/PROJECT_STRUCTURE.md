# Smart Blood Donation Backend Project Structure

This document describes the file and directory structure for the `DBMS-Backend` backend project.

## Root Files

- `.env` - Environment variables for runtime configuration
- `.env.example` - Example environment variables
- `.gitignore` - Git ignore rules
- `docker-compose.yml` - Docker Compose configuration for Postgres and pgAdmin
- `package.json` - Node.js project metadata, scripts, and dependencies
- `package-lock.json` - npm dependency lock file
- `prisma.config.ts` - Prisma configuration file
- `README.md` - Project readme and instructions
- `tsconfig.json` - TypeScript compiler configuration
- `PROJECT_STRUCTURE.md` - This project structure file

## Directories

### `src/`

- `app.js` - Main Express application entrypoint

#### `src/routes/`

- `authRoutes.js` - Routes for authentication
- `cartRoute.js` - Routes for cart operations
- `categoryRoute.js` - Routes for category management
- `emergencyRoute.js` - Routes for emergency requests
- `orderRoutes.js` - Routes for order processing
- `productRoute.js` - Top-level product route mounting
- `userRoutes.js` - Routes for user management

##### `src/routes/products/`

- `index.js` - Product sub-route aggregator
- `productRoute.js` - Product CRUD routes
- `imageRoute.js` - Product image routes
- `variantRoute.js` - Product variant routes

#### `src/controllers/`

- `authController.js` - Authentication controller logic
- `cartController.js` - Cart business logic
- `categoryController.js` - Category business logic
- `orderController.js` - Order business logic
- `userController.js` - User management business logic

##### `src/controllers/product/`

- `productController.js` - Product CRUD and validation logic

#### `src/database/`

- `prisma.js` - Prisma client initialization

#### `src/middleware/`

- `authMiddleware.js` - JWT authentication middleware
- `adminMiddleware.js` - Admin role authorization middleware

### `prisma/`

- `schema.prisma` - Prisma schema definition
- `migrations/` - Database migration history

### `generated/prisma/`

- `browser.ts` - Prisma browser client types
- `client.ts` - Prisma client type definitions
- `commonInputTypes.ts` - Generated input types
- `enums.ts` - Generated enums
- `models.ts` - Generated Prisma models
- `internal/` - Internal generated Prisma helpers
- `models/` - Generated model-specific definitions

## Notes

- The backend is a Node.js + Express API server using Prisma and PostgreSQL.
- The current server entrypoint is `src/app.js`.
- Routes are organized under `src/routes`, with controllers under `src/controllers`.
- The project uses environment variables from `.env` and connects to a PostgreSQL database.
- `docker-compose.yml` can stand up a local Postgres and pgAdmin service.

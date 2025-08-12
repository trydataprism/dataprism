# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Primary development workflow:**
- `bun dev` - Start both web (port 3001) and server (port 3000) in development mode with hot reload
- `bun build` - Build all applications for production
- `bun check-types` - Run TypeScript type checking across all apps

**Individual app development:**
- `bun dev:web` - Start only the Next.js web app (port 3001)
- `bun dev:server` - Start only the Hono server (port 3000)

**Database operations:**
- `bun db:push` - Push schema changes to PostgreSQL database
- `bun db:studio` - Open Drizzle Studio for database management
- `bun db:generate` - Generate migration files
- `bun db:migrate` - Run pending migrations

**Code quality:**
- `bun lint` (web app only) - Run Next.js linting via `next lint`

## Architecture Overview

**Monorepo Structure:**
- Uses Turborepo for build orchestration and caching
- Bun as runtime and package manager
- Two main applications: `web` (frontend) and `server` (backend)

**Frontend (apps/web):**
- Next.js 15 with React 19 and TypeScript
- TailwindCSS v4 with shadcn/ui components (New York style)
- Better Auth client for authentication
- TanStack Query for data fetching and state management
- TanStack Form for form handling with validation
- Three.js integration via @react-three/fiber and @react-three/drei

**Backend (apps/server):**
- Hono framework for API routes
- Better Auth for authentication with email/password
- Drizzle ORM with PostgreSQL database
- CORS configured for cross-origin requests
- Database schema located in `src/db/schema/auth.ts`

**Authentication Flow:**
- Better Auth handles authentication on both client and server
- Server exposes auth routes at `/api/auth/**`
- Client uses Better Auth React hooks for auth state management
- Database schema includes users, sessions, accounts, and verification tables

**Database Configuration:**
- PostgreSQL with Drizzle ORM
- Schema files in `apps/server/src/db/schema/`
- Migrations in `apps/server/src/db/migrations/`
- Database configuration in `apps/server/drizzle.config.ts`

**Key Patterns:**
- Component composition using shadcn/ui patterns
- TypeScript-first development across all packages
- Environment variables for configuration (DATABASE_URL, BETTER_AUTH_SECRET, etc.)
- Structured auth schema with proper foreign key relationships

## Environment Setup

Ensure PostgreSQL is running and configured. Update `apps/server/.env` with:
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret for auth token signing
- `BETTER_AUTH_URL` - Base URL for auth endpoints
- `CORS_ORIGIN` - Allowed origins for CORS

After environment setup, run `bun db:push` to apply the database schema.
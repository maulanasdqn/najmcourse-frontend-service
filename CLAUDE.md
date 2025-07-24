# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a course management system called "NAJM Course" built with React and TypeScript. It's a monorepo using Nx with two main applications:

- **backoffice**: Admin interface for course management
- **cat**: CAT (Computer Adaptive Testing) interface for exam taking

## Development Commands

### Build & Development
```bash
# Build all apps
npm run build

# Run development servers
npm run backoffice:dev    # Backoffice admin app
npm run cat:dev          # CAT exam app

# Build specific apps
npm run backoffice:build
npm run cat:build

# Preview builds
npm run backoffice:preview
```

### Testing & Quality
```bash
# Run all tests
npm run test

# Run tests for specific apps
npm run backoffice:test
npm run cat:test

# Run linting
npm run lint

# Run linting for specific apps
npm run backoffice:lint
npm run cat:lint
```

### Nx Commands
```bash
# Run specific targets across projects
nx run-many -t=vite:test
nx run-many -t=vite:build
nx run-many -t=eslint:lint

# Run for specific project
nx vite:dev backoffice
nx vite:test cat
```

## Architecture

### Monorepo Structure

The project uses Nx monorepo with the following structure:

- `apps/`: Application projects
  - `backoffice/`: Admin dashboard app
  - `cat/`: Exam taking app
  - `*-e2e/`: End-to-end test projects
- `shared/`: Shared libraries
  - `apis/`: API layer and types
  - `commons/`: Common constants and utilities
  - `components/`: Reusable UI components
  - `hooks/`: Custom React hooks
  - `libs/`: Core libraries (axios, cookies, etc.)
  - `utils/`: Utility functions

### Path Aliases

The project uses TypeScript path aliases for clean imports:
- `@/shared/apis/*` → `shared/apis/src/*`
- `@/shared/commons/*` → `shared/commons/src/*`
- `@/shared/components/*` → `shared/components/src/*`
- `@/shared/hooks/*` → `shared/hooks/src/*`
- `@/shared/libs/*` → `shared/libs/src/*`
- `@/shared/utils/*` → `shared/utils/src/*`

### Key Technologies

- **React 19** with React Router 7 for routing
- **TypeScript** for type safety
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Ant Design** for UI components
- **React Query** for data fetching
- **Zustand** for state management
- **React Hook Form** with Zod validation
- **Vitest** for testing
- **ESLint** for code quality

### Authentication & Authorization

Both apps use a sophisticated role-based access control (RBAC) system:

- **Middleware**: Route protection based on user permissions and feature flags
- **Session Management**: Token-based auth with localStorage and cookies
- **Feature Flags**: Dynamic feature enabling/disabling
- **Role-based Routing**: Different routes accessible based on user roles

Key files:
- `apps/*/src/middleware.ts`: Route protection logic
- `shared/commons/src/constants/permissions.ts`: Permission definitions
- `shared/libs/src/feature-flag/`: Feature flag management

### Data Management

- **API Layer**: Centralized in `shared/apis/` with typed endpoints
- **Custom Hooks**: Domain-specific hooks in `shared/hooks/`
- **State Management**: Zustand stores in `shared/libs/src/zustand/`
- **Query Client**: React Query setup in `shared/libs/src/react-query/`

### Component Architecture

- **Controlled Components**: Form components with React Hook Form integration
- **Storybook**: Component documentation and testing
- **Test Co-location**: Tests alongside components (`*.test.tsx`, `*.spec.tsx`)
- **Story Co-location**: Storybook stories alongside components (`*.stories.tsx`)

## Development Guidelines

### File Organization

- Follow the established pattern: `create/`, `list/`, `[id]/detail/`, `[id]/update/`
- Co-locate tests and stories with components
- Use `_hooks/`, `_components/`, `_constants/` for private modules
- Keep API schemas in `shared/apis/src/*/schema.ts`

### Testing Strategy

- **Unit Tests**: Vitest with React Testing Library
- **Component Tests**: Storybook with addon-test
- **E2E Tests**: Playwright for both applications
- **Test Setup**: `vitest.setup.ts` configures global test environment

### Code Quality

- **ESLint**: Strict TypeScript and React rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **TypeScript**: Strict mode enabled

## Environment Setup

- **Node.js**: v22.15.0 (use nvm for version management)
- **Package Manager**: npm
- **Development**: Uses Vite dev server with HMR
- **Docker**: Optional containerized development

## Common Patterns

### Creating New Pages
1. Create folder structure: `feature/[operation]/` (e.g., `users/create/`)
2. Add `page.tsx` with route component
3. Create `_hooks/` for business logic
4. Add tests in `__tests__/` and stories in `__stories__/`

### API Integration
1. Define types in `shared/apis/src/*/type.ts`
2. Add schema validation in `shared/apis/src/*/schema.ts`
3. Create API functions in `shared/apis/src/*/api.ts`
4. Build custom hooks in `shared/hooks/src/*/`

### Adding New Features
1. Check feature flags in `shared/libs/src/feature-flag/`
2. Update route permissions in middleware
3. Add routes to `shared/commons/src/constants/routes.ts`
4. Update API endpoints in `shared/commons/src/constants/endpoints.ts`
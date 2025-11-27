# Student Registration System

## Overview

A modern full-stack web application for managing student registrations and academic records. The system provides an intuitive interface for registering new students, viewing student information in both grid and table layouts, and performing CRUD operations on student data. Built with a focus on clean design, professional polish, and educational/administrative trust.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React with TypeScript
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack React Query (v5) for server state management
- **UI Framework:** Shadcn UI (New York style variant) with Radix UI primitives
- **Styling:** Tailwind CSS with custom design system
- **Form Handling:** React Hook Form with Zod validation via @hookform/resolvers

**Design System:**
- Typography: Inter font family (Google Fonts)
- Color scheme: HSL-based color system with CSS variables for theming
- Custom spacing units following Tailwind's scale (4, 6, 8, 12, 16, 24)
- Modern design approach inspired by Linear and Notion
- Responsive layouts with mobile-first approach

**Key Pages:**
1. **Dashboard** (`/`) - Student listing with grid/table view toggle, search, and course filtering
2. **Registration** (`/register`) - Two-column layout with form and benefits panel
3. **Not Found** (`/404`) - Error page for invalid routes

**Component Architecture:**
- Reusable UI components from Shadcn UI library
- Custom domain components (StudentCard, StudentTable, StudentForm)
- Dialog-based editing and deletion workflows
- Toast notifications for user feedback

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js for HTTP server
- **Build Tool:** ESBuild for server bundling, Vite for client bundling
- **Development:** TSX for TypeScript execution in development

**API Structure:**
- RESTful API endpoints under `/api` prefix
- Routes defined in `server/routes.ts`
- CRUD operations for students:
  - `GET /api/students` - List all students
  - `GET /api/students/:id` - Get single student
  - `POST /api/students` - Create new student
  - `PUT /api/students/:id` - Update student
  - `DELETE /api/students/:id` - Delete student

**Storage Layer:**
- Abstracted storage interface (`IStorage`) for flexibility
- In-memory storage implementation (`MemStorage`) for development
- Prepared for database integration with schema definitions

**Validation:**
- Zod schemas for runtime type validation
- Shared schema definitions between client and server (`shared/schema.ts`)
- Validation error handling with zod-validation-error for user-friendly messages

### Data Models

**Student Schema:**
```typescript
{
  id: string (UUID, auto-generated)
  studentId: string (unique, format: STU{YEAR}{5-digit-random})
  firstName: string (min 2 chars)
  lastName: string (min 2 chars)
  email: string (unique, validated email format)
  phone: string (min 10 digits, phone format validation)
  course: string
  enrollmentDate: string (ISO date format)
}
```

**User Schema** (prepared for future authentication):
```typescript
{
  id: string (UUID)
  username: string (unique)
  password: string (hashed)
}
```

### Database Configuration

**ORM:** Drizzle ORM configured for PostgreSQL
- Schema definitions in `shared/schema.ts` using Drizzle's table builders
- Migration support via drizzle-kit
- Prepared for Neon Database integration (`@neondatabase/serverless`)
- Connection pooling ready with `connect-pg-simple` for session storage

**Migration Strategy:**
- Migrations output to `./migrations` directory
- Schema sync via `npm run db:push` command

### Build & Deployment

**Development Mode:**
- Vite dev server with HMR for client
- TSX execution for Express server with auto-reload
- Source maps enabled for debugging

**Production Build:**
- Client: Vite builds to `dist/public` with optimized bundles
- Server: ESBuild bundles to `dist/index.cjs` with selective dependency bundling
- Selected dependencies bundled into server for faster cold starts (reduces openat syscalls)
- External dependencies remain as node_modules imports

**Bundling Strategy:**
- Allowlist approach: Critical dependencies bundled into server bundle
- Database drivers, session stores, and core utilities are bundled
- Large or rarely-used dependencies kept external

## External Dependencies

### Core Infrastructure
- **Database:** PostgreSQL (via Neon serverless driver)
- **Session Store:** PostgreSQL-backed sessions (connect-pg-simple)

### UI Component Library
- **Radix UI:** Complete set of unstyled, accessible components
  - Dialogs, Popovers, Select, Accordion, Toast, Dropdown Menu
  - Form primitives: Checkbox, Radio Group, Switch, Slider
  - Navigation: Tabs, Navigation Menu, Menubar
  - Data display: Avatar, Badge, Card, Table, Separator

### Development Tools
- **Replit Integrations:**
  - vite-plugin-runtime-error-modal for error overlays
  - vite-plugin-cartographer for code navigation
  - vite-plugin-dev-banner for development indicators

### Styling & Utilities
- **Tailwind CSS:** Utility-first CSS framework with PostCSS
- **class-variance-authority:** Type-safe variant styling
- **clsx & tailwind-merge:** Conditional class name utilities
- **date-fns:** Date formatting and manipulation

### Form & Validation
- **React Hook Form:** Form state management
- **Zod:** Schema validation
- **drizzle-zod:** Generate Zod schemas from Drizzle table definitions

### Data Fetching
- **TanStack React Query:** Server state synchronization with caching
- **Fetch API:** Native HTTP client for API requests

### Available Courses
The system supports registration for the following courses:
- Computer Science
- Information Technology
- Data Science
- Cybersecurity
- Software Engineering
- Artificial Intelligence
- Web Development
- Mobile Development
- Cloud Computing
- Business Administration
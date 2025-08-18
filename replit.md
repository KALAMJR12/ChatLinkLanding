# TalentsHive - Technology Training Platform

## Overview

TalentsHive is a comprehensive technology training platform offering professional courses in high-demand fields like Cybersecurity, Web Development, and Networking. The platform features course browsing, instructor profiles, student testimonials, application management, and contact functionality. It provides both virtual online training and in-person classroom options with flexible pricing tiers to accommodate different learning preferences and budgets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Design System**: Custom gradient themes, neutral color palette, and consistent spacing

### Backend Architecture
- **Framework**: Express.js with TypeScript for REST API
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema generation
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **Validation**: Zod schemas shared between frontend and backend
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Definition**: Centralized in shared/schema.ts with generated TypeScript types
- **Database Tables**: courses, instructors, testimonials, applications, contact_messages
- **Data Validation**: Drizzle-zod integration for runtime schema validation
- **Storage Pattern**: Repository pattern with IStorage interface and MemStorage implementation

### Development Environment
- **Build System**: Vite for development server and production builds
- **Development Tools**: ESBuild for server-side bundling, TypeScript for type checking
- **Hot Reloading**: Vite HMR for frontend, tsx watch mode for backend
- **Asset Handling**: Vite-based asset processing with path aliases for clean imports

### API Design
- **RESTful Endpoints**: Standard CRUD operations for all entities
- **Response Format**: Consistent JSON responses with proper error handling
- **Request Logging**: Middleware for API request/response logging
- **CORS Handling**: Configured for cross-origin requests in development

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Connection**: Environment-based DATABASE_URL configuration

### UI Libraries
- **Radix UI**: Comprehensive primitive components for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for content display
- **Class Variance Authority**: Utility for component variant management

### Development Tools
- **Vite Plugins**: Runtime error overlay, cartographer for development
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Date Utilities**: date-fns for date manipulation

### Styling Framework
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **CSS Variables**: Theme-based design tokens for consistent styling
- **Font Integration**: Google Fonts (Inter, DM Sans, Fira Code, Geist Mono)

### Build and Deployment
- **Production Build**: Vite for client build, ESBuild for server bundling
- **Static Assets**: Vite-based asset optimization and bundling
- **Environment Configuration**: Development/production environment handling
# KSHB Gamified Brewery Guide

## Build Commands
- `npm run dev` - Run development server
- `npm run build` - Build for production 
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style Guidelines

### JavaScript/TypeScript
- Use TypeScript for type safety (strict mode enabled)
- Use React functional components with hooks
- No unused variables or parameters (enforced by tsconfig)

### Structure & Organization
- Component files use PascalCase (.tsx extension)
- Utility files use camelCase (.ts extension)
- Use proper TypeScript interfaces for component props and state
- Keep components focused and reasonably sized

### Formatting & Conventions
- Use ES6+ features (arrow functions, destructuring, etc.)
- Import order: React, external libraries, internal components, styles
- Consistent indentation with 2 spaces
- Use tailwindcss for styling

### Error Handling
- Handle potential nulls properly with optional chaining (?.)
- Use appropriate TypeScript types to avoid runtime errors

This project is a gamified guide for brewing beer at Kristiania Brygg.
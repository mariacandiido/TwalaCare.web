---
description: Repository Information Overview
alwaysApply: true
---

# TwalaCare Information

## Summary
TwalaCare is a comprehensive pharmaceutical e-commerce platform developed with React and TypeScript. It facilitates online medication purchases from multiple pharmacies, featuring real-time order tracking, prescription validation, and multi-role dashboards (Client, Pharmacy, Delivery, and Admin).

## Structure
- **src/components/**: Role-specific components (admin, cliente, entregador, farmacia) and reusable UI/layout elements.
- **src/hooks/**: Custom React hooks for shared logic.
- **src/services/**: API service implementations (currently using mock data).
- **src/store/**: Global state management powered by Zustand.
- **src/types/**: TypeScript interfaces and type definitions.
- **src/utils/**: Shared utility and helper functions.
- **src/styles/**: Global CSS and Tailwind configurations.

## Language & Runtime
**Language**: TypeScript  
**Version**: Node.js 16+, npm 8+  
**Build System**: Vite 6.x  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- `react`: ^18.3.1
- `react-router-dom`: ^6.27.0
- `zustand`: ^4.5.5
- `lucide-react`: ^0.487.0
- `radix-ui/*`: Accessible UI primitives
- `react-hook-form`: ^7.55.0
- `recharts`: ^2.15.2
- `swiper`: ^12.0.3
- `i18next`: ^25.8.4

**Development Dependencies**:
- `vite`: ^6.4.1
- `tailwindcss`: ^3.4.1
- `typescript`: ^5.x (via tsconfig)
- `postcss`: ^8.5.6
- `autoprefixer`: ^10.4.23

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

## Testing

**Framework**: Manual Testing Checklist
**Test Location**: Documented in `TESTING.md`
**Naming Convention**: N/A (Manual)
**Configuration**: N/A

**Run Command**:
```bash
# Verify application state manually via development server
npm run dev
```

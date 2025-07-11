# 🚀 Home Forge Fit - Complete Tech Stack

## **Frontend Framework**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server

## **UI & Styling**
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful, customizable icons
- **Glass-morphism Design** - Modern UI with backdrop blur effects

## **Routing & Navigation**
- **React Router DOM** - Client-side routing
- **Programmatic Navigation** - Dynamic route handling with state passing

## **State Management**
- **React Hooks** - useState, useEffect, useCallback
- **Local State** - Component-level state management
- **URL State** - Route-based state passing

## **Payment Processing**
- **Stripe** - Payment processing and subscription management
- **Stripe Pricing Table** - Hosted subscription interface
- **Stripe Checkout** - Secure payment flow
- **Webhook Handling** - Subscription event processing

## **Backend & API**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Stripe SDK** - Server-side Stripe integration
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Secure configuration management

## **Development Tools**
- **ESLint** - Code linting and quality
- **TypeScript Compiler** - Type checking
- **Vite Dev Server** - Hot module replacement
- **PostCSS** - CSS processing

## **Drag & Drop Functionality**
- **@dnd-kit/core** - Core drag and drop functionality
- **@dnd-kit/sortable** - Sortable list components
- **@dnd-kit/utilities** - Utility functions for drag and drop

## **Project Structure**
```
home-forge-fit/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui components
│   │   ├── Checkout.tsx           # Stripe pricing table
│   │   └── WorkoutTimer.tsx       # Timer component
│   ├── pages/
│   │   ├── Index.tsx              # Landing page
│   │   ├── Training.tsx           # Workout builder
│   │   ├── WorkoutDisplay.tsx     # Workout display
│   │   ├── Success.tsx            # Payment success
│   │   ├── Cancel.tsx             # Payment cancel
│   │   └── NotFound.tsx           # 404 page
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # App entry point
├── stripe-backend/
│   ├── server.js                  # Express server
│   ├── package.json               # Backend dependencies
│   └── .env                       # Environment variables
├── public/                        # Static assets
├── package.json                   # Frontend dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite configuration
```

## **Key Features & Technologies**

### **�� Core Functionality**
- **Workout Generation** - Dynamic workout creation based on equipment
- **Drag & Drop** - Reorderable exercise lists
- **Timer System** - Work/rest interval timing
- **Equipment Selection** - Jumping rope, rubber straps, bodyweight, kettlebells

### **�� Payment System**
- **Subscription Management** - SEK 79/month with 7-day trial
- **Stripe Integration** - Live payment processing
- **Webhook Handling** - Real-time subscription events
- **Success/Cancel Flows** - Complete payment UX

### **⚡ Performance & Optimization**
- **Vite Build** - Fast development and production builds
- **Code Splitting** - Lazy-loaded components
- **TypeScript** - Compile-time error checking
- **Tailwind JIT** - Just-in-time CSS compilation

### **🔒 Security**
- **Environment Variables** - Secure API key management
- **CORS Configuration** - Safe cross-origin requests
- **Stripe Security** - PCI-compliant payment processing
- **TypeScript** - Runtime error prevention

### **📱 Responsive Design**
- **Mobile-First** - Optimized for all screen sizes
- **Touch Interactions** - Mobile-friendly drag and drop
- **Progressive Web App** - Modern web app features

## **Development Environment**
- **Node.js 18+** - JavaScript runtime
- **npm/yarn** - Package management
- **Git** - Version control
- **VS Code** - Recommended IDE with TypeScript support

## **Deployment Ready**
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Heroku, Railway, or serverless platforms
- **Environment Variables** - Production configuration
- **Stripe Live Mode** - Production payment processing

## **Testing & Quality**
- **TypeScript** - Static type checking
- **ESLint** - Code quality and consistency
- **Stripe Test Mode** - Safe payment testing
- **Browser Testing** - Cross-browser compatibility

This tech stack provides a modern, scalable, and maintainable foundation for your fitness application with professional-grade payment processing and user experience!
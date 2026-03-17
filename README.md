# Yugam Frontend

A modern, high-performance dashboard and management application built with React 19, TypeScript, and Vite.

## 🚀 Technologies

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [PrimeReact](https://primereact.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [PrimeIcons](https://primereact.org/icons/)
- **Data Visualization**: [Recharts](https://recharts.org/), [Chart.js](https://www.chartjs.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Yup](https://github.com/jquense/yup) validation

- **Utilities**: `date-fns`, `lodash`, `xlsx`, `jspdf`, `html2canvas`, `sonner`

## ✨ Features

- **Authentication**: Secure login flow, forgot password recovery, and OTP verification.
- **UAM (User Access Management)**: Robust role-based access control (RBAC) with detailed user and role management.
- **Orbit Module**: Specialized module for data processing and visualization.
- **Estimo Module**: Advanced estimation and assessment toolkit.
- **Dynamic Dashboard**: Real-time business insights and implementation highlights.
- **Crew Management**: Efficient management of team members and organizational resources.
- **Media Support**: Integrated video players (Plyr, React Player) and responsive image handling.
- **Export Capabilities**: Export data to Excel, PDF, and various image formats.
- **Responsive Design**: Fully adaptive UI optimized for desktop, tablet, and mobile.
- **Performance Optimized**: Features React Compiler integration, lazy loading, and automated image optimization.

## 📂 Project Structure

```text
src/
├── api/               # Generic API clients/services
├── assets/            # Static assets (images, global fonts)
├── components/        # Shared UI components
│   ├── common/        # Highly reusable UI elements (Buttons, HOCs, etc.)
│   └── layout/        # Core layout components (SideBar, Header, Footer)
├── features/          # Domain-specific modules (Feature-based structure)
│   ├── auth/          # Login, Forgot Password, OTP, auth state
│   ├── crew/          # Crew & HR management features
│   ├── dashboard/     # Main analytic views & business overview
│   ├── employee/      # Employee directory & profiles
│   ├── estimo/        # Estimation tool & quote generation
│   ├── orbit/         # Specialized data visualization module
│   ├── profile/       # User profile & account settings
│   ├── shift/         # Shift scheduling & management
│   └── uam/           # User & Role Access Management (Gate)
├── hooks/             # Global custom React hooks
├── context/           # Global React Context providers
├── layouts/           # Page template structures
├── api.ts             # Redux ToolKit Query service configuration
├── store.ts           # Centralized Redux store configuration
├── types/             # Shared TypeScript interfaces and types
└── utils/             # Business logic and helper utilities
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v18 or later
- **npm**: v9 or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project directory**:
   ```bash
   cd yugam-frontend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Available Scripts

- **Development**: Start the Vite dev server.
  ```bash
  npm run dev
  ```
- **Build**: Compile and optimize the project for production.
  ```bash
  npm run build
  ```
- **Preview**: Locally preview the production build.
  ```bash
  npm run preview
  ```
- **Lint**: Run ESLint to identify and fix code quality issues.
  ```bash
  npm run lint
  ```

## 🔧 Configuration

- **Tailwind CSS**: Leverages Tailwind v4 for modern, utility-first styling.
- **Vite Plugins**: 
  - `@vitejs/plugin-react`: React support with React Compiler.
  - `vite-plugin-image-optimizer`: High-performance image compression.
  - `vite-imagetools`: Tooling for responsive image generation.


---

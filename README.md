# Adivel AI Frontend

This is the frontend application for the Adivel AI project, an interactive mapping web application.

## Technologies Used

*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (v4)
*   **Map Integration:** Leaflet & React-Leaflet
*   **HTTP Client:** Axios

## Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (or yarn/pnpm)

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root of the `Frontend` directory based on `.env` or `.env.example` configurations. You'll likely need to set your backend API URL and any required map API keys.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the local Vite development server.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    The compiled production, optimized assets will be available in the `dist` directory.

5.  **Preview production build:**
    ```bash
    npm run preview
    ```

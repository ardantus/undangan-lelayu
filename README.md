# Generator Pawartos Lelayu

A specialized web application designed to generate traditional Javanese obituary invitations (Pawartos Lelayu).

## 🌟 Features

-   **Dual Templates**: Choose between **Klasik** (traditional typewriter feel) and **Modern** (clean, contemporary layout).
-   **Live A4 Preview**: See your changes in real-time on a virtual A4 page.
-   **Family Management**: Easily add and manage family members with their relationships to the deceased.
-   **Print-Ready**: Layouts are optimized for A4 printing directly from the browser.
-   **Local Storage/API**: Save and retrieve invitation data via a dedicated API.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
-   **Containerization**: [Docker](https://www.docker.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Getting Started

### Using Docker (Recommended)

1.  Make sure you have Docker and Docker Compose installed.
2.  Run the following command:
    ```bash
    docker compose up -d --build
    ```
3.  Access the application at `http://localhost:3000`.

### Manual Setup

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set up your `.env` file with database credentials.
3.  Run database migrations:
    ```bash
    npx prisma migrate dev
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## 📜 License

MIT

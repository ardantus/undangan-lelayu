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

## �️ Storage Configuration

Aplikasi ini mendukung dua jenis penyimpanan file undangan (`.json`): **SeaweedFS** (lokal) dan **Vercel Blob** (cloud).

### 1. Mode Lokal (Docker / SeaweedFS)
Secara default, jika Anda menggunakan `docker compose up -d --build`, aplikasi akan otomatis menggunakan SeaweedFS lokal karena opsi `STORAGE_TYPE=seaweedfs` telah ditetapkan pada `docker-compose.yml`. Anda tidak perlu konfigurasi tambahan.

### 2. Mode Produksi (Vercel Blob)
Jika Anda men-deploy aplikasi ini ke **Vercel**, sistem akan otomatis menggunakan **Vercel Blob**.
Anda **wajib** menambahkan token berikut ke *Environment Variables* di dashboard Vercel Anda:
`BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxx_xxxxxxxxx"`
(Anda dapat membuat/melihat token ini dari menu *Storage* -> *Vercel Blob* di dashboard proyek Anda).

## 📜 License

Apache License 2.0
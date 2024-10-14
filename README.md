# Neon Read Replicas with Drizzle and Next.js

This project demonstrates how to use Neon read replicas with Drizzle ORM in a Next.js application. It features a simple polling application that leverages Neon's read replica functionality to optimize database operations and improve scalability.

## Features

- Next.js 14.2 with App Router
- Drizzle ORM for database operations
- Neon PostgreSQL database with read replica support
- shadcn/ui components for the frontend
- Tailwind CSS for styling

## Prerequisites

- Node.js and npm
- A Neon account and project

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/dhanushreddy291/neon-read-replica-drizzle
   cd neon-read-replica-drizzle
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your Neon database URLs:
   ```
   DATABASE_URL=postgres://your-username:your-password@your-neon-primary-host/your-database
   DATABASE_URL_READ=postgres://your-username:your-password@your-neon-read-replica-host/your-database
   ```

4. Generate and run migrations:
   ```
   npm run migration:generate
   npm run migration:migrate
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

![Polling App Demo](drizzle_polling_demo_app.png)

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Neon Documentation](https://neon.tech/docs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
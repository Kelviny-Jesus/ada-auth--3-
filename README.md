# Ada Auth

Ada Auth is a modern authentication system built with Next.js, featuring a sleek dark-themed UI for user registration and login. This project provides a solid foundation for implementing secure user authentication in web applications.

## Features

- User Registration
- User Login
- Password Reset functionality
- Responsive dark-themed UI
- Server-side form validation
- Client-side password complexity checks
- Secure password handling
- Session management with cookies
- Dashboard page for authenticated users

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for building web applications
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/ada-auth.git
   cd ada-auth
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
   or
   \`\`\`
   yarn install
   \`\`\`

3. Set up environment variables:
   Create a \`.env.local\` file in the root directory and add the following:
   \`\`\`
   NEXT_PUBLIC_API_URL=https://n8n-blue.up.railway.app/webhook/ada/api
   \`\`\`

4. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`
   or
   \`\`\`
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- \`app/\`: Contains the main application code
  - \`actions/\`: Server actions for handling form submissions
  - \`components/\`: Reusable React components
  - \`layout.tsx\`: Root layout component
  - \`page.tsx\`: Home page component
  - \`login/\`: Login page and related components
  - \`register/\`: Registration page and related components
  - \`dashboard/\`: Dashboard page for authenticated users
- \`public/\`: Static assets
- \`styles/\`: Global styles and Tailwind CSS configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.


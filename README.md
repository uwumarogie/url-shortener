# URL Shortener with QR Code Generation

This project is a URL shortener with QR code generation functionality, built using the T3 Stack. It was bootstrapped with `create-t3-app`.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Learn More](#learn-more)
- [Contributing](#contributing)
- [License](#license)

## Overview

This application allows users to shorten long URLs and generate QR codes for the shortened URLs. It is designed to be simple and intuitive, leveraging modern web technologies to provide a seamless experience.

## Features

- Shorten long URLs
- Generate QR codes for shortened URLs
- Database management with Drizzle
- Styled using Tailwind CSS
- API routes with zod validation

## Technologies Used

This project is built with the following technologies:

- **Next.js**: A React framework for building fast web applications
- **Drizzle**: Lightweight database toolkit
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: TypeScript-first schema validation with static type inference


## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add your environment variables. Refer to `.env.example` for the variables you need to set.

4. **Run the development server:**

    ```bash
    pnpm dev
    ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Shortening a URL:**
    - Enter the long URL in the input field.
    - Click on the "Shorten URL" button.
    - The shortened URL will be displayed along with a QR code.

2. **Scanning a QR code:**
    - Use any QR code scanning app to scan the generated QR code.
    - The app will redirect you to the shortened URL.

## Deployment

To deploy this application, follow one of our deployment guides:

- **Vercel**: [Deploy on Vercel](https://vercel.com/docs)
- **Netlify**: [Deploy on Netlify](https://docs.netlify.com)
- **Docker**: [Deploy with Docker](https://docs.docker.com)

## Learn More

To learn more about the T3 Stack and the technologies used in this project, check out the following resources:

- **T3 Stack Documentation**: [Learn the T3 Stack](https://t3.gg/docs)
- **Next.js Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Drizzle Documentation**: [Drizzle Docs](https://drizzle.team/docs)
- **Tailwind CSS Documentation**: [Tailwind CSS Docs](https://tailwindcss.com/docs)
- **Zod**: [Zod](https://zod.dev/)

## Contributing

We welcome contributions! Please open an issue or submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

If you have any questions or need help, feel free to join our [Discord community](https://discord.com/invite/t3) and ask for assistance. Happy coding!

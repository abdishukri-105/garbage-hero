This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form configuration

The contact form posts to `/api/contact` which delivers submissions via email. Configure one of the following transport options through environment variables before deploying:

### SendGrid

```
SENDGRID_API_KEY=your_sendgrid_api_key
CONTACT_TO=recipient@example.com        # Optional, defaults to info@garbagehero.co.ke
CONTACT_FROM=verified-sender@example.com # Optional, defaults to info@garbagehero.co.ke
CONTACT_FROM_NAME="Garbage Hero"        # Optional display name
```

### SMTP

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
CONTACT_TO=recipient@example.com         # Optional override
CONTACT_FROM=sender@example.com          # Optional override
CONTACT_FROM_NAME="Garbage Hero"         # Optional display name
```

If neither SendGrid nor SMTP credentials are supplied the API will respond with `500 Email service not configured` and the form will show an error message.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

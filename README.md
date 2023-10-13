# Next Fullstack Template

Template for generating fullstack NextJS TypeScript apps

Integrations include:
- Postgres
- Prisma
- Stripe Subscriptions
- Stripe Checkout
- Clerk Auth
- Tanstack Query
- Webhooks
- Sample API Routes

# Running in Dev

## Run ngrok for Clerk webhooks

```bash
hgrok http 3000
```

Update Clerk webhook to reach ngrok url

## Run Stripe CLI for webhooks

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

Configure Stripe CLI before running

## Run Server

```bash
nom run dev
```

# Environment Variables

Environment variables that are required. Clerk keys can be found in Clerk dashboard after creating account, Clerk webhook key can be found after creating a webhook in Clerk. Stripe keys can be found in Stripe after creating an account.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

DATABASE_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
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

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
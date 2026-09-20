# Members Only

A private club messaging board where members can post anonymous messages. Only members can see who wrote each message, and admins can delete any message.

## Features

- User registration and login (Passport.js local auth)
- Membership system with secret passcode
- Admin privileges with separate passcode
- Create and delete messages
- Members see message authors; non-members see anonymous posts
- PostgreSQL session storage

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL
- **Auth:** Passport.js + bcryptjs
- **Views:** EJS
- **Session Store:** connect-pg-simple

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL

### Steps

1. Clone the repo:
   ```bash
   git clone https://github.com/404soul24/members-only.git
   cd members-only
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database and run the schema:
   ```bash
   psql -U postgres -d members_only -f schema.sql
   ```

4. Create a `.env` file:
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=members_only
   SESSION_SECRET=your-session-secret
   PORT=3000
   MEMBERSHIP_PASSCODE=ILoveMembersOnly
   ADMIN_PASSCODE=SuperSecretAdmin123
   ```

5. (Optional) Seed the database:
   ```bash
   npm run seed
   ```

6. Start the dev server:
   ```bash
   npm run dev
   ```

## Deployment to Railway

1. Install the [Railway CLI](https://docs.railway.app/reference/cli):
   ```bash
   npm i -g @railway/cli
   ```

2. Login and init:
   ```bash
   railway login
   railway init
   ```

3. Add a PostgreSQL database:
   ```bash
   railway add --database postgresql
   ```

4. Set environment variables:
   ```bash
   railway variables set SESSION_SECRET=your-production-secret
   railway variables set MEMBERSHIP_PASSCODE=ILoveMembersOnly
   railway variables set ADMIN_PASSCODE=SuperSecretAdmin123
   railway variables set NODE_ENV=production
   ```

5. Deploy:
   ```bash
   railway up
   ```

6. Open the app:
   ```bash
   railway open
   ```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | — |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `members_only` |
| `DATABASE_URL` | Full connection URL (used on Railway, overrides individual DB vars) | — |
| `SESSION_SECRET` | Express session secret | — |
| `PORT` | Server port | `3000` |
| `MEMBERSHIP_PASSCODE` | Passcode to become a member | — |
| `ADMIN_PASSCODE` | Passcode to become an admin | — |

## License

ISC

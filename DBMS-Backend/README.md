
# Smart Blood Donation — DBMS Backend

Backend API for the Smart Blood Donation project. Provides user authentication, donor/receiver management, emergency request CRUD, donor matching, and donation acceptance flows backed by PostgreSQL + Prisma.

## Prerequisites

- Node.js (>=18)
- npm or pnpm
- PostgreSQL (or Docker Compose with a Postgres service)
- Git

## Quick start

1. Clone the repository:

```bash
git clone https://github.com/im-aritra137/smart-blood-donation.git
cd smart-blood-donation/DBMS-Backend
```

2. Copy environment example and update values:

```bash
cp .env.example .env
# edit .env: set DATABASE_URL, JWT_SECRET, PORT (optional)
```

3. Install dependencies:

```bash
npm install
```

4. Run Prisma migrations and generate client:

```bash
npx prisma migrate dev
npx prisma generate
```

5. Start the dev server:

```bash
npm run dev
```

Default server port is configurable via `PORT` in `.env` (commonly `7000`).

## Project layout

- `src/` — application source
	- `app.js` — main Express app
	- `controllers/` — route handlers (including `emergencyController.js`, `donationController.js`)
	- `routes/` — Express route definitions (`emergencyRoutes.js`, `donationRoutes.js`, ...)
	- `database/prisma.js` — Prisma client
- `prisma/` — Prisma schema and migrations
- `src/scripts/` — small smoke tests (e.g. `matchTest.js`, `donationTest.js`)

## Important API endpoints

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Users: `GET /api/users/:id`, `PATCH /api/users/:id`, etc.
- Emergencies:
	- `POST /api/emergency` — create an `EmergencyRequest` (authenticated)
	- `GET /api/emergency` — list emergency requests
	- `GET /api/emergency/:id` — get a request by id
	- `GET /api/emergency/:id/matches` — find matching donors for a request
	- `PATCH /api/emergency/:id/status` — update request `status`
	- `DELETE /api/emergency/:id` — delete request
- Donations:
	- `POST /api/donations` — donor accepts an emergency request; creates a `Donation` record (authenticated)

Examples:

Create an emergency (curl):

```bash
curl -X POST http://localhost:7000/api/emergency \
	-H "Authorization: Bearer <TOKEN>" \
	-H "Content-Type: application/json" \
	-d '{"bloodGroup":"O_POSITIVE","latitude":23.8,"longitude":90.4,"urgency":"HIGH"}'
```

Find matches for a request:

```bash
curl http://localhost:7000/api/emergency/<REQUEST_ID>/matches \
	-H "Authorization: Bearer <TOKEN>"
```

Donate / Accept a request:

```bash
curl -X POST http://localhost:7000/api/donations \
	-H "Authorization: Bearer <DONOR_TOKEN>" \
	-H "Content-Type: application/json" \
	-d '{"requestId":"<REQUEST_ID>"}'
```

## Notes & recommendations

- The `GET /api/emergency/:id/matches` endpoint returns users with the same `bloodGroup`, role `DONOR`, and `isAvailable: true`.
- Consider updating `EmergencyRequest.status` to `MATCHED` when a `Donation` is created. Implement this with a Prisma transaction to avoid partial updates.
- Prevent duplicate donor acceptances by rejecting if a `Donation` from the same donor for the same `requestId` already exists.

## Tests and scripts

- Quick smoke tests are provided in `src/scripts/matchTest.js` and `src/scripts/donationTest.js` — run with:

```bash
node src/scripts/matchTest.js
node src/scripts/donationTest.js
```

## Prisma commands

```bash
npx prisma studio
npx prisma migrate dev
npx prisma migrate reset   # destructive: use with caution
npx prisma generate
```

## Contributing

Open issues or PRs against the `main` branch. For large changes, please open a draft PR and link related issues.

## License

See repository root for license information.

---

If you'd like I can also add example Postman requests, a short API reference file under `docs/`, or update the project's root README — tell me which.

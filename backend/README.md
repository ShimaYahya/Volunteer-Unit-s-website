# Backend

Express API for the Volunteer Unit application. Uses Sequelize with MySQL, bcrypt password hashing, JWT login and Multer disk uploads. [Project setup](../README.md) · [Security audit](../SECURITY_AUDIT.md)

## Run locally

From this directory, run `npm ci`, copy `.env.example` to `.env` if needed, fill in local database credentials, and run `npm start`. The script executes `node ./bin/www`; the default port is 3000. Start from this directory because dotenv and upload storage use relative paths. The `uploads/` directory must exist and be writable.

| Variable | Purpose |
| --- | --- |
| `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_HOST` | Development MySQL connection |
| `NODE_ENV` | Configuration selection; use `development` for this local setup |
| `PORT` | HTTP port, default 3000 |
| `URL` | Absolute API origin used in generated image URLs, without trailing slash |
| `UPLOADS` | Image URL path, normally `/uploads/` |

Only the development database configuration reads `DB_*`. Test and production configurations currently hardcode a root account with a null password and fixed database names. Fix these configurations before using them. JWT signing does not read an environment variable yet.

## Source layout

| Path | Responsibility |
| --- | --- |
| `app.js`, `bin/www` | Middleware, route mounting, server and schema synchronization |
| `config/config.js` | Environment-specific Sequelize configuration |
| `routes/`, `controllers/` | Endpoint declarations and request handling |
| `models/`, `migrations/` | ORM models and incomplete historical migrations |
| `services/auth.js`, `middlewares/` | Password hashing, tokens and access checks |
| `transform/` | Convert stored photo names to absolute URLs |
| `seeders/seedCountries.js` | Country/city seed script; destructive schema reset |
| `uploads/` | Runtime image files, ignored by Git |
| `views/` | Jade default/index/error views |

## HTTP API

Base URL: `http://localhost:3000`. Protected requests use `Authorization: Bearer <token>`. Responses generally include `success`, `message` or `messages`, and `data`; error status and envelope consistency varies by controller.

| Routes | Methods and access |
| --- | --- |
| `/admins/login` | Public POST with `email`, `password`; returns `token` on success |
| `/admins` | GET requires admin authentication; POST currently creates an admin without authentication — critical issue |
| `/admins/:id` | GET checks same admin; PUT checks authentication and same admin |
| `/projects`, `/news`, `/yemenipepole` | Public GET list; authenticated POST |
| `/projects/:id`, `/news/:id`, `/yemenipepole/:id` | Public GET detail; authenticated PUT and DELETE |
| `/execution_type`, `/execution_type/:id` | Public GET; authenticated POST on collection and PUT/DELETE on item |
| `/countries`, `/cities` | Public GET list; cities controller currently returns all cities and does not apply `CountryId` filtering |
| `/uploads/:filename` | Public static upload access |
| `/`, `/users` | Generated Express landing page and placeholder response |

Project/news/people writes accept multipart form data with optional `photo`. Upload routes allow JPEG/PNG declared MIME types and a maximum file size of 5,000,000 bytes. This is not content-signature validation.

Project fields include `project_name`, dates, `country_id`, `city_id`, `execution_type_id`, description, manager/contact details, `project_link`, `project_points`, `num_voliunteers`, `deadline`, `conditions`, `available`, and `photo`. Preserve the existing misspelling `num_voliunteers` when integrating with the model. News fields are `news_title`, `news_date`, `description`, `photo`; featured-person fields are `yemeni_name`, `description`, `photo`; execution types use `execution_type`.

## Database and account setup

Use an empty local database. Startup calls `sequelize.sync({ alter: true })` asynchronously and can alter existing tables. The HTTP server can start before synchronization completes. Replace this with reviewed migrations for production.

The migrations reference Countries/Cities without corresponding creation migrations, use an execution-type table reference that differs from the model convention, and spell the volunteer-count column `num_volunteers` instead of `num_voliunteers`. Do not assume `db:migrate` reproduces the current schema.

`seeders/seedCountries.js` calls `sequelize.sync({ force: true })`, dropping model tables before populating location data. It is not a safe incremental seed. Use it only if deliberately resetting a disposable database; a non-destructive seed is still needed.

No controlled first-admin bootstrap exists. Current signup fields are `firstName`, `lastName`, `email`, `phone_num`, `password`, `password_confirmation`; the open route must be restricted or removed. There is no Volunteers model despite leftover volunteer authentication helpers.

## Validation and release work

There is no `npm test` or lint script. Test public reads, login failures, ownership checks, authenticated CRUD, invalid IDs, invalid uploads and data validation against a disposable database. Do not treat server startup as a test pass.

Before deployment, resolve the hardcoded signing key, open admin registration, hash disclosure, XSS paths, unsafe database defaults and upload handling described in [the audit](../SECURITY_AUDIT.md). Restrict CORS to deployed origins, configure HTTPS and private database access, and run a current dependency audit. Backend-only screenshots are unnecessary; API behavior is demonstrated through the interfaces in [the capture plan](../docs/SCREENSHOTS.md).

# Volunteer Unit — React Interface

An Arabic, right-to-left web interface for the Volunteer Unit of the Owais Al-Qarni Foundation. The application presents volunteer opportunities, project details, news, featured Yemeni people, and information about the organization.

This project is a React and TypeScript migration of the original public interface. It preserves the original visual identity and assets while replacing page-level HTML and direct DOM manipulation with reusable React components, typed API data, React Router, and state-driven interactions.

## Features

- Arabic interface with full RTL layout.
- Responsive navigation and shared footer.
- Volunteer-project listing with execution type, country, and city filters.
- Individual project pages with dates, location, conditions, contact information, and opportunity links.
- News cards with progressive loading and an accessible article dialog.
- API-powered featured-people carousel.
- Responsive layouts for desktop and mobile screens.
- Configurable backend URL through a Vite environment variable.
- Safe React text rendering instead of interpolating API content into `innerHTML`.

## Technology

- React 19
- TypeScript
- React Router 7
- Vite 8
- ESLint
- Bootstrap-derived legacy layout styles
- Font Awesome icons

## Requirements

- Node.js 20 or newer is recommended.
- npm
- The Volunteer Unit Express API, running locally or at a configured URL.

The default API address is `http://localhost:3000`.

## Getting started

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Set the backend address if it differs from the default:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite.

The backend must allow requests from the frontend development origin. Project, news, country, city, execution-type, and featured-person content is loaded from the API at runtime.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Type-check the application and create a production build in `dist/`. |
| `npm run lint` | Run ESLint across the project. |
| `npm run preview` | Preview the generated production build locally. |

## Application routes

| Route | Page |
| --- | --- |
| `/` | Home page, video, statistics, and featured people. |
| `/projects` | Volunteer opportunities and project filters. |
| `/projects/:projectId` | Project details and volunteer link. |
| `/news` | News listing and article dialog. |
| `/contact` | About the Volunteer Unit and contact information. |

Unknown routes redirect to the home page.

## API endpoints

The interface expects the following read endpoints:

| Endpoint | Usage |
| --- | --- |
| `GET /projects` | Project cards and filtering. |
| `GET /projects/:id` | Project details. |
| `GET /execution_type` | Execution-type filter and labels. |
| `GET /countries` | Country filter. |
| `GET /cities` | City filter. |
| `GET /news` | News cards and article content. |
| `GET /yemenipepole` | Featured people on the home page. |

API responses may return the value directly or inside a `data` or `rows` property. Uploaded-image URLs should be absolute or accessible from the browser as returned by the API.

## Project structure

```text
user_interface_react_app/
├── public/
│   ├── img/                 # Shared background and overlay assets
│   ├── img_v/               # Volunteer Unit branding and photography
│   └── styles/              # Migrated legacy styles
├── src/
│   ├── components/
│   │   └── Layout.tsx       # Navigation, footer, page shell, and hero
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   ├── NewsPage.tsx
│   │   └── ContactPage.tsx
│   ├── api.ts               # API URL and typed GET helper
│   ├── types.ts             # API entity interfaces
│   ├── App.tsx              # Router configuration
│   ├── App.css              # React-specific styles
│   └── main.tsx             # Application entry point
├── .env.example
├── package.json
└── vite.config.ts
```

## Production build

Create the optimized application:

```bash
npm run build
```

The output is written to `dist/`. Before deployment, set `VITE_API_URL` to the public HTTPS API address and rebuild the application.

Because the app uses `BrowserRouter`, the hosting service must rewrite unknown application routes to `index.html`. Without this fallback, directly opening or refreshing routes such as `/projects/12` will return a server-level 404.

Example rewrite behavior:

```text
/*  ->  /index.html  200
```

The exact configuration depends on the selected hosting provider.

## Validation

Run both checks before opening a pull request:

```bash
npm run lint
npm run build
```

Manual testing should cover:

- Navigation and RTL layout on desktop and mobile.
- Project loading, filtering, empty states, and detail routes.
- News loading, “show more,” dialog opening, Escape-key closing, and backdrop closing.
- Featured-person carousel controls.
- API failure and loading states.
- External project links and missing-link behavior.

Automated component and end-to-end tests are not currently included.

## Security and privacy

- Do not place secrets in `VITE_*` variables. Vite embeds them in browser code.
- Use HTTPS for the deployed API and frontend.
- Treat all API content as untrusted input.
- Use synthetic or approved personal information in screenshots and demo records.
- Configure the backend to allow only the required frontend origins.

## Attribution and licensing

The interface retains styling and assets migrated from the original Volunteer Unit frontend. The original public template includes HTML Codex attribution requirements, while Bootstrap, Font Awesome, and other bundled libraries retain their respective licenses.

No repository-wide license is declared by this README. Review the original project notices and confirm permission for branding, photographs, and other assets before redistribution or public deployment.

## Contributing

Keep changes focused, preserve Arabic RTL behavior, and run lint and build checks before submitting a pull request. Document changes to API response fields, routes, environment variables, or deployment requirements in this README.

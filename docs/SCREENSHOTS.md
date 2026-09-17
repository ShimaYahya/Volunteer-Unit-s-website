# UI screenshot capture plan

These are required captures, not existing images. Save approved PNG files under `docs/screenshots/`. Markdown tags below are relative to the root README; from a module README use `../docs/screenshots/...`, and from this document use `screenshots/...`.

Start the API and static servers as described in [the root README](../README.md). Use synthetic records with valid location and execution-type relations. Capture desktop at 1440 × 900 and mobile at 390 × 844, with browser zoom at 100%. Use full-page captures for long forms/details when needed. Wait for fonts, images and data to load.

Do not include real phone numbers, private names, email addresses, passwords, tokens, browser storage or developer-console output. Use approved demo imagery. Log in with a local demo account for admin captures, and choose existing demo IDs for edit/detail URLs. Screenshot files were not generated during this review.

## Public interface

| Source page / state | Save path | Description | Root README Markdown tag |
| --- | --- | --- | --- |
| `user_interface/index.html` | `docs/screenshots/public-home-desktop.png` | Desktop Arabic landing page, hero and featured people | `![Arabic volunteer website home](docs/screenshots/public-home-desktop.png)` |
| `user_interface/index.html`, mobile menu open | `docs/screenshots/public-home-mobile.png` | Mobile layout and expanded navigation | `![Mobile home and navigation](docs/screenshots/public-home-mobile.png)` |
| `user_interface/project.html` | `docs/screenshots/public-projects.png` | Populated opportunity cards and filter controls | `![Volunteer opportunities and filters](docs/screenshots/public-projects.png)` |
| `user_interface/project.html`, filters selected | `docs/screenshots/public-projects-filtered.png` | Selected location/type and matching results | `![Filtered volunteer opportunities](docs/screenshots/public-projects-filtered.png)` |
| `user_interface/detail.html?id=<demo-id>` | `docs/screenshots/public-project-detail.png` | Full project details, requirements and safe contact data | `![Volunteer project details](docs/screenshots/public-project-detail.png)` |
| `user_interface/detail.html?id=<demo-id>`, mobile | `docs/screenshots/public-project-detail-mobile.png` | Readable stacked mobile details and action link | `![Project details on mobile](docs/screenshots/public-project-detail-mobile.png)` |
| `user_interface/news.html` | `docs/screenshots/public-news.png` | Populated news cards | `![Volunteer unit news](docs/screenshots/public-news.png)` |
| `user_interface/news.html`, article opened | `docs/screenshots/public-news-detail.png` | Expanded article reading state | `![News article reading view](docs/screenshots/public-news-detail.png)` |
| `user_interface/contact.html` | `docs/screenshots/public-contact.png` | Contact layout with approved public information | `![Contact information page](docs/screenshots/public-contact.png)` |
| `user_interface/project.html`, no matching results | `docs/screenshots/public-projects-empty.png` | Clear empty-result state with visible filters | `![No matching volunteer opportunities](docs/screenshots/public-projects-empty.png)` |

## Administration interface

| Source page / state | Save path | Description | Root README Markdown tag |
| --- | --- | --- | --- |
| `admin_dashboard/index.html` | `docs/screenshots/admin-login.png` | Empty login form without credentials | `![Administrator login](docs/screenshots/admin-login.png)` |
| `admin_dashboard/home.html` | `docs/screenshots/admin-home.png` | Navigation dashboard and content-management entry points | `![Administration dashboard](docs/screenshots/admin-home.png)` |
| `admin_dashboard/projects.html` | `docs/screenshots/admin-projects.png` | Project table with synthetic data and action controls | `![Project administration table](docs/screenshots/admin-projects.png)` |
| `admin_dashboard/add-project.html` | `docs/screenshots/admin-project-create.png` | Full project form with location/type fields and upload | `![Create a volunteer project](docs/screenshots/admin-project-create.png)` |
| `admin_dashboard/edit-project.html?id=<demo-id>` | `docs/screenshots/admin-project-edit.png` | Populated edit form with current photo | `![Edit a volunteer project](docs/screenshots/admin-project-edit.png)` |
| `admin_dashboard/news.html` | `docs/screenshots/admin-news.png` | News table and edit/delete controls | `![News administration](docs/screenshots/admin-news.png)` |
| `admin_dashboard/add-new.html` | `docs/screenshots/admin-news-create.png` | News title/date/body and image form | `![Create a news item](docs/screenshots/admin-news-create.png)` |
| `admin_dashboard/edit-new.html?id=<demo-id>` | `docs/screenshots/admin-news-edit.png` | Populated news editor | `![Edit a news item](docs/screenshots/admin-news-edit.png)` |
| `admin_dashboard/yemenipepole.html` | `docs/screenshots/admin-people.png` | Featured-person table with approved demo portraits | `![Featured people administration](docs/screenshots/admin-people.png)` |
| `admin_dashboard/add-yemeni.html` | `docs/screenshots/admin-person-create.png` | Person name/description/photo form | `![Create a featured person](docs/screenshots/admin-person-create.png)` |
| `admin_dashboard/edit-yemeni.html?id=<demo-id>` | `docs/screenshots/admin-person-edit.png` | Populated person editor | `![Edit a featured person](docs/screenshots/admin-person-edit.png)` |
| `admin_dashboard/execution.html` | `docs/screenshots/admin-execution-types.png` | Execution-type table and management controls | `![Execution type management](docs/screenshots/admin-execution-types.png)` |
| `admin_dashboard/home.html`, mobile | `docs/screenshots/admin-home-mobile.png` | Narrow layout and sidebar navigation | `![Administration dashboard on mobile](docs/screenshots/admin-home-mobile.png)` |
| `admin_dashboard/index.html`, invalid synthetic login | `docs/screenshots/admin-login-error.png` | Visible login-failure feedback, password cleared | `![Administrator login error](docs/screenshots/admin-login-error.png)` |

No dedicated backend UI screenshot is required: it is an API. Avoid presenting the default Express page as a product dashboard. Do not capture profile or trash/restore screens as working features because their supporting API flows are absent.

## Acceptance checklist

- All listed page files exist; replace `<demo-id>` with a real synthetic record ID.
- Verify each captured state actually works; record defects rather than fabricating success states.
- Review Arabic readability, clipping, contrast and image loading at both viewport sizes.
- Inspect images for sensitive information and metadata before committing them.
- Add image embeds to READMEs only after the corresponding files exist; the tags above are deliberately shown as code to avoid broken previews.

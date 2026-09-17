# Administration dashboard

Static HTML/JavaScript administration interface built from SB Admin 2 with Bootstrap 4, jQuery, Font Awesome and DataTables assets. [Root README](../README.md) · [Security audit](../SECURITY_AUDIT.md)

## Local preview

Start the backend on port 3000 using its [README](../backend/README.md). From the workspace root:

```powershell
python -m http.server 5501 --bind 127.0.0.1 --directory admin_dashboard
```

Open `http://localhost:5501/index.html`. Bundled assets make an npm install unnecessary for this static preview. An existing local admin account is required for authenticated edits. No signup UI or safe account seed is supplied.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Admin login |
| `home.html` | Navigation dashboard |
| `projects.html` | Project table and deletion actions |
| `add-project.html`, `edit-project.html?id=<id>` | Project fields, location/type selection and photo upload |
| `news.html` | News table |
| `add-new.html`, `edit-new.html?id=<id>` | News create/edit forms |
| `yemenipepole.html` | Featured Yemeni people table |
| `add-yemeni.html`, `edit-yemeni.html?id=<id>` | Featured-person create/edit forms |
| `execution.html` | Execution-type management |

Most API integration lives in inline page scripts. `js/` also contains theme helpers and leftover feature scripts; `js/profile.js` refers to an unimplemented `/api/admin/profile` endpoint, and `js/trash.js` contains commented restore/delete requests. A trash UI label does not establish recoverable deletion.

## Assets and optional build

`css/` contains ready-to-use styles, `scss/` the Sass sources, `vendor/` bundled third-party assets, and `gulpfile.js` the legacy build. Keep bundled assets in Git while pages reference them.

`npm ci` installs the optional toolchain; `npm start` runs Gulp watch, rebuilds assets and starts BrowserSync. Its configured port is 3000, conflicting with the API. Change the BrowserSync port before using both. Gulp Sass 4 uses the older native Sass toolchain; compatibility with current Node installations has not been verified. Prefer the static preview until the build dependencies are modernized. The Gulp build deletes and repopulates `vendor/`, so preserve any custom changes there first.

## Integration and verification

API URLs are hardcoded to `http://localhost:3000`; editing only backend `.env` does not update browser requests. Login stores `adminToken` in local storage, and mutation requests use a Bearer header. Backend authorization must remain the access boundary; static pages themselves are accessible without login.

Verify login, create/edit/list/delete flows with synthetic records, image previews, expired tokens, empty tables and responsive navigation. Current pages interpolate database fields into HTML; fix these XSS paths before allowing untrusted content. Review logout behavior: the home-page logout link navigates to login without clearing the token.

There are no automated test or lint scripts. Required capture paths, views and Markdown tags are listed in [the screenshot checklist](../docs/SCREENSHOTS.md). Preserve upstream SB Admin 2 and bundled-library notices; the package's upstream metadata has not been customized to this project.

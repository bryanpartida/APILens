# APILens

APILens is a browser-based developer tool for inspecting API JSON responses. Paste a payload, analyze its structure, review detected collections and field types, and preview how the same data could map into UI cards.

The project is currently implemented as a frontend-only React application. It runs locally in the browser, does not require a backend, and does not persist or upload pasted JSON.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [How to Use](#how-to-use)
- [Project Structure](#project-structure)
- [Implementation Notes](#implementation-notes)
- [Resume Highlights](#resume-highlights)
- [Current Limitations](#current-limitations)
- [Roadmap](#roadmap)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [License](#license)

## Features

- Paste any valid JSON object, array, primitive, or nested API response.
- Load a bundled sample payload for a quick demo.
- Parse JSON safely and show readable validation errors.
- Detect root type, top-level keys, nested objects, and collection-like arrays.
- Promote nested arrays into inspectable collections instead of leaving them buried in raw JSON.
- Identify array types, including arrays of objects, arrays of primitives, empty arrays, and mixed arrays.
- Infer field types such as strings, numbers, booleans, dates, image URLs, nulls, objects, and arrays.
- Detect useful UI fields, including likely titles, descriptions, images, dates, and stats.
- Group heterogeneous object collections by schema or discriminator fields such as `type`, `kind`, `category`, and `__typename`.
- Inspect collection data in responsive tables with expandable nested values.
- Switch between a data-focused analysis view and a generated UI preview.
- Render object collections as UI cards using detected title, description, image, and stat fields.
- Preview primitive collections as structured lists.
- Use a responsive glass-style interface built for desktop and mobile browsers.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- JavaScript ES modules
- ESLint 9

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js `^20.19.0` or `>=22.12.0`
- npm

The Node.js requirement comes from the installed Vite toolchain in this project.

### Installation

```bash
git clone <your-repository-url>
cd APILens
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will start the development server, usually at:

```text
http://localhost:5173
```

Open that URL in a browser to use APILens.

### Build for Production

```bash
npm run build
```

The production build is generated in the `dist/` directory.

### Preview the Production Build

```bash
npm run preview
```

This serves the built app locally so you can verify the production output before deployment.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally for review. |
| `npm run lint` | Runs ESLint across the project. |

## How to Use

1. Open the app in your browser.
2. Paste a JSON response into the JSON input panel, or click `Load Sample`.
3. Click `Analyze JSON`.
4. Use `Data View` to inspect the root summary, structure overview, detected collections, schema groups, field types, and collection table.
5. Use `UI Preview` to see how the detected data could be represented as cards or structured lists.
6. If multiple collections are detected, switch between them using the collection tabs.

APILens analyzes pasted JSON directly. It does not currently fetch JSON from remote API URLs.

## Project Structure

```text
APILens/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- components/
|   |   |-- DataView/
|   |   |-- UIPreview/
|   |   |-- ActionBar.jsx
|   |   |-- AnalyzeButton.jsx
|   |   |-- ErrorMessage.jsx
|   |   |-- Header.jsx
|   |   |-- Icons.jsx
|   |   |-- JsonInput.jsx
|   |   `-- Tabs.jsx
|   |-- data/
|   |   `-- sampleJson.js
|   |-- utils/
|   |   |-- jsonAnalysis.js
|   |   |-- parseJson.js
|   |   |-- previewDetection.js
|   |   |-- schemaDetection.js
|   |   `-- valueFormatters.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- eslint.config.js
|-- index.html
|-- package.json
|-- package-lock.json
`-- vite.config.js
```

## Implementation Notes

### Analysis Pipeline

The core analysis logic lives in `src/utils/jsonAnalysis.js`. It walks the parsed JSON payload, identifies nested arrays and objects, assigns normalized collection types, infers field metadata, creates a simplified structure tree, and scores collections so the most useful dataset can be selected automatically.

### Schema Detection

`src/utils/schemaDetection.js` contains heuristics for field type inference. APILens detects primitive types, date-like values, image-like URLs, title-like field names, and common data categories that are useful for UI generation.

### UI Preview Detection

`src/utils/previewDetection.js` selects likely title, description, image, and stat fields from object data. This allows APILens to turn a generic API response into a visual card preview without requiring a custom schema.

### Frontend Composition

The app is split into focused React components:

- `JsonInput` handles user input, sample loading, and analysis actions.
- `DataView` renders metrics, root summaries, structure trees, field summaries, schema groups, and collection tables.
- `UIPreview` renders cards or primitive lists based on the selected collection.
- `Tabs` switches between the analysis and preview experiences.

## Resume Highlights

Use these points as a starting place when describing the project:

- Built a React and Vite developer tool that transforms arbitrary API JSON into structured data insights and UI previews.
- Designed a schema analysis engine that recursively detects nested collections, mixed arrays, derived collections, field types, and discriminator-based schema groups.
- Implemented heuristic UI generation that maps unknown API data into card layouts using detected titles, descriptions, images, and priority stats.
- Created a responsive, polished frontend with Tailwind CSS, reusable components, tabbed workflows, expandable table cells, and mobile-friendly layouts.
- Added client-side JSON parsing and validation to keep the tool lightweight, fast, and private by default.

## Current Limitations

- APILens currently accepts pasted JSON only; it does not fetch data from API URLs.
- There is no backend, authentication, database, or saved project history.
- Table previews are intentionally capped to the first 25 collection items for readability.
- UI image previews render only when an item contains an HTTP or HTTPS image URL.
- Automated tests are not currently included.
- No project license has been declared yet.

## Roadmap

Potential next improvements:

- Fetch and analyze JSON from a user-provided API endpoint.
- Add export options for analysis results, generated schemas, or UI previews.
- Add copy-to-clipboard utilities for detected field paths and generated component data.
- Add automated tests for parsing, collection detection, schema grouping, and preview heuristics.
- Add saved sessions using local storage.
- Deploy a public demo to Vercel, Netlify, or GitHub Pages.

## Troubleshooting

### PowerShell blocks `npm`

On some Windows systems, PowerShell may block the `npm.ps1` shim with an execution policy error. Run the same commands through `npm.cmd` instead:

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

You can also use Command Prompt, Git Bash, or a PowerShell configuration that allows local npm scripts.

## Deployment

APILens builds into static assets, so it can be deployed to any static hosting platform.

```bash
npm run build
```

Deploy the generated `dist/` directory to a static host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## License

This project does not currently include a license. Add a license before publishing the repository for public reuse.

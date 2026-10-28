# ToneLab

ToneLab is the React frontend for a speech emotion recognition project. It lets a user choose an audio clip, send it to the project's prediction API, and view the returned emotion label and class scores in a voice-analysis interface.

**Try the deployed app:** [tonelabb.vercel.app](https://tonelabb.vercel.app/)

ToneLab presents model predictions as interpretations of vocal sound patterns. They should not be treated as facts about what a speaker feels or as a substitute for context or human judgment.

## Features

- Audio file selection and drag-and-drop upload.
- Analyze action that sends the selected audio to the backend and displays the predicted label, top class scores, duration, and a disclaimer.
- Visual waveform-style preview and an acoustic tone breakdown.
- Pages for analysis, past recordings, and an explanation of how the interface works.
- Light and dark themes, with the selected theme stored in browser local storage.
- Responsive navigation for desktop and mobile layouts.

Microphone recording is shown in the interface as a future feature; the current analysis flow requires an uploaded file.

## How it works

The frontend is a Vite application built with React. The analysis page calls the backend's `POST /predict` endpoint using `multipart/form-data` with the audio under the `file` field. It renders the response fields `emotion`, `top_k`, `duration_sec`, and `disclaimer`.

The frontend also defines a `fetchHistory()` API helper that requests `GET /predictions`. The current Past Recordings page displays sample data defined in the frontend rather than loading this API history, so the displayed recording list and metrics are illustrative UI content.

## Requirements

- Node.js and npm.
- Access to the speech emotion recognition backend for live analysis. The backend URL can be configured using `VITE_API_URL`.

## Local development

Clone or open the repository, then install the JavaScript dependencies:

```bash
npm install
```

Create a local environment file such as `.env.local` in the project root to point the frontend at a running backend:

```dotenv
VITE_API_URL=http://127.0.0.1:8000
```

If `VITE_API_URL` is not set, the frontend defaults to `http://127.0.0.1:8000`.

Start the Vite development server:

```bash
npm run dev
```

Use the local URL printed by Vite in the terminal. The backend must be running and configured to allow the frontend origin through CORS.

## Build and preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The available package scripts are `dev`, `build`, and `preview`. There is no test or lint script defined in `package.json`.

## Backend API

The frontend expects the speech emotion recognition API to provide:

| Method | Path | Frontend use |
| --- | --- | --- |
| `POST` | `/predict` | Submit an audio clip and display its prediction |
| `GET` | `/predictions` | Fetch prediction history through an API helper |

For local backend setup, model training, supported formats, and backend configuration, see the speech recognition project repository: [KenyansaAmenya/speech-emotion-recognition](https://github.com/KenyansaAmenya/speech-emotion-recognition).

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_URL` | `http://127.0.0.1:8000` | Base URL used for prediction and history requests |

Because Vite exposes `VITE_` variables to browser code, do not put private credentials or service-role keys in this frontend environment variable.

## Audio upload behavior

The upload component checks that a selected file appears to be audio and rejects files larger than 25 MB in the browser. The backend currently limits uploads to 20 MB and accepts WAV, MP3, FLAC, OGG, and M4A. The frontend's visible helper text and file validation do not exactly match those backend constraints; a file may pass frontend selection and still be rejected by the API.

Audio is sent from the browser to the configured backend for prediction. Do not rely on the UI copy that suggests all processing is on-device or that audio is never sent to a server; the current code calls the remote API. The backend processes a temporary uploaded file and removes it after inference, while prediction metadata may be logged to Supabase depending on backend configuration.

## Technology

- React 18
- Vite 5
- Tailwind CSS 3
- PostCSS and Autoprefixer

## Repository layout

- `src/App.jsx` — page selection and theme state
- `src/pages/Analyze.jsx` — upload, API call, and prediction display
- `src/pages/Recordings.jsx` — sample past-recordings interface
- `src/pages/HowItWorks.jsx` — explanatory content and interactive tone examples
- `src/components/` — header, footer, upload dropzone, and waveform display
- `src/lib/api.js` — backend API calls
- `src/lib/emotions.js` — emotion labels, display styles, and disclaimer text
- `src/index.css` and `tailwind.config.js` — styling and theme configuration

## Current implementation notes

- Microphone capture is not implemented; the UI marks it as coming soon.
- Past Recordings uses hard-coded sample entries and summary metrics. It does not currently display records returned by `GET /predictions`.
- The upload UI allows up to 25 MB, while the backend limit is 20 MB.
- The interface mentions OGG as an allowed format, while the explicit extension check lists MP3, WAV, M4A, and FLAC. Backend support may differ from the browser-side validation.
- The `How It Works` page includes privacy and processing statements. Review those statements against the live deployment and backend behavior before presenting them as guarantees.

  ## How it looks like lightmode
  <img width="1264" height="902" alt="2026-10-28 21 26 38" src="https://github.com/user-attachments/assets/b0638087-2cda-4a29-b314-a0412a07b216" />
 ## Dark mode
 <img width="1221" height="895" alt="2026-10-28 21 55 30" src="https://github.com/user-attachments/assets/7cdbd2fa-9dac-412d-9f98-a9435647ea18" />

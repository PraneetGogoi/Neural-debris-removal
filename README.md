# Neural Debris Removal &mdash; Digital Thesis

This repository contains the interactive digital thesis for **Neural Debris Removal**, a forensics and intervention pipeline designed to extract and neutralize adversarial "debris" (poisoned detections) from compromised object detection models.

Unlike traditional static PDFs, this thesis is built as a living web application. It features live data exploration, interactive decision surfaces, and high-fidelity telemetry extracted directly from the forensic Jupyter notebook (`debris.ipynb`).

## Features

- **Interactive Apparatus (Ch. IV)**: A live `<DecisionSurface />` component that computes and visualizes the model's confidence remapping (`remap_confidence()`) across dynamic thresholds.
- **Dynamic Visuals**: HTML5 Canvas and SVG components (`SkyCanvas`, `ScatterCanvas`) used to render detection fields, ROC curves, and score distributions.
- **Embedded MDX Content**: The entire written thesis is constructed using MDX, blending rigorous academic text with React components (e.g., `<KatexEquation />`, `<GlossaryTerm />`).
- **Glossary & Search**: Built-in definitions, filtering, and cross-referencing for complex notation and acronyms.
- **Responsive & Accessible**: A bespoke dark-mode interface optimized for both desktop analysis and mobile viewing, fully compliant with WCAG AA contrast standards.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, v15+)
- **Content**: [MDX](https://mdxjs.com/) for writing interactive chapters
- **Styling**: Bespoke Vanilla CSS (`globals.css`) & CSS Grid
- **Deployment**: Vercel

## Local Development

To run the thesis interface locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The main content chapters are located in `/content` and the interactive components are found in `/components/ui/visuals`.

## Architecture & Data

- **`/data`**: Contains static JSON exports from the `debris.ipynb` pipeline (e.g. `candidates.json`, `transplant.json`) that drive the interactive visualizations.
- **`/content`**: MDX files structured by chapter (e.g., `pipeline.mdx`, `breach.mdx`).
- **`/components/ui/visuals`**: The core interactive widgets like the Decision Surface and Sky Canvas.

---
*Note: The model weights and raw evaluation datasets are not included in this repository. All visualizations render from cached telemetry.*

# BLB Commentary PDF Downloader

This script downloads David Guzik's commentary on Bible books from Blue Letter Bible as PDFs.

## Requirements

- Node.js 16+
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the script:
```bash
npm start
# or
yarn start
```

The script will:
- Create a `pdfs` directory with a subfolder for each book (e.g., `pdfs/romans/`)
- Download each chapter as a PDF, named after the page title (e.g., "Study Guide for Romans 1 by David Guzik.pdf")
- Apply the specified print settings:
  - 200% scaling
  - A4 paper size
  - Minimum margins
  - No headers/footers
  - Arial font family
  - Minimum font size: 12pt (via CSS clamp so larger fonts are preserved)

## Usage

- To download all chapters of a book:
  ```bash
  npm start <book-name>
  # Example: npm start romans
  ```

- To download a specific chapter:
  ```bash
  npm start <book-name> <chapter-number>
  # Example: npm start romans 6
  ```

## Development

For development with auto-reload:
```bash
npm run dev
# or
yarn dev
```

To build the TypeScript files:
```bash
npm run build
# or
yarn build
``` 
# BLB Commentary PDF Downloader

This script downloads David Guzik's commentary on Hebrews from Blue Letter Bible as PDFs.

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
- Create a `pdfs` directory
- Download each chapter of Hebrews as a PDF
- Apply the specified print settings:
  - 190% scaling
  - A4 paper size
  - Minimum margins
  - No headers/footers
  - Arial font family

The PDFs will be saved as `hebrews-1.pdf`, `hebrews-2.pdf`, etc. in the `pdfs` directory.

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
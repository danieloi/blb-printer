# BLB Commentary PDF Downloader

A TypeScript application that downloads David Guzik's commentary on Bible books from Blue Letter Bible as high-quality PDFs. This project provides both individual book downloading and bulk downloading capabilities for all 66 books of the Bible.

## Features

- 📖 Downloads commentaries for all 66 Bible books (Old & New Testament)
- 🎯 Individual book or chapter downloading
- 📁 Organized file structure with book-specific folders
- 🔄 Bulk download with progress tracking and error handling
- 📄 High-quality PDF output with optimized print settings
- 🛡️ Smart duplicate detection and resumable downloads
- 💾 Auto-generated filenames based on page titles

## Requirements

- Node.js 16+
- npm or yarn
- Internet connection

## Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd blb-printer
```

2. **Install dependencies:**

```bash
npm install
```

## Usage

### Individual Book Downloads

- **Download all chapters of a book:**

  ```bash
  npm start <book-name>
  # Examples:
  npm start romans
  npm start 1-peter
  npm start revelation
  ```

- **Download a specific chapter:**

  ```bash
  npm start <book-name> <chapter-number>
  # Examples:
  npm start romans 6
  npm start matthew 5
  npm start psalm 23
  ```

### Bulk Downloads

- **Download all remaining books:**

  ```bash
  npm run download-all
  ```

  This automatically detects which books are already downloaded and only downloads the missing ones.

- **Download specific books:**

  ```bash
  npm run download-all genesis exodus leviticus
  ```

## File Structure

The script creates organized directories:

```
pdfs/
├── genesis/
│   ├── Study Guide for Genesis 1 by David Guzik.pdf
│   ├── Study Guide for Genesis 2 by David Guzik.pdf
│   └── ...
├── matthew/
│   ├── Study Guide for Matthew 1 by David Guzik.pdf
│   └── ...
└── ... (all 66 Bible books)
```

## Supported Books

**Old Testament (39 books):**
genesis, exodus, leviticus, numbers, deuteronomy, joshua, judges, ruth, 1-samuel, 2-samuel, 1-kings, 2-kings, 1-chronicles, 2-chronicles, ezra, nehemiah, esther, job, psalm, proverbs, ecclesiastes, song-of-solomon, isaiah, jeremiah, lamentations, ezekiel, daniel, hosea, joel, amos, obadiah, jonah, micah, nahum, habakkuk, zephaniah, haggai, zechariah, malachi

**New Testament (27 books):**
matthew, mark, luke, john, acts, romans, 1-corinthians, 2-corinthians, galatians, ephesians, philippians, colossians, 1-thessalonians, 2-thessalonians, 1-timothy, 2-timothy, titus, philemon, hebrews, james, 1-peter, 2-peter, 1-john, 2-john, 3-john, jude, revelation

## PDF Quality Settings

Each PDF is generated with optimized settings:

- **Format:** A4 paper size
- **Scaling:** 200% for crisp text rendering
- **Margins:** Minimal for maximum content
- **Font:** Arial family with minimum 12pt size
- **Background:** Print backgrounds enabled
- **Headers/Footers:** Disabled for clean output

## Development

- **Development with auto-reload:**

  ```bash
  npm run dev
  ```

- **Build TypeScript files:**

  ```bash
  npm run build
  ```

## Advanced Features

### Error Handling

The bulk downloader includes robust error handling:

- Continues downloading if individual books fail
- Provides detailed error reporting
- Suggests retry commands for failed downloads

### Progress Tracking

- Real-time progress updates (e.g., "Downloading genesis (5/61)...")
- Summary reports with success/failure statistics
- Automatic detection of previously downloaded content

### Smart Resume

- Automatically skips books that are already downloaded
- No duplicate downloads or wasted bandwidth
- Safe to run multiple times

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational and personal use. Please respect Blue Letter Bible's terms of service.

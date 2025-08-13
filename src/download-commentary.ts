import puppeteer, { Browser, Page } from "puppeteer";
import { mkdir } from "fs/promises";
import { join } from "path";
import { getBookInfo, BOOK_CHAPTERS } from "./bible-books";

const PDF_DIR = "pdfs";

function getBookInfoFromArgs(): {
  book: string;
  startChapter: number;
  endChapter: number;
} {
  const [, , bookArg, chapterArg] = process.argv;
  const book = (bookArg || "hebrews").toLowerCase().replace(/\s+/g, "-");

  // Try to get book info from our mapping
  const bookInfo = getBookInfo(book);
  if (!bookInfo) {
    throw new Error(
      `Unknown book '${book}'. Please use a valid book name from the Bible.`
    );
  }

  // If chapter is specified, use it as both start and end chapter
  if (chapterArg) {
    const chapter = parseInt(chapterArg, 10);
    if (isNaN(chapter) || chapter < 1 || chapter > bookInfo.chapters) {
      throw new Error(
        `Invalid chapter number. Please specify a number between 1 and ${bookInfo.chapters}.`
      );
    }
    return { book: bookInfo.name, startChapter: chapter, endChapter: chapter };
  }

  // If no chapter specified, download all chapters
  return {
    book: bookInfo.name,
    startChapter: 1,
    endChapter: bookInfo.chapters,
  };
}

function getBaseUrl(book: string): string {
  return `https://www.blueletterbible.org/comm/guzik_david/study-guide/${book}/${book}-`;
}

async function injectPrintStyles(page: Page): Promise<void> {
  await page.addStyleTag({
    content: `
      @media print {
        * {
          font-family: Arial, Helvetica, sans-serif !important;
          font-size: clamp(0.9em, inherit, 100pt) !important; /* Keep original size, min 12pt */
        }
      }
    `,
  });
}

function sanitizeFilename(title: string): string {
  // Remove any characters that aren't safe for filenames
  return title
    .replace(/[<>:"/\\|?*]/g, "-") // Replace invalid filename characters with hyphens
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces
}

async function downloadChapter(
  browser: Browser,
  book: string,
  baseUrl: string,
  chapterNum: number
): Promise<void> {
  const page = await browser.newPage();
  const bookDir = join(PDF_DIR, book);

  try {
    // Navigate to the chapter
    await page.goto(`${baseUrl}${chapterNum}.cfm`, {
      waitUntil: "networkidle0",
    });

    // Get the page title
    const title = await page.title();
    const sanitizedTitle = sanitizeFilename(title);
    const pdfFilename = `${sanitizedTitle}.pdf`;

    // Inject print styles
    await injectPrintStyles(page);

    // Ensure book subdirectory exists
    await mkdir(bookDir, { recursive: true });

    // Generate PDF with specified settings
    await page.pdf({
      path: join(bookDir, pdfFilename),
      format: "A4",
      printBackground: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
      scale: 2.0,
    });

    console.log(`Saved ${book}/${pdfFilename}`);
  } finally {
    await page.close();
  }
}

async function main(): Promise<void> {
  try {
    const { book, startChapter, endChapter } = getBookInfoFromArgs();
    const baseUrl = getBaseUrl(book);
    const browser = await puppeteer.launch({
      headless: true,
    });

    try {
      for (let chapter = startChapter; chapter <= endChapter; chapter++) {
        console.log(`Downloading ${book} chapter ${chapter}...`);
        await downloadChapter(browser, book, baseUrl, chapter);
      }
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();

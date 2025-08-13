import { spawn, ChildProcess } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { OLD_TESTAMENT, NEW_TESTAMENT } from "./bible-books";

interface DownloadProgress {
  totalBooks: number;
  completedBooks: number;
  currentBook: string | null;
  failedBooks: string[];
}

class BibleDownloader {
  private readonly pdfDir = "pdfs";
  private progress: DownloadProgress;

  constructor() {
    this.progress = {
      totalBooks: 0,
      completedBooks: 0,
      currentBook: null,
      failedBooks: [],
    };
  }

  /**
   * Get all Bible books from the testament definitions
   */
  private getAllBooks(): string[] {
    return [
      ...OLD_TESTAMENT.books.map((book) => book.name),
      ...NEW_TESTAMENT.books.map((book) => book.name),
    ];
  }

  /**
   * Check which books are already downloaded by looking for existing folders
   */
  private getDownloadedBooks(): string[] {
    const allBooks = this.getAllBooks();
    return allBooks.filter((book) => {
      const bookDir = join(this.pdfDir, book);
      return existsSync(bookDir);
    });
  }

  /**
   * Get list of books that still need to be downloaded
   */
  private getRemainingBooks(): string[] {
    const allBooks = this.getAllBooks();
    const downloadedBooks = this.getDownloadedBooks();
    return allBooks.filter((book) => !downloadedBooks.includes(book));
  }

  /**
   * Download a single book using the existing npm script
   */
  private downloadBook(bookName: string): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(
        `\n📖 Downloading ${bookName} (${this.progress.completedBooks + 1}/${
          this.progress.totalBooks
        })...`
      );
      this.progress.currentBook = bookName;

      const child: ChildProcess = spawn("npm", ["start", bookName], {
        cwd: process.cwd(),
        stdio: "inherit",
      });

      child.on("close", (code) => {
        if (code === 0) {
          console.log(`✅ ${bookName} completed successfully`);
          this.progress.completedBooks++;
          resolve(true);
        } else {
          console.error(`❌ ${bookName} failed with exit code ${code}`);
          this.progress.failedBooks.push(bookName);
          this.progress.completedBooks++;
          resolve(false);
        }
      });

      child.on("error", (err) => {
        console.error(`❌ Error downloading ${bookName}:`, err.message);
        this.progress.failedBooks.push(bookName);
        this.progress.completedBooks++;
        resolve(false);
      });
    });
  }

  /**
   * Add a delay between downloads to be respectful to the server
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Download all remaining books sequentially
   */
  async downloadAllRemaining(): Promise<void> {
    const remainingBooks = this.getRemainingBooks();
    const downloadedBooks = this.getDownloadedBooks();

    console.log(`📚 Bible Book Download Status:`);
    console.log(`   Total books: ${this.getAllBooks().length}`);
    console.log(
      `   Already downloaded: ${downloadedBooks.length} (${downloadedBooks.join(
        ", "
      )})`
    );
    console.log(`   Remaining to download: ${remainingBooks.length}`);

    if (remainingBooks.length === 0) {
      console.log("\n🎉 All books are already downloaded!");
      return;
    }

    this.progress.totalBooks = remainingBooks.length;

    console.log(`\nStarting downloads for remaining books:`);
    console.log(remainingBooks.join(", "));
    console.log("\n" + "=".repeat(60));

    for (const book of remainingBooks) {
      await this.downloadBook(book);

      // Add delay between downloads (except for the last one)
      if (book !== remainingBooks[remainingBooks.length - 1]) {
        console.log("⏳ Waiting 2 seconds before next download...");
        await this.delay(2000);
      }
    }

    this.printSummary();
  }

  /**
   * Print final download summary
   */
  private printSummary(): void {
    console.log("\n" + "=".repeat(60));
    console.log("📊 DOWNLOAD SUMMARY");
    console.log("=".repeat(60));
    console.log(`Total books processed: ${this.progress.totalBooks}`);
    console.log(
      `Successfully downloaded: ${
        this.progress.totalBooks - this.progress.failedBooks.length
      }`
    );
    console.log(`Failed downloads: ${this.progress.failedBooks.length}`);

    if (this.progress.failedBooks.length > 0) {
      console.log(`\n❌ Failed books:`);
      this.progress.failedBooks.forEach((book) => console.log(`   - ${book}`));
      console.log(`\nTo retry failed downloads, run:`);
      this.progress.failedBooks.forEach((book) =>
        console.log(`   npm start ${book}`)
      );
    } else {
      console.log("\n🎉 All books downloaded successfully!");
    }
  }

  /**
   * Download specific books (useful for retrying failed downloads)
   */
  async downloadSpecificBooks(bookNames: string[]): Promise<void> {
    const allBooks = this.getAllBooks();
    const validBooks = bookNames.filter((book) => allBooks.includes(book));
    const invalidBooks = bookNames.filter((book) => !allBooks.includes(book));

    if (invalidBooks.length > 0) {
      console.log(`⚠️  Invalid book names: ${invalidBooks.join(", ")}`);
      console.log(`Valid book names: ${allBooks.join(", ")}`);
    }

    if (validBooks.length === 0) {
      console.log("❌ No valid books to download");
      return;
    }

    this.progress.totalBooks = validBooks.length;

    console.log(`\n📖 Downloading ${validBooks.length} specific books:`);
    console.log(validBooks.join(", "));
    console.log("\n" + "=".repeat(60));

    for (const book of validBooks) {
      await this.downloadBook(book);

      // Add delay between downloads (except for the last one)
      if (book !== validBooks[validBooks.length - 1]) {
        console.log("⏳ Waiting 2 seconds before next download...");
        await this.delay(2000);
      }
    }

    this.printSummary();
  }
}

// Main execution
async function main(): Promise<void> {
  const downloader = new BibleDownloader();

  // Get command line arguments
  const [, , ...bookArgs] = process.argv;

  try {
    if (bookArgs.length > 0) {
      // Download specific books if provided as arguments
      await downloader.downloadSpecificBooks(bookArgs);
    } else {
      // Download all remaining books
      await downloader.downloadAllRemaining();
    }
  } catch (error) {
    console.error(
      "❌ Download failed:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

// Only run main if this file is executed directly
if (require.main === module) {
  main();
}

export { BibleDownloader };

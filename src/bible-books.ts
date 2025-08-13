interface BookInfo {
  name: string;
  chapters: number;
}

interface Testament {
  name: string;
  books: BookInfo[];
}

export const OLD_TESTAMENT: Testament = {
  name: "Old Testament",
  books: [
    { name: "genesis", chapters: 50 },
    { name: "exodus", chapters: 40 },
    { name: "leviticus", chapters: 27 },
    { name: "numbers", chapters: 36 },
    { name: "deuteronomy", chapters: 34 },
    { name: "joshua", chapters: 24 },
    { name: "judges", chapters: 21 },
    { name: "ruth", chapters: 4 },
    { name: "1-samuel", chapters: 31 },
    { name: "2-samuel", chapters: 24 },
    { name: "1-kings", chapters: 22 },
    { name: "2-kings", chapters: 25 },
    { name: "1-chronicles", chapters: 29 },
    { name: "2-chronicles", chapters: 36 },
    { name: "ezra", chapters: 10 },
    { name: "nehemiah", chapters: 13 },
    { name: "esther", chapters: 10 },
    { name: "job", chapters: 42 },
    { name: "psalm", chapters: 150 },
    { name: "proverbs", chapters: 31 },
    { name: "ecclesiastes", chapters: 12 },
    { name: "song-of-solomon", chapters: 8 },
    { name: "isaiah", chapters: 66 },
    { name: "jeremiah", chapters: 52 },
    { name: "lamentations", chapters: 5 },
    { name: "ezekiel", chapters: 48 },
    { name: "daniel", chapters: 12 },
    { name: "hosea", chapters: 14 },
    { name: "joel", chapters: 3 },
    { name: "amos", chapters: 9 },
    { name: "obadiah", chapters: 1 },
    { name: "jonah", chapters: 4 },
    { name: "micah", chapters: 7 },
    { name: "nahum", chapters: 3 },
    { name: "habakkuk", chapters: 3 },
    { name: "zephaniah", chapters: 3 },
    { name: "haggai", chapters: 2 },
    { name: "zechariah", chapters: 14 },
    { name: "malachi", chapters: 4 },
  ],
};

export const NEW_TESTAMENT: Testament = {
  name: "New Testament",
  books: [
    { name: "matthew", chapters: 28 },
    { name: "mark", chapters: 16 },
    { name: "luke", chapters: 24 },
    { name: "john", chapters: 21 },
    { name: "acts", chapters: 28 },
    { name: "romans", chapters: 16 },
    { name: "1-corinthians", chapters: 16 },
    { name: "2-corinthians", chapters: 13 },
    { name: "galatians", chapters: 6 },
    { name: "ephesians", chapters: 6 },
    { name: "philippians", chapters: 4 },
    { name: "colossians", chapters: 4 },
    { name: "1-thessalonians", chapters: 5 },
    { name: "2-thessalonians", chapters: 3 },
    { name: "1-timothy", chapters: 6 },
    { name: "2-timothy", chapters: 4 },
    { name: "titus", chapters: 3 },
    { name: "philemon", chapters: 1 },
    { name: "hebrews", chapters: 13 },
    { name: "james", chapters: 5 },
    { name: "1-peter", chapters: 5 },
    { name: "2-peter", chapters: 3 },
    { name: "1-john", chapters: 5 },
    { name: "2-john", chapters: 1 },
    { name: "3-john", chapters: 1 },
    { name: "jude", chapters: 1 },
    { name: "revelation", chapters: 22 },
  ],
};

// Create a map of all books for easy lookup
export const BOOK_CHAPTERS: Record<string, number> = {
  ...OLD_TESTAMENT.books.reduce(
    (acc, book) => ({ ...acc, [book.name]: book.chapters }),
    {}
  ),
  ...NEW_TESTAMENT.books.reduce(
    (acc, book) => ({ ...acc, [book.name]: book.chapters }),
    {}
  ),
};

// Helper function to get book info
export function getBookInfo(bookName: string): BookInfo | undefined {
  const normalizedName = bookName.toLowerCase().replace(/\s+/g, "-");
  const chapters = BOOK_CHAPTERS[normalizedName];
  return chapters ? { name: normalizedName, chapters } : undefined;
}

import * as SQLite from 'expo-sqlite';

export const db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync("words.db");

async function databaseExecAsync(query: string) {
    try {
        await db.execAsync(query);

    } catch (error) {
        throw new Error(error);
    }
}

async function databaseGetAllAsync(query: string, params: string[]): Promise<unknown[]> {
    try {
        return await db.getAllAsync(query, params);

    } catch (error) {
        throw new Error("Statement failed to execute!");
    }
}

async function databaseGetFirstAsync(query: string, params: string[]): Promise<unknown> {
    try {
        return await db.getFirstAsync(query, params);

    } catch (error) {
        throw new Error("Statement failed to execute!");
    }
}

// Get the bookID of a book already in the table.
async function getBookID (title: string): Promise<number> {
    try {
        const id: number = 
            await databaseGetFirstAsync(`SELECT id FROM books WHERE title = ?`, [title]) as number;
        return id;
    } catch (error) {
        throw new Error("Could not get BookID!");
    }
}


// Create database and tables
export const createDatabase = () => {
    databaseExecAsync
    (
        `CREATE TABLE IF NOT EXISTS books 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title VARCHAR(50) NOT NULL,
                author VARCHAR (50),
                timeAdded DATETIME
            );
        CREATE TABLE IF NOT EXISTS words
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                word VARCHAR(20) NOT NULL,
                bookID INTEGER,
                timeAdded DATETIME,
                definitions TEXT(5000),
                FOREIGN KEY (bookID) REFERENCES books(id)
                
            )`
    );
}

// Add a new word to the table - requires bookID from database.
export const addWordToTable = (bookID: number, word: string, definitions: string) => {
    databaseExecAsync
    (
        `INSERT INTO words 
            (
                word,
                bookID,
                timeAdded,
                definitions
            ) 
        VALUES 
            (
                "${word}", 
                ${bookID}, 
                DATE(), 
                ${definitions}
            )`
    );
}

// Add a new book to the table.
export const addBookToTable = (title: string, author: string) => {
    databaseExecAsync
    (
        `INSERT INTO books 
            (
                title,
                author,
                timeAdded
            ) 
        VALUES 
            (
                "${title}", 
                "${author}",
                DATE()
            )`
    );
}


// Get the words given the book title.
export const getBooksWords = async (title: string): Promise<WordRecord[]>  => {
    try {
        const bookID: string = (await getBookID(title)).toString();
        return await databaseGetAllAsync(`SELECT * FROM words WHERE bookID = ?`, [bookID]) as WordRecord[];

    } catch (error) {
        throw new Error ("Could not retrieve words for book!");
    }
}

import * as SQLite from "expo-sqlite";
import { Definition } from "./dictionary";
import { Word } from "../util/Word";

export const db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync("words.db");

async function databaseExecAsync(query: string, params?: string[]) {
    try {
        await db.runAsync(query, params);
    } catch (error) {
        throw new Error(error);
    }
}

async function databaseGetAllAsync(
    query: string,
    params: string[]
): Promise<unknown[]> {
    try {
        return await db.getAllAsync(query, params);
    } catch (error) {
        throw new Error("Statement failed to execute:" + error);
    }
}

async function databaseGetFirstAsync(
    query: string,
    params: string[]
): Promise<unknown> {
    try {
        return await db.getFirstAsync(query, params);
    } catch (error) {
        throw new Error("Statement failed to execute!" + error);
    }
}

// Create database and tables
export const createDatabase = () => {
    databaseExecAsync(
        `CREATE TABLE IF NOT EXISTS words
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                word VARCHAR(20) NOT NULL,
                book VARCHAR(100),
                definition TEXT(500),
                timeAdded DATETIME
            );`
    );
};

// Add a new word to the database.
export const addWordToDatabase = (
    word: string,
    book: string,
    definition: Definition
) => {
    const toAdd = JSON.stringify(definition).replace(/'/g, "''");
    databaseExecAsync(
        `INSERT INTO words 
            (
                word,
                book,
                definition, 
                timeAdded
            ) 
        VALUES 
            (
                '${word}', 
                '${book}', 
                '${toAdd}',
                DATETIME()
            );`
    );
};

// Remove a word from the database (by definition).
export const removeWordFromDatabase = (
    word: string,
    definition: Definition
) => {
    const toRemove = JSON.stringify(definition).replace(/'/g, "''");
    databaseExecAsync(
        `DELETE FROM words
            WHERE word='${word}' AND definition='${toRemove}'`
    );
};

// Get all words in the database.
export const getAllWords = async (): Promise<Word[]> => {
    return databaseGetAllAsync(`SELECT * FROM words ORDER BY timeAdded DESC;`, []) as Promise<Word[]>;
};

// Get a random word from the database.
export const getRandomWord = async (): Promise<Word> => {
    return databaseGetFirstAsync(
        `SELECT * FROM words ORDER BY RANDOM() LIMIT 1;`,
        []
    ) as Promise<Word>;
};

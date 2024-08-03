import * as SQLite from 'expo-sqlite';
import { Definition } from './dictionary';
import { WordCount, Word } from '../util/Word';

export const db: SQLite.SQLiteDatabase = SQLite.openDatabaseSync("words.db");

async function databaseExecAsync(query: string, params?: string[]) {
    try {
        await db.runAsync(query, params);
    } catch (error) {
        throw new Error(error);
    }
}

async function databaseGetAllAsync(query: string, params: string[]): Promise<unknown[]> {
    try {
        return await db.getAllAsync(query, params);
    } catch (error) {
        throw new Error("Statement failed to execute:" + error);
    }
}

async function databaseGetFirstAsync(query: string, params: string[]): Promise<unknown> {
    try {
        return await db.getFirstAsync(query, params);
    } catch (error) {
        throw new Error("Statement failed to execute!" + error);
    }
}


// Create database and tables
export const createDatabase = () => {
    databaseExecAsync
    (
        `CREATE TABLE IF NOT EXISTS words
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                word VARCHAR(20) NOT NULL,
                book VARCHAR(100),
                definition TEXT(500),
                timeAdded DATETIME
            );`
    );
}

// Add a new word to the database.
export const addWordToDatabase = (word: string, book: string, definition: Definition) => {
    const toAdd = JSON.stringify(definition).replace(/'/g, "''");
    console.log(toAdd);
    databaseExecAsync
    (
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
}

// Remove a word from the database (by definition).
export const removeWordFromDatabase = (word: string, definition: Definition) => {
    databaseExecAsync
    (
        `DELETE FROM words
            WHERE word='${word}' AND definition='${JSON.stringify(definition)}'`
    );
}

// Check if a word is in the database (by definition).
export const checkWordInDatabase = async (word: string, definition: Definition): Promise<boolean> => {

    const count = 
    await databaseGetFirstAsync
    (
        `SELECT COUNT(*) FROM words WHERE word=? AND definition=?`,
        [word, JSON.stringify(definition)]
    ) as WordCount;
    // We know it exists if our count is bigger than 0.
    return (count['COUNT(*)'] > 0);
}

// Get all words in the database.
export const getAllWords = async (): Promise<Word[]> => {
    return databaseGetAllAsync(`SELECT * FROM words;`, []) as Promise<Word[]>;
}
import * as SQLite from 'expo-sqlite';
import { Definition } from './dictionary';
import { Count, Word } from '../util/Word';

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
                '${JSON.stringify(definition)}',
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
    const exists: Count = 
        JSON.parse(
            await databaseGetFirstAsync
            (
            `SELECT COUNT(*) FROM words WHERE word=? AND definition=?`,
            [word, JSON.stringify(definition)]
            ) as string
        )
    
    // We know it exists if our count is bigger than 0.
    return (exists.count > 0);
}

// Get all words in the database.
export const getAllWords = async (): Promise<Word[]> => {
    return databaseGetAllAsync(`SELECT * FROM words;`, []) as Promise<Word[]>;
}
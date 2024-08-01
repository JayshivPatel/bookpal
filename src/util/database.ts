import * as SQLite from 'expo-sqlite';
import { Definition } from './dictionary';
import { Word } from './Word';

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
                "${word}", 
                "${book}", 
                "${JSON.stringify(definition)}",
                DATETIME()
            );`
    );
}

// Get all words in the database.
export const getAllWords = async (): Promise<Word[]> => {
    return databaseGetAllAsync(`SELECT * FROM words;`, []) as Promise<Word[]>;
}
import * as SQLite from 'expo-sqlite';
import { isValidElement } from 'react';

const fut_db: Promise<SQLite.SQLiteDatabase> = SQLite.openDatabaseAsync('words.db')

// Create database and tables
export const createDatabase = () => {
    fut_db
        .then((db: SQLite.SQLiteDatabase) => {
            db.execAsync(
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
                )
        })
        .catch((error) => {throw new Error("Could not open database!");})
}

// Add a new word to the table - requires bookID from database.
export const addWordToTable = (bookID: number, word: string, definitions: string) => {
    fut_db
        .then((db: SQLite.SQLiteDatabase) => {
            db.execAsync(
                `INSERT INTO words 
                    (
                        word,
                        bookID,
                        timeAdded,
                        definitions
                    ) 
                VALUES 
                    (
                        ${word}, 
                        ${bookID}, 
                        DATE(), 
                        ${definitions}`
                )
            })
        .catch((error) => {throw new Error("Could not open database!");})
}

// Add a new book to the table.
export const addBookToTable = (title: string, author: string) => {
    fut_db
        .then((db: SQLite.SQLiteDatabase) => {
            db.execAsync(
                `INSERT INTO books 
                    (
                        title,
                        author,
                        timeAdded
                    ) 
                VALUES 
                    (
                        ${title}, 
                        ${author},
                        DATE()`
                )
            })
        .catch((error) => {throw new Error("Could not open database!");})
}

// Get the bookID of a book already in the table.
export const getBookID = (title: string) => {
    fut_db
        .then((db: SQLite.SQLiteDatabase) => {
            const fut_ids: Promise<number[]> = 
                db.getAllAsync(`SELECT id FROM books WHERE title = ${title}`)
                fut_ids
                    .then((ids: number[]) => {
                        switch (ids.length) {
                            case (0) : { throw new Error("Book not found!") }
                            case (1) : { throw new Error("BookID's are not unique!") }
                            default  : { return ids[0] }
                        }
                    })
                    .catch((error) => { throw new Error("Could not get BookIDs") } )
                })
        .catch((error) => {throw new Error("Could not open database!");})
}
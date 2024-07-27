import * as SQLite from 'expo-sqlite';

const fut_db: Promise<SQLite.SQLiteDatabase> = SQLite.openDatabaseAsync('words.db')

// Create Table
export const createTable = () => {
    fut_db
        .then((db: SQLite.SQLiteDatabase) => {
            db.execAsync(
                `CREATE TABLE IF NOT EXISTS books 
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title VARCHAR(50) NOT NULL,
                        author VARCHAR (50)
                    );
                CREATE TABLE IF NOT EXISTS words
                    (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        word VARCHAR(20) NOT NULL,
                        bookID INTEGER,
                        timeAdded DATETIME,
                        definitions TEXT(5000),
                        FOREIGN KEY (bookID) REFERENCES books(id)
                        
                    )
                `)
        })
        .catch((error) => {throw new Error("Could not open database");})
}
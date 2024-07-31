type WordRecord = {
    wordID: number,
    word: string,
    bookID: number,
    timeAdded: Date,
    definitions: string[]
}

type BookRecord = {
    bookID: number,
    title: string,
    author: string
}
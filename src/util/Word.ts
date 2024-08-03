export type Word = {
    id: number,
    word: string,
    book: string,
    definition: string,
    timeAdded: Date,
}

export type WordCount = {
    "COUNT(*)": number
}
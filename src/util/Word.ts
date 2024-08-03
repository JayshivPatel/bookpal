import { Definition } from "../api/dictionary"

export type Word = {
    id: number,
    word: string,
    book: string,
    definition: string,
    timeAdded: Date,
}

export type Count = {
    count: number
}
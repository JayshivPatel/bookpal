import { Definition } from "../api/dictionary"

export type Word = {
    id: number,
    word: string,
    book: string,
    definition: Definition,
    timeAdded: Date,
}
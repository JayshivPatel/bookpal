export type Definition = {
    definition: string,
    example: string,
    synonyms: string[],
    antonyms: string[]
}

export type Meaning = {
    partOfSpeech: string,
    definitions: Definition[],
    synonyms: string[],
    antonyms: string[]
}

export type Phonetic = {
    text: string,
    audioURL: string
}

type License = {
    name: string,
    url: string
}

type SourceURL = {
    url: string
}

export type DictionaryResponse = {
    word: string,
    phonetic: string,
    phonetics: Phonetic[],
    meanings: Meaning[],
    license: License,
    sourceURLs: SourceURL[]
}

export type ErrorResponse = {
    title: string,
    message: string,
    resolution: string
}

export const fetchWordDefinitions = async (word: string, retryCount = 0): Promise<DictionaryResponse[] | ErrorResponse> => {
    const freeDictionaryAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const maxRetries = 5;

    try {
        const response: Response = await fetch(freeDictionaryAPI);
        const data: DictionaryResponse[] | ErrorResponse = await response.json();
        return data;
    } catch (error) {
        if (retryCount < maxRetries) {
            return fetchWordDefinitions(word, retryCount + 1);
        }
        throw new Error(error);
    }
}

export const isErrorResponse = (response: DictionaryResponse[] | ErrorResponse): response is ErrorResponse => {
    return (response as ErrorResponse).message !== undefined;
}
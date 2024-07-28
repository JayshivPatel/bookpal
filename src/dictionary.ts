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

async function fetchWordDefinitions(word: string): Promise<DictionaryResponse[] | ErrorResponse> {
    const freeDictionaryAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response: Response = await fetch(freeDictionaryAPI);
        const data: DictionaryResponse | ErrorResponse = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

function isErrorResponse(response: DictionaryResponse[] | ErrorResponse): response is ErrorResponse {
    return (response as ErrorResponse).message !== undefined;
}

// Return the definition of the input word.
export const getDefinition = async (word: string): Promise<DictionaryResponse[]> => {
    try {
        const response: DictionaryResponse[] | ErrorResponse = await fetchWordDefinitions(word);
        if (isErrorResponse(response)) {
            throw new Error("Call to API failed!")
        } else {
            return response as DictionaryResponse[];
        }
    } catch (error) {
        throw new Error(error);
    }
}
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

function isErrorResponse(response: DictionaryResponse[] | ErrorResponse): response is ErrorResponse {
    return (response as ErrorResponse).message !== undefined;
}

// Extract text from a response from the API
export const extractText = (response: DictionaryResponse[] | ErrorResponse): string => {
    if (isErrorResponse(response)) {
        return `${response.title}\n${response.resolution}`;
    } else {
        var stringBuilder: string = "";
        for (const dictResponse of response) {
            for (const meaning of dictResponse.meanings) {
                stringBuilder += `Part of speech: ${meaning.partOfSpeech} \n`;
                var count = 1;
                for (const definition of meaning.definitions) {
                    stringBuilder += `Definition (${count}): ${definition.definition}\n`;
                    if (definition.example !== undefined) {
                        stringBuilder += `Example: ${definition.example}\n`;
                    }
                    count += 1;
                }
                stringBuilder += "\n";
            }
            stringBuilder += "\n"
        }
    return stringBuilder;
    }
}

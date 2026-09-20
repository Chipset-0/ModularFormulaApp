import type { Calculation } from "./data/Calculation";
import {data} from './data/testData'

interface SearchTerms {
    title: string,
    tags: string[],
    currentElementsToIgnore: Calculation[]
}

export function Search (searchTerms : SearchTerms) : Calculation[] {
    
    return data.filter(calculation => {
        if (!searchTerms.currentElementsToIgnore.includes(calculation) &&
            calculation.title.toLowerCase().includes(searchTerms.title.toLowerCase()) && 
            searchTerms.tags.every(tag => calculation.tags.includes(tag))
        ) {
            return calculation
        }
    });
}
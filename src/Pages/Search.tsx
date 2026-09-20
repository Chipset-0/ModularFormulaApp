import { useEffect, useState } from "react"
import type { Calculation } from "../data/Calculation"
import { Search as SearchCalculations} from "../search"
import { BlockMath } from "react-katex";

const DEBOUNCE_DELAY_MS = 300 

export function Search() {

    const [searchResults, setSearchResults] = useState<Calculation[]>([])
    const [titleQuery, setTitleQuery] = useState<string>("")


    useEffect(() => {
        if (titleQuery.trim().length == 0) {
            setSearchResults([])
            return
        }

        let cancelled = false;

        const timeOut = setTimeout(() => {
            const results = SearchCalculations({
                title: titleQuery,
                tags: [],
                currentElementsToIgnore: []
            })

            if (!cancelled) {
                setSearchResults(results);
            }
        }, DEBOUNCE_DELAY_MS);

        return () => {
            cancelled = true
            clearTimeout(timeOut)
        }
    }, [titleQuery])
    return (
        <div className="flex flex-col grow m-4">
            <div>
                <label className="mr-3" htmlFor="titleQuery">Search By Title</label>
                <input
                    type="text"
                    name="titleQuery"
                    placeholder="Search by Title"
                    value={titleQuery}
                    onChange={(e) => setTitleQuery(e.target.value)}
                />
            </div>

            <div className="flex flex-col border mt-4 grow overflow-y-scroll">
                    {searchResults.map((calculation) => (
                        <div className="w-full flex items-center px-8">
                            <p className="text-lg grow">{calculation.title}</p>
                            <div className="text-sm">
                                <BlockMath key={calculation.id} math={calculation.latex} />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
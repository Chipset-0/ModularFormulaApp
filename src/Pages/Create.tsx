import { useContext, useEffect, useState } from "react"
import { type Calculation, type Group } from "../data/Calculation"
import { Search } from "../search"
import { GroupContext } from "../context/GroupContext"

const DEBOUNCE_DELAY_MS = 300 

export function Create () {

    const {groups, setGroups} = useContext(GroupContext)


    const [groupName, setGroupName] = useState<string>("")
    const [titleQuery, setTitleQuery] = useState<string>("")
    const [calculations, setCalculations] = useState<Calculation[]>([])
    const [searchResults, setSearchResults] = useState<Calculation[]>([])

    const addToSelected = (calc: Calculation) => {
        if (calculations.includes(calc)) return
        setCalculations((prev) => [...prev, calc])
    }

    const removeFromSelected = (calc: Calculation) => {
        setCalculations((prev) => prev.filter((c) => c.id != calc.id))
    }

    const createGroup = () => {
        console.log(groupName)
        if (groupName == "") {
            window.alert("Title cannot be empty")
            console.log("Empty Title")
            return
        } 
        if (!!groups.find((g) => g.name === groupName)) {
            window.alert("Title has already been used")
            console.log("Duplicate Title")
            return
        }
        if (calculations.length <= 0) {
            window.alert("At least one formula must be selected")
            console.log("Not enough formulas")
            return
        }


        const group : Group = {
            name: groupName,
            calculations: calculations
        }

        setGroups([...groups, group])
        window.alert("Group successfully created")
        
    }

    useEffect(() => {
        if (titleQuery.trim().length == 0) {
            setSearchResults([])
            return
        }

        let cancelled = false;

        const timeOut = setTimeout(() => {
            const results = Search({
                title: titleQuery,
                tags: [],
                currentElementsToIgnore: calculations
            })

            if (!cancelled) {
                setSearchResults(results);
            }
        }, DEBOUNCE_DELAY_MS);

        return () => {
            cancelled = true
            clearTimeout(timeOut)
        }
    }, [titleQuery, calculations])

    return (
        <div className="flex flex-col gap-4">
            <br />
            <h2 className="text-4xl font-bold">Create Group</h2>

            <section className="mx-4">
                <div>
                    <label className="mr-3">Title</label>
                    <input type="text" name="title" placeholder="name" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>

                </div>
                <h3 className="text-2xl">Selected Formulas</h3>
                <div className="w-full h-50 border border-gray-500 overflow-y-auto grid grid-cols-5">
                    {calculations.map((calculation) => (
                        <div key={calculation.id} onClick={() => removeFromSelected(calculation)}
                            className="overflow-x-hidden group h-fit gap-4 rounded p-2"
                        >
                            <span className="inline-block bg-transparent transition-colors group-hover:bg-red-400 px-2 rounded">{calculation.title}</span>
                            <span className="opacity-0 transition-opacity group-hover:opacity-100 ml-4">-</span>
                        </div>
                    ))}
                </div>
            </section>  

            <section className="mx-4">
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

                <h3>Search Results</h3>
                <div className="w-full h-50 border border-gray-500 overflow-y-auto grid grid-cols-5">
                    {searchResults.map((calculation) => (
                        <div key={calculation.id} onClick={() => addToSelected(calculation)}
                            className="overflow-x-hidden group h-fit gap-4 rounded p-2"
                        >
                            <span className="inline-block bg-transparent transition-colors group-hover:bg-green-400 px-2 rounded">{calculation.title}</span>
                            <span className="opacity-0 transition-opacity group-hover:opacity-100 ml-4">-</span>
                        </div>
                    ))}
                </div>
            </section>
            <section className="grid place-items-center">
                <button type="submit" onClick={createGroup} className="w-fit p-2 border border-gray-500 rounded bg-gray-400
                hover:bg-gray-500 transition-colors text-black hover:text-gray-200">Create</button>
            </section>
        </div>
    )
}
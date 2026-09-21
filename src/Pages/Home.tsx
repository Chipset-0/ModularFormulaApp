import { useContext, useState } from "react"
import { GroupContext } from "../context/GroupContext"
import type { Group } from "../data/Calculation"
import "katex/dist/katex.min.css";
import { CalculationElement } from "../components/CalculationElement";

export function Home() {
    const {groups} = useContext(GroupContext)

    const [activeGroup, setActiveGroup] = useState<Group | null>()

    return (
        <div className="flex relative grow">
            <div className="relative flex flex-col px-3 gap-1 min-w-[20vw]  border-r border-r-gray-600 pt-2 overflow-y-auto">
                {
                    groups.map(
                        (group) => {
                            return (
                                <div onClick={() => setActiveGroup(group)}
                                className="border-gray-600 border-solid border rounded p-3 truncate"
                                >{group.name}</div>
                            )
                        })
                }
            </div>
            <div className="flex flex-col relative overflow-y-auto p-3 grow">
                {!activeGroup ? 
                    <p>Group Not Selected</p>
                :
                    <>
                        {activeGroup.calculations.map((calculation) => {
                            return (
                                <CalculationElement calculation={calculation}/>
                            )
                        })}
                    </>
                }
            </div>
        </div>
    )
}
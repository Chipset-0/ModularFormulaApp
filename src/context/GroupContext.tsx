import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Group } from "../data/Calculation"
import { getGroupsLocal, setGroupsLocal } from "../data/storageProvider";

type GroupContextType = {
    groups: Group[],
    setGroups: (g: Group[]) => void;
}

export const GroupContext = createContext<GroupContextType>({
    groups: [], setGroups: () => {}
})

export function GroupProvider({ children }: {children: ReactNode}) {
    const [groups, setGroups] = useState<Group[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setGroups(getGroupsLocal())
        setLoading(false)
    }, [])

    useEffect(() => {
        if (loading) return
        setGroupsLocal(groups)
    }, [groups, loading])

    return (
        <GroupContext.Provider value={{groups: groups, setGroups: setGroups}}>
            {children}
        </GroupContext.Provider>
    )
}
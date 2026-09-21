import dotenv from 'dotenv'
import type { Group } from "./Calculation";

dotenv.config()

const STORAGE_KEY = "calculator_groups"


export function getGroupsLocal(): Group[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return []

        return JSON.parse(raw)
    } catch {
        return []
    }
}

export function setGroupsLocal(groups: Group[]): void {
    try {
        console.log("set localstorage")
        localStorage.setItem(STORAGE_KEY, JSON.stringify(groups))
    } catch {
        //Storage full/unavailable
    }
}
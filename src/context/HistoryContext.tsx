import type { MathScope } from "mathjs"
import { createContext, useState, type ReactNode } from "react"


interface HistoryEntry {
            title: string,
            variables: MathScope
            result: number
    }

interface HistoryContextType {

    history: HistoryEntry[],

    setHistory: (h: HistoryEntry[]) => void

    appendHistory: (h: HistoryEntry) => void
}

export const HistoryContext = createContext<HistoryContextType>({
    history: [],
    setHistory: () => {},
    appendHistory: () => {}
})

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const appendHistory = (h: HistoryEntry) => {
    setHistory((prev) => [...prev, h])
  }

  return (
    <HistoryContext.Provider value={{ history, setHistory, appendHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}
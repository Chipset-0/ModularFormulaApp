import { useContext } from "react"
import { HistoryContext } from "../context/HistoryContext"

const GRID_COLS_SETUP = "grid grid-cols-[250px_1fr_160px]"

export function History () {

    const {history} = useContext(HistoryContext)

    return (
        <div>
            <div className={GRID_COLS_SETUP}>
                <h1>Title</h1>
                <h1>Variables</h1>
                <h1>Result</h1>
            </div>
            {history.map((entry) => {
                return (
                    <div className={GRID_COLS_SETUP}>
                        <p  className="overflow-x-scroll">{entry.title}</p>
                        <div className="overflow-x-scroll">
                            {Object.entries(entry.variables)
                                .map(([symbol, value]) => `${symbol}=${value}`)
                                .join(", ")
                            }{" "}
                        </div>
                        <p  className="overflow-x-scroll">{entry.result}</p>
                    </div>
                )
            })}
        </div>
    )
}
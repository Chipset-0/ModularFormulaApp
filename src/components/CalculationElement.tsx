import { useContext, useState } from "react";
import type { Calculation } from "../data/Calculation";
import { BlockMath } from "react-katex";
import {evaluate, type MathScope} from "mathjs"
import { HistoryContext } from "../context/HistoryContext";

export function CalculationElement({calculation}: {calculation: Calculation}) {
    const {appendHistory} = useContext(HistoryContext)
    
    const [values, setValues] = useState<MathScope>(
        Object.fromEntries(
            calculation.variables.map((variable) => [
            variable.symbol,
            variable.minimum_value !== null ? variable.minimum_value : 0,
            ])
        )

    )

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(calculation.formula_code, values)
        const result = evaluate(calculation.formula_code, values)
        
        console.log("Hello World")
        appendHistory({ title: calculation.title, 
                        variables: values,
                        result: result
        })


        window.alert(result.toString())

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const {name, value} = e.target
        setValues((prev) => ({...prev, [name]: value}))
    }

    return (
        <div className="align-center border border-gray-300 rounded h-37.5 grid grid-cols-[1fr_1fr_120px] grid-rows-[40px_1fr] p-2">
            <h3 className="col-start-1 col-end-1 row-start-1 row-end-1">{calculation.title}</h3>
            <div className="col-start-1 col-end-1 row-start-2 row-end-3 grid place-items-center">
                <BlockMath key={calculation.id} math={calculation.latex} />
            </div>
            <div className="col-start-2 col-end-4 row-start-1 row-end-3 min-h-0">
                <form onSubmit={handleSubmit} className="flex w-full h-full gap-4">
                    <div className="flex flex-col w-full gap-3 grow">
                        {calculation.variables.map((variable) => (
                            <div key={variable.symbol} 
                            className="w-full gap-2 grid grid-cols-[40px_1fr]">

                                <label className="overflow-hidden" htmlFor={variable.symbol}>
                                    {variable.symbol}
                                </label>
                                <input 
                                    type="number" 
                                    className="w-full"
                                    id={variable.symbol}
                                    name={variable.symbol}
                                    max={variable.maximum_value !== null ? variable.maximum_value : ""}
                                    min={variable.minimum_value !== null ? variable.minimum_value : ""}
                                    step="any"
                                    placeholder={Math.max(0, variable.minimum_value ?? 0).toString()}
                                    onChange={handleChange}>
                                </input>
                            </div>
                        ))}
                    </div>
                    <div className="w-50 h-full grid place-items-center">
                        
                        <button 
                            className="border border-gray-500 rounded p-2 bg-blue-100"
                        type="submit">Calculate</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
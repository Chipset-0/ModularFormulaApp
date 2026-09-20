
export interface Variable {
    symbol : string,
    description : string,
    minimum_value : number | null,
    maximum_value : number | null
}


export interface Calculation {
    id : number,
    title : string,
    latex : string,
    formula_code : string,
    variables : Variable[],
    tags : string[]
}

export interface Group {
    name: string,
    calculations : Calculation[]
}
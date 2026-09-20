import type { Calculation, Group } from "./Calculation";

 
export const data: Calculation[] = [
  {
    id: 1,
    title: "Ohm's Law",
    latex: "V = I \\cdot R",
    formula_code: "I * R",
    variables: [
      {
        symbol: "I",
        description: "Current through the conductor (amperes)",
        minimum_value: 0,
        maximum_value: null,
      },
      {
        symbol: "R",
        description: "Resistance of the conductor (ohms)",
        minimum_value: 0,
        maximum_value: null,
      },
    ],
    tags: ["Electrical", "Fundamentals"],
  },
  {
    id: 2,
    title: "Kinetic Energy",
    latex: "E_k = \\frac{1}{2} m v^{2}",
    formula_code: "0.5 * m * v^2",
    variables: [
      {
        symbol: "m",
        description: "Mass of the body (kilograms)",
        minimum_value: 0,
        maximum_value: null,
      },
      {
        symbol: "v",
        description: "Velocity of the body (metres per second)",
        minimum_value: null,
        maximum_value: 299792458,
      },
    ],
    tags: ["Mechanics", "Fundamentals"],
  },
  {
    id: 3,
    title: "Beam Midspan Deflection",
    latex: "\\delta = \\frac{P L^{3}}{48 E I}",
    formula_code: "(P * L^3) / (48 * E * I)",
    variables: [
      {
        symbol: "P",
        description: "Point load applied at midspan (newtons)",
        minimum_value: 0,
        maximum_value: null,
      },
      {
        symbol: "L",
        description: "Span length between supports (metres)",
        minimum_value: 0.001,
        maximum_value: null,
      },
      {
        symbol: "E",
        description: "Young's modulus of the beam material (pascals)",
        minimum_value: 1,
        maximum_value: null,
      },
      {
        symbol: "I",
        description: "Second moment of area of the cross-section (m^4)",
        minimum_value: 0.000001,
        maximum_value: null,
      },
    ],
    tags: ["Structural", "Mechanics"],
  },
  {
    id: 4,
    title: "Reynolds Number",
    latex: "Re = \\frac{\\rho v D}{\\mu}",
    formula_code: "(rho * v * D) / mu",
    variables: [
      {
        symbol: "rho",
        description: "Fluid density (kilograms per cubic metre)",
        minimum_value: 0.0001,
        maximum_value: null,
      },
      {
        symbol: "v",
        description: "Mean flow velocity (metres per second)",
        minimum_value: 0,
        maximum_value: null,
      },
      {
        symbol: "D",
        description: "Hydraulic diameter of the pipe (metres)",
        minimum_value: 0.0001,
        maximum_value: null,
      },
      {
        symbol: "mu",
        description: "Dynamic viscosity of the fluid (pascal seconds)",
        minimum_value: 0.000001,
        maximum_value: null,
      },
    ],
    tags: ["Fluids", "Dimensionless"],
  },
  {
    id: 5,
    title: "Ideal Gas Law",
    latex: "P = \\frac{n R T}{V}",
    formula_code: "(n * 8.314462618 * T) / V",
    variables: [
      {
        symbol: "n",
        description: "Amount of substance (moles)",
        minimum_value: 0,
        maximum_value: null,
      },
      {
        symbol: "T",
        description: "Absolute temperature (kelvin)",
        minimum_value: 0,
        maximum_value: null,
      },
      {
        symbol: "V",
        description: "Volume occupied by the gas (cubic metres)",
        minimum_value: 0.000001,
        maximum_value: null,
      },
    ],
    tags: ["Thermodynamics", "Fundamentals"],
  },
  {
    id: 6,
    title: "Compound Interest",
    latex: "A = P \\left(1 + \\frac{r}{n}\\right)^{n t}",
    formula_code: "P * (1 + r / n)^(n * t)",
    variables: [
      {
        symbol: "P",
        description: "Principal amount invested or borrowed",
        minimum_value: 0,
        maximum_value: null,
      },
      {
        symbol: "r",
        description: "Annual nominal interest rate as a decimal",
        minimum_value: 0,
        maximum_value: 1,
      },
      {
        symbol: "n",
        description: "Compounding periods per year",
        minimum_value: 1,
        maximum_value: 365,
      },
      {
        symbol: "t",
        description: "Time the money is invested for (years)",
        minimum_value: 0,
        maximum_value: 100,
      },
    ],
    tags: ["Finance"],
  },
];
 
export const groups: Group[] = [
  {
    name: "Engineering",
    calculations: data.filter((c) => [1, 3, 4, 5].includes(c.id)),
  },
  {
    name: "Physics",
    calculations: data.filter((c) => [2, 5].includes(c.id)),
  },
  {
    name: "Finance",
    calculations: data.filter((c) => c.id === 6),
  },
];

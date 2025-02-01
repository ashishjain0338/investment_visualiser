// ToDO: You might want to add more default-TaxSlabs (Senior Citizen or so?)
export const TAX_SLABS = [
    {
        "title": "Old Tax Regime (2023)",
        "tax-slabs": [
            {limit: 2.5, rate: 0},
            {limit: 5, rate: 5},
            {limit: 10, rate: 20},
            {limit: Infinity, rate: 30}
        ]
    },{
        "title": "New Tax Regime (2024)",
        "tax-slabs": [
            {limit: 3, rate: 0},
            {limit: 7, rate: 5},
            {limit: 10, rate: 10},
            {limit: 12, rate: 15},
            {limit: 15, rate: 20},
            {limit: Infinity, rate: 30}
        ]
    },{
        "title": "New Tax Regime (2025)",
        "tax-slabs": [
            {limit: 4, rate: 0},
            {limit: 8, rate: 5},
            {limit: 12, rate: 10},
            {limit: 16, rate: 15},
            {limit: 20, rate: 20},
            {limit: 24, rate: 25},
            {limit: Infinity, rate: 30}
        ]
    }
]
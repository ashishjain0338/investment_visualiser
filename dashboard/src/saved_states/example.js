export const examples = [
    {
            "title": "Fixed-Deposit with Varying Cumulative Frequency",
            "state": [
                JSON.stringify({"className":"FD", "title":"Simple-Interest", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":0,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Monthly", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":1,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Quaterly (Banking-Norm)", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Six-MonthPeriod", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":6,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Annually", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":12,"data":[],"premature":0}),
            ]
    },
    {
        "title" : "Fixed-Deposit with Varying Interest-rate by 2% each Iteration",
        "state" : []
    },
    {
        "title" : "Fixed-Deposit with Varying Premature-Penality by 0.5% each Iteration",
        "state" : []
    },
    {
        "title" : "Fixed-Deposit with Varying Time",
        "state" : []

    },
    {
        "title" : "Raw-Data Example",
        "state" : []
    }
]
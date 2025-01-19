export const examples = [
    {
            "title": "Fixed-Deposit with Varying Cumulative Frequency",
            "state": [
                JSON.stringify({"className":"FD", "title":"Simple-Interest", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":0,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Monthly", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":1,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Quaterly (Banking-Norm)", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Six-MonthPeriod", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":6,"data":[],"premature":0}),
                JSON.stringify({"className":"FD", "title":"Compounded-Annually", "principal":100000, "rate":6.7,"period":1000,"cumulative_freq":12,"data":[],"premature":0}),
            ],
            "percentage-view": false,
            "diff-view": true
    },
    {
        "title" : "Fixed-Deposit with Varying Interest-rate by 2% each Iteration",
        "state": [
            JSON.stringify({"className":"FD", "title":"Interest@5%", "principal":100000, "rate":5,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Interest@7%", "principal":100000, "rate":7,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Interest@9%", "principal":100000, "rate":9,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Interest@11%", "principal":100000, "rate":11,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Interest@13%", "principal":100000, "rate":13,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
        ],
        "percentage-view": false,
        "diff-view": false
    },
    {
        "title" : "Fixed-Deposit with Varying Premature-Penality by 0.5% each Iteration",
        "state": [
            JSON.stringify({"className":"FD", "title":"Penality@0.5%", "principal":100000, "rate":7,"period":1000,"cumulative_freq":4,"data":[],"premature":0.5}),
            JSON.stringify({"className":"FD", "title":"Penality@1%", "principal":100000, "rate":7,"period":1000,"cumulative_freq":4,"data":[],"premature":1}),
            JSON.stringify({"className":"FD", "title":"Penality@1.5%", "principal":100000, "rate":7,"period":1000,"cumulative_freq":4,"data":[],"premature":1.5}),
            JSON.stringify({"className":"FD", "title":"Penality@2%", "principal":100000, "rate":7,"period":1000,"cumulative_freq":4,"data":[],"premature":2}),
            JSON.stringify({"className":"FD", "title":"Penality@2.5%", "principal":100000, "rate":7,"period":1000,"cumulative_freq":4,"data":[],"premature":2.5}),
        ],
        "percentage-view": false,
        "diff-view": false
    },
    {
        "title" : "Fixed-Deposit with Varying Time",
        "state": [
            JSON.stringify({"className":"FD", "title":"Time@180", "principal":100000, "rate":7,"period":180,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Time@365", "principal":100000, "rate":7,"period":365,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Time@500", "principal":100000, "rate":7,"period":500,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Time@750", "principal":100000, "rate":7,"period":750,"cumulative_freq":4,"data":[],"premature":0}),
            JSON.stringify({"className":"FD", "title":"Time@1000", "principal":100000, "rate":7,"period":1000,"cumulative_freq":4,"data":[],"premature":0}),
        ],
        "percentage-view": false,
        "diff-view": false

    },
    {
        "title" : "Various Financial-Trends (Raw-Data Example)",
        "state": [
            JSON.stringify({"className":"RawData", "title":"UpTrend", "csv" : "10, 12, 14, 16, 19, 23, 28, 34, 41, 49"}),
            JSON.stringify({"className":"RawData", "title":"Downtrend", "csv" : "60, 55, 50, 46, 41, 36, 32, 27, 23, 20"}),
            JSON.stringify({"className":"RawData", "title":"Volatile Market", "csv" : "50, 55, 48, 60, 45, 52, 40, 58, 47, 53"}),
            JSON.stringify({"className":"RawData", "title":"Mean Reversion", "csv" : "50, 55, 48, 52, 47, 53, 49, 54, 50, 51"}),
            JSON.stringify({"className":"RawData", "title":"Logarithmic Growth", "csv" : "5, 15, 27, 38, 46, 52, 57, 61, 64, 66"}),
        ],
        "percentage-view": false,
        "diff-view": false
    }
]
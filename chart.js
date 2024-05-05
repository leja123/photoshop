const histogramValues = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const updateHistogram = (histogramValues, ctx, canvas) => {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const updatedHistogram = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];

    for (let i = 0; i < data.length; i += 4) {
        for (let b = 0; b < 3; b++) {
            const colorValue = data[i + b];
            const index = Math.min(Math.floor(colorValue / 50), 4);
            updatedHistogram[b][index]++;
        }
    }

    for (let b = 0; b < 3; b++) {
        histogramValues[b] = updatedHistogram[b];
    }

    graf.data.datasets.forEach((dataset, index) => {
        dataset.data = histogramValues[index];
    });

    graf.update();
};

const graf = new Chart("rdec", {
    type: "bar",
    data: {
        labels: ["0-50", "51-100", "101-150", "151-200", "201-255"],
        datasets: [
            { label: "Red", backgroundColor: "red" },
            { label: "Green", backgroundColor: "lime" },
            { label: "Blue", backgroundColor: "blue" }
        ]
    },
    options: { legend: { display: false } }
});

const isBetween = (value, min, max) => {
    return value >= min && value < max;
}
const getBMI = (weight, height) => {
    const BMI = (weight / ((height / 100) ** 2)).toFixed(1);
    const categories = [
        { range: [0, 18.5], label: 'Underweight' },
        { range: [18.5, 25], label: 'Healthy weight' },
        { range: [25, 30], label: 'Overweight' },
        { range: [30, 35], label: 'Obesity class I' },
        { range: [35, 40], label: 'Obesity class II' },
        { range: [40, Number.MAX_SAFE_INTEGER], label: 'Obesity class III' },
    ];

    const category = categories.find((c) => isBetween(BMI, c.range[0], c.range[1]));

    return `${BMI} (${category.label})`;
};

export default getBMI;
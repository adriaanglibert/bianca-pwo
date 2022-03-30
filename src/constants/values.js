const MAX_DAY_KCAL = 700;
const MAX_ACTIVITY_MET = 70;
const AVERAGE_WEIGHT = 70;

const ACTIVITY_INTENSITY_MET = Object.freeze({
    rest: 10,
    sitting: 15,
    light: 30,
    moderate: 39,
    high: 49
});

const DAY_INTENSITY_PERCENTAGE = Object.freeze({
    minimum: 10,
    light: 30,
    medium: 60,
    strong: 80,
    heavy: 100,
})

export {
    MAX_DAY_KCAL,
    MAX_ACTIVITY_MET,
    AVERAGE_WEIGHT,
    ACTIVITY_INTENSITY_MET,
    DAY_INTENSITY_PERCENTAGE
}
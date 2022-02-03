import { ACTIVITY_INTENSITY_MET, AVERAGE_WEIGHT } from 'constants/values';

import  activities  from 'data/activities.json';
import moment from 'moment';

const timeStringToMoment = (date) => {
    return moment().hours(date.slice(0, 2)).minutes(date.slice(2, 4));
};

const metToKcal = (met) => {
    return (met * 0.35 * AVERAGE_WEIGHT) / 200;
};

export const kcalForTime = (met, obj) => {
    const diff = timeStringToMoment(obj.to).diff(timeStringToMoment(obj.from), 'minutes');
    return parseInt(metToKcal(met) * diff);
};

export const getActivityIntensity = (met) => {
    let intensity = Object.keys(ACTIVITY_INTENSITY_MET).pop();

    for (const key in ACTIVITY_INTENSITY_MET) {
        if (met < ACTIVITY_INTENSITY_MET[key]) {
            intensity = key;
            break;
        }
    }

    return intensity;
}

export const formatDate = (from, to) => {
    return `${from.slice(0, 2)}:${from.slice(2, 4)} - ${to.slice(0,2)}:${to.slice(2, 4)}`;
};

export const calculateDailyWeight = (obj, minutes = 60) => {
    const values = obj ? Object.values(obj).flat() : [];
    return values.length ? values.reduce((previous, current) => {
      return (typeof previous == 'object' ? kcalForTime(activities[previous.id]?.weight, previous) : previous) + kcalForTime(activities[current.id].weight, current);
    }, 0) : null;
}

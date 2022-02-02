import  activities  from 'data/activities.json';
import moment from 'moment';

export const formatDate = (from, to) => {
    return `${from.slice(0, 2)}:${from.slice(2, 4)} - ${to.slice(0,2)}:${to.slice(2, 4)}`;
};

// Duration in minutes!
const averageWeight = 70;

const timeStringToMoment = (date) => {
    return moment().hours(date.slice(0, 2)).minutes(date.slice(2, 4));
}
const kcalForTime = (met, obj) => {
    const diff = timeStringToMoment(obj.to).diff(timeStringToMoment(obj.from), 'minutes');
    return parseInt(metToKcal(met) * diff);
}

const metToKcal = (met) => {
   return (met * 0.35 * averageWeight) / 200;
}

export const calculateDailyWeight = (obj, minutes = 60) => {
    const values = obj ? Object.values(obj).flat() : [];
    return values.length ? values.reduce((previous, current) => {
      return (typeof previous == 'object' ? kcalForTime(activities[previous.id]?.weight, previous) : previous) + kcalForTime(activities[current.id].weight, current);
    }, 0) : null;
}

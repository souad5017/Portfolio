const year = (date) => new Date(date).getFullYear();

export const formatPeriod = (start, end) => `${year(start)} — ${end ? year(end) : 'Present'}`;
import moment from 'moment';

export const formatDate = value => (value ? moment(value).format('L') : '');

export const formatDateTime = value => (value ? moment(value).format('L LT') : '');

export const getDateRange = (start, end) => {
  const result = [];
  const mStart = moment(start);
  const mEnd = moment(end);

  while (mEnd.diff(mStart, 'days') >= 0) {
    result.push(mStart.format('YYYY-MM-DD'));
    mStart.add(1, 'days');
  }

  return result;
};

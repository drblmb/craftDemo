import * as R from 'ramda';

export const isEmpty = value => (R.isNil(value) || (R.is(String, value) && value.trim() === ''));

// Return undefined if value is valid (requirement of Redux Form)
export const required = value => (isEmpty(value) ? 'Required' : undefined);

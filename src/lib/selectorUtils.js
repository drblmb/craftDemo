import * as R from 'ramda';

export const getObject = (nodePath, dflt) =>
  R.pathOr(
    dflt,
    [
      ...R.compose(R.split('.'), R.defaultTo(''))(nodePath),
    ],
  );

export const getProp =
  nodePath => (path, dflt = null) =>
    R.pathOr(
      dflt,
      [
        ...R.compose(R.split('.'), R.defaultTo(''))(nodePath),
        ...R.compose(R.split('.'), R.defaultTo(''))(path),
      ],
    );

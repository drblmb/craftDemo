import * as R from 'ramda';
import { getObject } from 'lib/selectorUtils';

export const themeProp = R.curry((propName, props) => getObject(propName)(props.theme));

export const switchProp = R.curry((propName, valueTrue, valueFalse, props) =>
  (props[propName] ? valueTrue : valueFalse));

export const switchThemeProp = R.curry((propName, themePropTrue, themePropFalse, props) =>
  switchProp(propName, themeProp(themePropTrue, props), themeProp(themePropFalse, props), props));


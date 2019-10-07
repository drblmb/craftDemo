import * as R from 'ramda';
import {
  LOAD_FORM_SETTINGS,
  INITIAL_STATE,
} from 'constants/actionTypes';
import { getProp } from 'lib/selectorUtils';

export const nodePath = 'formSettings';
const p = getProp(nodePath);

export const initialState = {
  label: '',
  required: false,
  choices: [],
  displayAlpha: false,
  'default': '',
};

export default function formSettings(state = initialState, action = {}) {
  switch (action.type) {
    case INITIAL_STATE:
      return R.clone(initialState);
    case LOAD_FORM_SETTINGS:
      return R.mergeRight(state, action.formSettings);
    default:
      return state;
  }
}

export const getFormSettings = R.prop(nodePath);

export const getLabel = p('label');

export const getRequired = p('required');

export const getChoices = p('choices');

export const isDisplayAlpha = p('displayAlpha');

export const getDefault = p('default');

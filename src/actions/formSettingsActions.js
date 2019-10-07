import {
  LOAD_FORM_SETTINGS,
} from 'constants/actionTypes';
import minilog from 'minilog';
import { updateFormSettings } from 'api/formSettingsAPI';

const logger = minilog('FormSettings');

export const loadFormSettings = () => (dispatch) => {
  logger.debug('Loading formSettings from API');

  // Normally, I'd make an API call here to the server to get the current settings
  // Another option is to have any changed data saved to local storage, and if there
  // is something there, use that instead of the API call.
  const formSettings = {
    label: 'Sales region',
    required: false,
    choices: [
      'Asia',
      'Australia',
      'Western Europe',
      'North America',
      'Eastern Europe',
      'Latin America',
      'Middle East and Africa',
    ],
    displayAlpha: true,
    'default': 'North America',
  };

  dispatch({
    type: LOAD_FORM_SETTINGS,
    formSettings,
  });
};

export const saveFormSettings = formSettings => (dispatch) => {
  logger.debug(`Saving ${formSettings} via API`);

  updateFormSettings(formSettings);
  // Normally, I'd set a saving status in the store, await this API call,
  // then clear the saving status, so I can give feedback to the user that this
  // was saved successfully

  // Save changes to store
  dispatch({
    type: LOAD_FORM_SETTINGS,
    formSettings,
  });
};

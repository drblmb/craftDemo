import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import formSettings from './formSettingsReducer';

export default combineReducers({
  form,
  formSettings,
});

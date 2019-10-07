import { postJson } from './lib/remoteAPI';
import endpoints from './config/endpoints';

export const updateFormSettings = formSettings => {
  console.log('Posting:', JSON.stringify(formSettings, null, 2));
  return postJson(endpoints.saveFormSettings, formSettings)
    .catch(() => true);
};
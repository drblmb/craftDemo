import {
  updateFormSettings,
} from './formSettingsAPI';
import { postJson } from './lib/remoteAPI';

jest.mock('./lib/remoteAPI');

describe('formSettings API', () => {
  beforeEach(() => {
    postJson.mockReset();
  });

  describe('updateFormSettings()', () => {
    it('should call remote API', async () => {
      await updateFormSettings({ name: 'test1' });

      expect(postJson).toBeCalledWith('/v2/566061f21200008e3aabd919', { name: 'test1' });
    });
  });
});

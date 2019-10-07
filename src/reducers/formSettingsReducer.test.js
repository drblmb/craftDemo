import formSettings, {
  getChoices,
  getDefault,
  getFormSettings,
  getLabel,
  getRequired,
  initialState,
  isDisplayAlpha,
  nodePath,
} from 'reducers/formSettingsReducer';
import {
  LOAD_FORM_SETTINGS,
  INITIAL_STATE,
} from 'constants/actionTypes';
import { setProp } from 'test/utils';

const setP = setProp(nodePath);

describe('Form Settings Reducer', () => {
  it('should not change state when action is invalid', () => {
    const oldState = [{ abc: '123' }];

    expect(formSettings(oldState, { type: 'UNKNOWN' })).toEqual(oldState);
  });

  it('should not change initial state if action is not passed', () => {
    expect(formSettings()).toEqual(initialState);
  });

  it('should load formSettings data', () => {
    const testSettings = {
      label: 'Testy Label',
      required: false,
      choices: [
        'Choice1',
        'Choice2',
        'Forever Testing Choice',
      ],
      displayAlpha: false,
      'default': 'The default choice',
    };

    const action = {
      type: LOAD_FORM_SETTINGS,
      formSettings: testSettings,
    };

    expect(getFormSettings(setP(formSettings(initialState, action))))
      .toEqual(testSettings);
  });

  it('should reset to inital state when action is INITIAL_STATE', () => {
    const testSettings = {
      label: 'Testy Label',
      required: false,
      choices: [
        'Choice1',
        'Choice2',
        'Forever Testing Choice',
      ],
      displayAlpha: false,
      'default': 'The default choice',
    };

    const action = {
      type: INITIAL_STATE,
    };

    expect(getFormSettings(setP(formSettings(testSettings, action))))
      .toEqual(initialState);
  });
});

describe('Form Settings Selectors', () => {
  describe('getFormSettings', () => {
    it('Should return the formSettings node from the store', () => {
      const testSettings = setP({
        label: 'formSettings Test',
        required: true,
        choices: [
          '123',
          '456',
          'Test choice',
        ],
        displayAlpha: false,
        'default': 'A test default value',
      });

      expect(getFormSettings(testSettings)).toEqual(testSettings.formSettings);
    });
  });

  describe('getChoices', () => {
    it('Should return the choices array', () => {
      const testChoices = setP({ ...initialState, choices: ['Only one choice'] });

      expect(getChoices(testChoices)).toEqual(['Only one choice']);
    });
  });

  describe('getDefault', () => {
    it('Should return the default text', () => {
      const testDefault = setP({ ...initialState, 'default': 'This is a test of default' });

      expect(getDefault(testDefault)).toEqual('This is a test of default');
    });
  });

  describe('getLabel', () => {
    it('Should return the label text', () => {
      const testLabel = setP({ ...initialState, label: 'Test this label' });

      expect(getLabel(testLabel)).toEqual('Test this label');
    });
  });

  describe('getRequired', () => {
    it('Should return the required value', () => {
      const testRequired = setP({ ...initialState, required: true });
      const testNotRequired = setP({ ...initialState, required: false });

      expect(getRequired(testRequired)).toEqual(true);
      expect(getRequired(testNotRequired)).toEqual(false);
    });
  });

  describe('isDisplayAlpha', () => {
    it('Should return the displayAlpha value', () => {
      const testDisplayAlpha = setP({ ...initialState, displayAlpha: true });
      const testNotDisplayAlpha = setP({ ...initialState, displayAlpha: false });

      expect(isDisplayAlpha(testDisplayAlpha)).toEqual(true);
      expect(isDisplayAlpha(testNotDisplayAlpha)).toEqual(false);
    });
  });
});

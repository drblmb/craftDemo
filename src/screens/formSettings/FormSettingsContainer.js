import * as R from 'ramda';
import { connect } from 'react-redux';
import {
  reduxForm,
  SubmissionError,
  reset,
} from 'redux-form';
import { loadFormSettings, saveFormSettings } from 'actions/formSettingsActions';
import { INITIAL_STATE } from 'constants/actionTypes';
import {
  getChoices,
  getDefault,
  getLabel,
  getRequired,
  isDisplayAlpha,
} from 'reducers/formSettingsReducer';
import FormSettings from './FormSettings';

const MAX_ITEMS = 50;

const formatChoicesAsArray = formSettings => R.pipe(
  choices => choices.split('\n'),
  R.prepend(R.prop('default', formSettings)),
  R.uniq, // Remove Duplicates
  R.take(MAX_ITEMS),
);

const formName = 'formSettingsForm';

const mapStateToProps = state => ({
  initialValues: {
    label: getLabel(state),
    choices: getChoices(state).join('\n'),
    'default': getDefault(state),
    required: getRequired(state),
    displayAlpha: isDisplayAlpha(state),
  }
});

// Another idea - save changed data to local storage as the user enters it.  Clear local storage
// when the data is successfully saved to the API
const mapDispatchToProps = dispatch => ({
  loadFormSettings: () => dispatch(loadFormSettings()),
  clearForm: () => dispatch({ type: INITIAL_STATE }),
  resetForm: () => dispatch(reset(formName)),
});

const WrappedFormSettingsForm = reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  form: formName,
  onSubmit: async (formSettings, dispatch) => {
    const settings =
      R.over(R.lensProp('choices'), formatChoicesAsArray(formSettings), formSettings);

    try {
      await dispatch(saveFormSettings(settings));
      dispatch(reset(formName));
    } catch (e) {
      throw new SubmissionError({
        _error: e.message,
      });
    }
  },
})(FormSettings);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFormSettingsForm);

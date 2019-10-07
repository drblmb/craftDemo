import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { required } from 'lib/validators';
import {
  ActionButton,
  Button,
  Section,
  SectionHeader,
} from 'components';
import {
  FormActionRow,
  FormCheckbox,
  FormInput,
  FormRow,
  FormTextArea,
  LabeledField,
  LabeledRow,
  SubmitButton,
} from 'components/form';

export default class FormSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    this.props.loadFormSettings();
  }

  handleEnter(e) {
    if (e.key === 'Enter' && e.target.name !== 'choices') {
      e.preventDefault();
    }
  }

  // A better way for the choices text area would be to have a single choice list, and have a
  // + and - button.  Highlight the row, and click - to delete, or + to add a new item.  Then
  // it would be easy to prevent duplicates up front, and to limit to 50 items in the form
  // rather than on submit.
  render() {
    const props = this.props;

    return (
      <form onSubmit={props.handleSubmit} onKeyPress={this.handleEnter}>
        <Section>
          <SectionHeader title="Field Builder"/>
          <FormRow>
            <LabeledField
              label="Label"
              name="label"
              placeholder="Enter Label"
              component={FormInput}
              width={300}
              validate={required}
              required
            />
          </FormRow>
          <FormRow>
            <LabeledRow
              label="Type"
            >
              Multi-Select
            </LabeledRow>
          </FormRow>
          <FormRow>
            <LabeledField
              label="A Value is required"
              name="required"
              component={FormCheckbox}
            />
          </FormRow>
          <FormRow>
            <LabeledField
              label="Default Value"
              name="default"
              placeholder="Enter Default Choice"
              component={FormInput}
              width={300}
              validate={required}
              required
            />
          </FormRow>
          <FormRow>
            <LabeledField
              label="Choices"
              name="choices"
              placeholder="Enter Choices"
              component={FormTextArea}
              required
              validate={required}
              width={300}
            />
          </FormRow>
          <FormRow>
            <LabeledField
              label="Display Choices In Alphabetic Order"
              name="displayAlpha"
              component={FormCheckbox}
            />
          </FormRow>
          <FormActionRow>
            <SubmitButton value="Save changes" primary/>
            <Button onClick={props.resetForm}>Cancel</Button>
            <ActionButton onClick={props.clearForm}>Clear Form</ActionButton>
          </FormActionRow>
        </Section>
      </form>
    );
  }
}

FormSettings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loadFormSettings: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

import Button from 'components/button/Button';

const SubmitButton = Button.withComponent('input').extend.attrs({ type: 'submit' })``;

export default SubmitButton;

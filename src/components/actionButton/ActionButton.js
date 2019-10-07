import Button from 'components/button/Button';
import colors from 'constants/colors';

const ActionButton = Button.extend`
  margin-left: 8px;
  white-space: nowrap;
  background-color: ${colors.GreyLighter}
`;

ActionButton.defaultProps = {
  theme: {
    button: {
      borderRadius: 6,
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 'normal',
      textColor: colors.Black,
    },
  },
};

export default ActionButton;

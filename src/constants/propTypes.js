import PropTypes from 'prop-types';

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);


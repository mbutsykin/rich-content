import PropTypes from 'prop-types';
import { PollOptionPropTypes } from '../poll-context/types';

export const OptionPropTypes = {
  option: PollOptionPropTypes,
  removeEnabled: PropTypes.bool,
  update: PropTypes.func,
  remove: PropTypes.func,
};

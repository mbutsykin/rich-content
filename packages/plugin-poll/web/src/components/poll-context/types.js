import PropTypes from 'prop-types';

export const PollOptionPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
});

export const PollPropTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  settings: PropTypes.shape({
    multi: PropTypes.bool.isRequired,
    secret: PropTypes.bool.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(PollOptionPropTypes).isRequired,
};

export const PollActionsPropTypes = {
  changePollTitle: PropTypes.func,
  changePollImage: PropTypes.func,
  updatePollOption: PropTypes.func,
  addOption: PropTypes.func,
  removeOption: PropTypes.func,
};

export const PollContextPropTypes = {
  poll: PropTypes.shape({
    ...PollPropTypes,
    ...PollActionsPropTypes,
  }),
};

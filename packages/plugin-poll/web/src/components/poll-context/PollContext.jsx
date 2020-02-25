import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { PollPropTypes } from './types';

export const PollContext = React.createContext({});

export const withPoll = WrappedComponent => props => {
  return (
    <PollContext.Consumer>
      {contextValue => {
        return <WrappedComponent {...props} {...contextValue} />;
      }}
    </PollContext.Consumer>
  );
};

export class PollContextProvider extends PureComponent {
  componentDidMount() {
    const { pollId } = this.props;

    if (pollId) {
      this.fetchPoll();
    }
  }

  fetchPoll() {}

  changePollTitle = title =>
    this.props.setPoll({
      ...this.props.poll,
      title,
    });

  updatePollOption = (index, option) => {
    const { poll } = this.props;

    poll.options[index] = option;

    this.props.setPoll({ ...poll });
  };

  addOption = () => {
    const { poll } = this.props;

    poll.options.push({
      id: '',
      title: '',
      imageUrl: '',
    });

    this.props.setPoll({ ...poll });
  };

  removeOption = index => {
    const { poll } = this.props;

    poll.options.splice(index, 1);

    this.props.setPoll({ ...poll });
  };

  render() {
    const { children } = this.props;

    return (
      <PollContext.Provider
        value={{
          poll: this.props.poll,
          changePollTitle: this.changePollTitle,
          updatePollOption: this.updatePollOption,
          addOption: this.addOption,
          removeOption: this.removeOption,
        }}
      >
        {children}
      </PollContext.Provider>
    );
  }
}

PollContextProvider.propTypes = {
  pollId: PropTypes.string,
  poll: PropTypes.shape(PollPropTypes),
  setPoll: PropTypes.func,
  children: PropTypes.any,
};

import React, { Component } from 'react';

import { withPoll, PollContextPropTypes } from './poll-context';
import { withRCEHelpers, RCEHelpersPropTypes } from './rce-helpers-context';

import { PollHeader } from './poll-header';
import { ListOption } from './option';

import styles from './poll.scss';

class PollComponent extends Component {
  static propTypes = {
    ...PollContextPropTypes,
    ...RCEHelpersPropTypes,
  };

  handleOptionUpdate(index) {
    return option => this.props.updatePollOption(index, option);
  }

  handleOptionRemove(index) {
    return () => this.props.removeOption(index);
  }

  render() {
    const { poll, rce, addOption } = this.props;

    return (
      <div className={styles.container}>
        <PollHeader />

        <ul className={styles.list}>
          {poll.options.map((option, i) => (
            <li key={i}>
              <ListOption
                option={option}
                update={this.handleOptionUpdate(i)}
                remove={this.handleOptionRemove(i)}
                removeEnabled={!rce.isViewMode && poll.options.length > 1}
              />
            </li>
          ))}

          {!rce.isViewMode && (
            <li>
              <button onClick={addOption} className={styles.addOptionButton}>
                Add answer
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export const Poll = withRCEHelpers(withPoll(PollComponent));

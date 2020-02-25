import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Poll } from './Poll';

import { PollContextProvider } from './poll-context';
import { RCEHelpersContext } from './rce-helpers-context';

export class PollEditor extends PureComponent {
  setPoll = poll => {
    const { componentData, store } = this.props;

    store.update(
      'componentData',
      {
        ...componentData,
        poll,
      },
      this.props.block.getKey()
    );
  };

  isPluginFocused() {
    const blockKey = this.props.block.getKey();
    const selectedBlockKey = this.props.selection.getAnchorKey();

    return blockKey === selectedBlockKey;
  }

  render() {
    const { componentData, setInPluginEditingMode } = this.props;

    return (
      <RCEHelpersContext.Provider
        value={{
          isViewMode: !this.isPluginFocused(),
          setInPluginEditingMode,
        }}
      >
        <PollContextProvider
          setPoll={this.setPoll}
          poll={componentData.poll}
          pollId={componentData.pollId}
        >
          <Poll />
        </PollContextProvider>
      </RCEHelpersContext.Provider>
    );
  }
}

PollEditor.propTypes = {
  componentData: PropTypes.shape({
    poll: PropTypes.object,
    pollId: PropTypes.string,
  }).isRequired,

  block: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,

  setInPluginEditingMode: PropTypes.func.isRequired,
  store: PropTypes.shape({
    update: PropTypes.func.isRequired,
  }).isRequired,
};

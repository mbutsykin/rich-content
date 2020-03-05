import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Poll } from './Poll';

import { PollContextProvider } from './poll-context';
import { RCEHelpersContext } from './rce-helpers-context';

export class PollEditor extends PureComponent {
  setPoll = poll => {
    const { componentData, store } = this.props;

    store.set('componentData', {
      ...componentData,
      poll,
    });
  };

  isPluginFocused() {
    const blockKey = this.props.block.getKey();
    const selectedBlockKey = this.props.selection.getAnchorKey();

    return blockKey === selectedBlockKey;
  }

  render() {
    const { componentData, componentState, setInPluginEditingMode } = this.props;

    return (
      <RCEHelpersContext.Provider
        value={{
          isViewMode: componentState.isPreview || !this.isPluginFocused(),
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
  componentState: PropTypes.shape({
    isPreview: PropTypes.bool,
  }).isRequired,
  componentData: PropTypes.shape({
    poll: PropTypes.object,
    pollId: PropTypes.string,
  }).isRequired,

  block: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,

  setInPluginEditingMode: PropTypes.func.isRequired,
  store: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }).isRequired,
};

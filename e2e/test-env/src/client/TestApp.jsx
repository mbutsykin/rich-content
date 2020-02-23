import React, { PureComponent } from 'react';
import Editor from '../../../../examples/main/shared/editor/Editor';
import Viewer from '../../../../examples/main/shared/viewer/Viewer';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './app.css';
import classNames from 'classnames';
class TestApp extends PureComponent {
  renderEditor = () => {
    const { initialState, onEditorChange, locale, localeResource, isMobile } = this.props;
    return (
      <Editor
        onChange={onEditorChange}
        initialState={initialState}
        isMobile={isMobile}
        shouldMockUpload
        locale={locale}
        localeResource={localeResource}
        mockImageIndex={1}
      />
    );
  };

  renderViewer = () => {
    const { isMobile, viewerState, locale, seoMode } = this.props;
    return (
      <Viewer initialState={viewerState} isMobile={isMobile} locale={locale} seoMode={seoMode} />
    );
  };

  render() {
    const { isMobile } = this.props;
    return (
      <div
        className={classNames(styles.testApp, { [styles.mobile]: isMobile })}
        // className={`testApp ${isMobile ? 'mobile' : ''}`}
      >
        <div>
          <h3>Editor</h3>
          <div
            className={styles.rcWrapper}
            // className="rcWrapper rce"
          >
            {this.renderEditor()}
          </div>
        </div>
        <div>
          <h3>Viewer</h3>
          <div
            className={classNames(styles.rcWrapper, styles.rcv)}
            // className="rcWrapper rcv"
          >
            {this.renderViewer()}
          </div>
        </div>
      </div>
    );
  }
}

TestApp.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  viewerState: PropTypes.object,
  initialState: PropTypes.object,
  localeResource: PropTypes.object,
  onEditorChange: PropTypes.func,
  seoMode: PropTypes.bool,
};

export default withStyles(styles)(TestApp);

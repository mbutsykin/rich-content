import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/see-full-post.scss';

class SeeFullPost extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    overlayStyles: PropTypes.object,
    labelStyles: PropTypes.object,
    onPreviewExpand: PropTypes.func.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    label: 'See full post',
    onClick: () => {},
  };

  onClick = e => {
    const { onClick, onPreviewExpand } = this.props;
    e.preventDefault();
    onClick();
    onPreviewExpand();
  };

  render() {
    const { label, children, overlayStyles, labelStyles } = this.props;
    /* eslint-disable */
    return (
      <div>
        {children}
        <div className={styles.seeFullPost_overlay} style={overlayStyles} onClick={this.onClick}>
          <span className={styles.seeFullPost_label} style={labelStyles}>
            {label}
          </span>
        </div>
      </div>
    );
  }
}

export default SeeFullPost;

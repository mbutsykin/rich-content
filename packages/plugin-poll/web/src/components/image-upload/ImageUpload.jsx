/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';

import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';
import { AddImageIcon } from '../../assets/icons';

import { ImageUploadPropTypes } from './types';
import styles from './image-upload.scss';

class ImageUploadComponent extends PureComponent {
  static propTypes = {
    ...ImageUploadPropTypes,
    ...RCEHelpersPropTypes,
  };

  $fileInput = React.createRef();

  handleFileUploadClick = () => {
    const { rce } = this.props;

    rce.setInPluginEditingMode(true);
    this.$fileInput.current.click();
  };

  handleFileChange = () => {
    const [file] = this.$fileInput.current.files;
    const reader = new FileReader();

    reader.onload = e => this.props.onChange(e.target.result);

    reader.readAsDataURL(file);

    this.props.rce.setInPluginEditingMode(false);
    this.$fileInput.current.files = null;
  };

  render() {
    const { className, value } = this.props;

    if (value) {
      return (
        <div
          className={cls(styles.container, className)}
          style={{ backgroundImage: `url('${value}')` }}
        />
      );
    }

    return (
      <div className={cls(styles.container, className)} onClick={this.handleFileUploadClick}>
        <AddImageIcon />
        <input
          type="file"
          className={styles.hidden}
          ref={this.$fileInput}
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export const ImageUpload = withRCEHelpers(ImageUploadComponent);

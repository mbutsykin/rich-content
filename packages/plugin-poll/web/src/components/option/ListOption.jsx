import React, { PureComponent } from 'react';
import { RemoveIcon } from '../../assets/icons';

import { TextField } from '../text-field';

import { OptionPropTypes } from './types';

import styles from './option.scss';

export class ListOption extends PureComponent {
  static propTypes = OptionPropTypes;

  handleTitleChange = title => {
    const { update, option } = this.props;

    update({ ...option, title });
  };

  handleRemove = e => {
    e.stopPropagation();

    this.props.remove();
  };

  render() {
    const { option, removeEnabled } = this.props;

    return (
      <div className={styles.option}>
        <div className={styles.title}>
          <TextField
            className={styles.input}
            value={option.title}
            placeholder="Type an answer here"
            onChange={this.handleTitleChange}
          />
          {removeEnabled && <RemoveIcon onClick={this.handleRemove} className={styles.remove} />}
        </div>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { clamp } from 'lodash';

import { RCEHelpersPropTypes, withRCEHelpers } from '../rce-helpers-context';

import styles from './text-field.scss';

class TextFieldComponent extends React.PureComponent {
  $el = React.createRef();

  state = {
    placeholder: this.props.placeholder,
    rows: 1,
  };

  componentDidMount() {
    this.resize();
  }

  componentDidUpdate() {}

  hidePlaceholder() {
    this.setState({ placeholder: '' });
  }

  showPlaceholder() {
    this.setState({ placeholder: this.props.placeholder });
  }

  handleFocus = () => {
    this.hidePlaceholder();
    this.props.rce.setInPluginEditingMode(true);
  };

  handleBlur = () => {
    this.showPlaceholder();
    this.props.rce.setInPluginEditingMode(false);
  };

  handleChange = event => {
    this.props.onChange(event.target.value);
    this.resize();
  };

  resize() {
    const computedStyles = getComputedStyle(this.$el.current);

    const lineHeight = parseInt(computedStyles.lineHeight);
    const paddingTop = parseInt(computedStyles.paddingTop);
    const paddingBottom = parseInt(computedStyles.paddingBottom);

    this.$el.current.rows = 1;

    const { scrollHeight } = this.$el.current;

    this.$el.current.rows = this.state.rows;

    const contentHeight = scrollHeight - (paddingTop + paddingBottom);
    const rows = clamp(contentHeight / lineHeight, 1, 10);

    this.setState({ rows });
  }

  render() {
    const { value, textAutoResize, className, rce, ...props } = this.props;
    const { placeholder, rows } = this.state;

    if (rce.isViewMode) {
      return (
        <p
          ref={this.$el}
          className={cls(
            styles.text,
            className,
            textAutoResize && {
              [styles.small]: value.length > 90,
              [styles.medium]: value.length <= 90,
              [styles.large]: value.length <= 60,
            }
          )}
        >
          {value}
        </p>
      );
    }

    return (
      <textarea
        {...props}
        ref={this.$el}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        placeholder={placeholder}
        value={value}
        rows={rows}
        className={cls(
          styles.input,
          className,
          textAutoResize && {
            [styles.small]: value.length > 90,
            [styles.medium]: value.length <= 90,
            [styles.large]: value.length <= 60,
          }
        )}
      />
    );
  }
}

export const TextField = withRCEHelpers(TextFieldComponent);

TextFieldComponent.defaultProps = {};

TextFieldComponent.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  textAutoResize: PropTypes.bool,
  ...RCEHelpersPropTypes,
};

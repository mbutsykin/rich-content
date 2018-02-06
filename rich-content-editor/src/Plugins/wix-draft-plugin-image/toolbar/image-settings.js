import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '~/Components/ThemeProvider';
import { Image } from 'stylable-components/dist/src/components/image';
import SettingsSection from '~/Components/SettingsSection';
import getImageSrc from '../get-image-source';
import InputWithLabel from '~/Components/InputWithLabel';
import SettingsPanelFooter from '~/Components/SettingsPanelFooter';
import FileInput from '~/Components/FileInput';
import styles from './image-settings.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class ImageSettings extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  propsToState(props) {
    const initialImageState = { ...props.componentData.item };
    return {
      item: props.componentData.item,
      initialImageState,
    };
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  revertComponentData () {
    const { componentData, helpers, pubsub } = this.props;
    const { initialImageState } = this.state;
    if (initialImageState) {
      componentData.item = initialImageState;
      pubsub.set('componentData', componentData);
    }
    this.setState({ item: initialImageState });

    helpers.closeExternalModal();
  }

  imageMetadataUpdated = (image, value) => {
    image.metadata = Object.assign({}, image.metadata, value);
    this.setState({ item: this.state.item });
  };

  handleFileChange = event => {
    if (event.target.files.length > 0) {
      const handleFilesSelected = this.props.pubsub.get('handleFilesSelected');
      handleFilesSelected(event.target.files);
    }
  };

  replaceImage(event) {
    this.handleFileChange(event);
  }

  deleteImage() {
    const { componentData, helpers, pubsub } = this.props;
    componentData.item = {};
    pubsub.set('componentData', componentData);
    this.setState({ item: {} });

    helpers.closeExternalModal();
  }

  render() {
    const { componentData, helpers } = this.props;
    const { item } = componentData;
    const { metadata = {} } = item;

    return (
      <ThemeProvider theme={'rce'}>
        <div className={this.styles.imageSettings}>
          <div className={this.styles.content}>
            <h3 className={this.styles.title}>Image Settings</h3>
            <SettingsSection theme={this.props.theme}>
              <Image resizeMode={'contain'} className={this.styles.image} src={getImageSrc(item, helpers)} />
            </SettingsSection>
            <div className={this.styles.manageImageGrid}>
              <FileInput className={this.styles.replace} onChange={event => this.replaceImage(event)}>
                <span>{'Replace'}</span>
              </FileInput>
              <button className={this.styles.delete} onClick={() => this.deleteImage()}>
                <span>{'Delete'}</span>
              </button>
            </div>
            <SettingsSection theme={this.props.theme} className={this.styles.imageSettingsSection}>
              <InputWithLabel
                theme={this.props.theme}
                label={'Alt Text'}
                placeholder={'Add image Alt Text'}
                value={metadata.altText || ''}
                onChange={event => this.imageMetadataUpdated(item, { altText: event.target.value })}
              />
            </SettingsSection>
            <SettingsSection theme={this.props.theme} className={this.styles.imageSettingsSection}>
              <InputWithLabel
                theme={this.props.theme}
                label={'Caption'}
                placeholder={'Enter your image caption (optional)'}
                value={metadata.caption || ''}
                onChange={event => this.imageMetadataUpdated(item, { caption: event.target.value })}
              />
            </SettingsSection >
            <SettingsSection theme={this.props.theme} className={this.styles.imageSettingsSection}>
              <InputWithLabel
                theme={this.props.theme}
                label={'Link'}
                placeholder={'Add a link'}
                value={metadata.link || ''}
                onChange={event => this.imageMetadataUpdated(item, { link: event.target.value })}
              />
            </SettingsSection>
          </div>
          <SettingsPanelFooter theme={this.props.theme} cancel={() => this.revertComponentData()} save={() => helpers.closeExternalModal()} />
        </div>
      </ThemeProvider>
    );
  }
}
ImageSettings.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
};

export default ImageSettings;

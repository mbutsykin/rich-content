import React from 'react';
import PropTypes from 'prop-types';
import { MODALS } from 'wix-rich-content-common';
import { ImageSettingsModal } from 'wix-rich-content-plugin-image';
import GallerySettingsModal from '~/Plugins/wix-draft-plugin-gallery/components/gallery-settings-modal';
import HTMLSettingsModal from '~/Plugins/wix-draft-plugin-html/toolbar/html-settings';
import VideoURLInputModal from '~/Plugins/wix-draft-plugin-video/toolbar/videoURLInputModal';
import MobileAddPluginModal from './Toolbars/AddPluginModal';
import MobileBlockLinkModal from './Toolbars/MobileBlockLinkModal';
import MobileTextLinkModal from './Toolbars/MobileTextLinkModal';

const Modals = {
  [MODALS.IMAGE_SETTINGS]: ImageSettingsModal,
  [MODALS.GALLERY_SETTINGS]: GallerySettingsModal,
  [MODALS.VIDEO_URL_INPUT]: VideoURLInputModal,
  [MODALS.HTML_SETTINGS]: HTMLSettingsModal,
  [MODALS.MOBILE_ADD_PLUGIN]: MobileAddPluginModal,
  [MODALS.MOBILE_BLOCK_LINK_MODAL]: MobileBlockLinkModal,
  [MODALS.MOBILE_TEXT_LINK_MODAL]: MobileTextLinkModal,
};

const RichContentModal = ({ modalName, modalElement, ...modalProps }) => {
  const ModalElement = Modals[modalName] || modalElement;
  if (!ModalElement) {
    console.error(`Attempted to open unknown external modal '${modalName}'`); //eslint-disable-line no-console
    return null;
  }
  return <ModalElement {...modalProps} />;
};

RichContentModal.propTypes = {
  modalName: PropTypes.string,
  modalElement: PropTypes.func,
  modalProps: PropTypes.object,
};

export default RichContentModal;

import { BUTTONS, TOOLBARS } from 'wix-rich-content-editor-common';

import { DEFAULT_COMPONENT_DATA } from '../constants';
import { InsertPluginIcon } from '../assets/icons';

export function createToolbar({ helpers, t, isMobile }) {
  return {
    InlineButtons: [{ keyName: 'delete', type: BUTTONS.DELETE, mobile: isMobile }],
    InsertButtons: [
      {
        name: 'Poll',
        tooltipText: t('PollPlugin_InsertButton_Tooltip'),
        toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
        Icon: InsertPluginIcon,
        helpers,
        componentData: DEFAULT_COMPONENT_DATA,
        t,
      },
    ],
    name: 'poll',
  };
}

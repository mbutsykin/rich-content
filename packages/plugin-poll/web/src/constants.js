export const POLL_TYPE = 'wix-draft-plugin-poll';

export const DEFAULT_COMPONENT_DATA = {
  config: {
    alignment: 'center',
    size: 'large',
    width: 'full-width',
  },
  pollId: '',
  poll: {
    title: '',
    imageUrl: '',
    settings: {
      multi: false,
      secret: false,
    },
    options: [
      {
        id: '',
        title: '',
        imageUrl: '',
      },
      {
        id: '',
        title: '',
        imageUrl: '',
      },
    ],
  },
  layout: {},
  design: {},
};

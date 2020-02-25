import { typeMapper } from './typeMapper';

import { DEFAULT_COMPONENT_DATA, POLL_TYPE } from './constants';

export { typeMapper as pollTypeMapper, POLL_TYPE };

export const pluginImage = (config = {}) => {
  return {
    config: { ...DEFAULT_COMPONENT_DATA.config, ...config },
    type: POLL_TYPE,
    typeMapper,
    decorator: {},
  };
};

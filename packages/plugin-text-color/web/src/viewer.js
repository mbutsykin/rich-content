import { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE } from './types';
import { default as textColorInlineStyleMapper } from './textColorInlineStyleMapper';
import { default as textHighlightInlineStyleMapper } from './textHighlightInlineStyleMapper';
import { DEFAULTS } from './constants';
export {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  textColorInlineStyleMapper,
  textHighlightInlineStyleMapper,
};

export const pluginTextColor = (config = {}) => {
  return {
    config: { ...DEFAULTS.configTextColor, ...config },
    type: TEXT_COLOR_TYPE,
    decorator: {},
    typeMapper: {},
    inlineStyleMappers: textColorInlineStyleMapper,
  };
};

export const pluginTextHighlight = (config = {}) => {
  return {
    config: { ...DEFAULTS.configTextHighlight, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
    decorator: {},
    typeMapper: {},
    inlineStyleMappers: textHighlightInlineStyleMapper,
  };
};

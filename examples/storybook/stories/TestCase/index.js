import { storiesOf } from '@storybook/react';

import HTMLPluginStory from './HtmlPlugin.js';
import BlogLefties from './BlogLefties.js';
import ImageFloatSpacing from './ImageFloatSpacing.js';

storiesOf('Test Cases')
  .add('Image Float Spacing', ImageFloatSpacing)
  .add('Blog Lefties', BlogLefties)
  .add('HTML Instagram Height', HTMLPluginStory);

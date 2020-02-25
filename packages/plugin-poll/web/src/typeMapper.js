import { PollViewer } from './components';
import { POLL_TYPE } from './constants';

export const typeMapper = () => ({
  [POLL_TYPE]: {
    component: PollViewer,
  },
});

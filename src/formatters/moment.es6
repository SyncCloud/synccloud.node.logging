import moment from 'moment';

import {DATETIME_FORMAT} from '../constants';

export default class MomentFormatter {
  canFormat(obj) {
    return moment.isMoment(obj);
  }

  format(m) {
    return m.format(DATETIME_FORMAT);
  }
}

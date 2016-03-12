import moment from 'moment';

const DATETIME_FORMAT = 'DD-MM HH:mm:ss.SSSSSSSSS';

export default class MomentFormatter {
  canFormat(obj) {
    return moment.isMoment(obj);
  }

  format(m) {
    return m.format(DATETIME_FORMAT);
  }
}

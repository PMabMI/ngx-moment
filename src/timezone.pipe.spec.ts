import * as moment from 'moment-timezone';
import { DateFormatPipe } from './date-format.pipe';
import { TimezonePipe } from './timezone.pipe';

describe('TimezonePipe', () => {

  describe('#transform', () => {

    let timezonePipe: TimezonePipe;

    beforeEach(() => {
      timezonePipe = new TimezonePipe();
    });

    it('should output an invalid momemt object for a null input', () => {
      const timezoneDate = timezonePipe.transform(null);
      expect(timezoneDate).toEqual(expect.any(moment));
      expect(timezoneDate.isValid()).toBe(false);
    });

    it('should output a moment object for a moment input', () => {
      const momentDate = moment();
      const timezoneDate = timezonePipe.transform(momentDate);
      expect(timezoneDate).toEqual(expect.any(moment));
      expect(timezoneDate.isValid()).toBe(true);
    });

    it('should output a moment object for a date input', () => {
      const date = new Date();
      const timezoneDate = timezonePipe.transform(date);
      expect(timezoneDate).toEqual(expect.any(moment));
      expect(timezoneDate.isValid()).toBe(true);
    });

    it('should output a moment object for a string date', () => {
      const dateString = '2016-01-01';
      const timezoneDate = timezonePipe.transform(dateString);
      expect(timezoneDate).toEqual(expect.any(moment));
      expect(timezoneDate.isValid()).toBe(true);
    });

    it('should output a moment object for a timestamp', () => {
      const timestamp: number = Date.now();
      const timezoneDate = timezonePipe.transform(timestamp);
      expect(timezoneDate).toEqual(expect.any(moment));
      expect(timezoneDate.isValid()).toBe(true);
    });

    it('should be pipeable to amDateFormat', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2016-01-01';
      const momentFormatString = 'YYYY-MM-DD';
      const timezoneOutput = timezonePipe.transform(datetimeString);
      expect(amDateFormat.transform(timezoneOutput, momentFormatString)).toEqual('2016-01-01');
    });

    it('should enable the "z" and "zz" format options for amDateFormat', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2016-01-01';
      const timezoneOutput = timezonePipe.transform(datetimeString, 'America/Chicago');
      expect(amDateFormat.transform(timezoneOutput, 'YYYY-MM-DD z')).toEqual('2016-01-01 CST');
      expect(amDateFormat.transform(timezoneOutput, 'YYYY-MM-DD zz')).toEqual('2016-01-01 CST');
    });

    it('should guess the user\'s timezone if not passed a value', () => {
      const amDateFormat = new DateFormatPipe();
      const datetimeString = '2016-01-01';
      const momentFormatString = 'YYYY-MM-DD z';
      const abbr = moment.tz.zone(moment.tz.guess()).abbr(moment(datetimeString).valueOf());
      const timezoneOutput = timezonePipe.transform(datetimeString);
      expect(amDateFormat.transform(timezoneOutput, momentFormatString)).toEqual(`2016-01-01 ${abbr}`);
    });

  });

});

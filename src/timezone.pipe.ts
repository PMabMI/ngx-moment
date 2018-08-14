import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

const momentContructor = moment.tz;

@Pipe({ name: 'amTimezone' })
export class TimezonePipe implements PipeTransform {
  transform(value: Date | moment.Moment | string | number, timezone: string = moment.tz.guess()): moment.Moment {
    return momentContructor(value, timezone);
  }
}

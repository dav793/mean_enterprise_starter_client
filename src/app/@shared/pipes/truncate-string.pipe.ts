import { Pipe, PipeTransform } from '@angular/core';

/**
 * truncate a string if it exceeds a max length (20 by default)
 * a truncated string has all of it's exceeding characters replaced with ellipses (...)
 * any string less than max length is left unaltered
 *
 * example usage:
 *  {{ 'hello world' | truncateString:4 }}
 *
 * expected output: 'hell...'
 */
@Pipe({
  name: 'truncateString'
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, maxLength?: number): any {

    maxLength = maxLength ? maxLength : 20;
    if (value.length <= maxLength)
        return value;

    const result = value.slice(0, maxLength) + '...';
    return result;

  }

}

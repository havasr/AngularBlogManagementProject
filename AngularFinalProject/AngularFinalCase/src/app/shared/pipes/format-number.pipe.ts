import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatNumber' })
export class FormatNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1000) {
      return value.toString();
    }
    
    const decimalPart = value % 1000;
    const integerPart = Math.floor(value / 1000);
    const formattedNumber = `${integerPart}.${decimalPart.toString().padStart(3, '0')}`;

    return formattedNumber;
  }
}

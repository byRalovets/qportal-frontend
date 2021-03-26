import {FieldType} from './util/field-type';

export class FieldDto {

  options: string[] | undefined;

  constructor(
    public id: null | number,
    public label: string,
    public type: FieldType,
    public isRequired: boolean,
    public isActive: boolean,
    options: string,
  ) {
    if (options.trim() !== '') {
      this.options = options.split('\n');
    } else {
      this.options = [];
    }
  }
}

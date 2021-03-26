import {FieldDto} from './field/field-dto';
import {FieldHeaderDTO} from './field-header-dto';

export class FieldHeaderParser {

  static parseFields(json: string): Array<FieldHeaderDTO> {
    const data = JSON.parse(json);

    const headers: Array <FieldHeaderDTO> = [];

    data.forEach((item: any) => {
      headers.push(new FieldHeaderDTO(item.fieldId, item.label));
    });

    return headers;
  }
}

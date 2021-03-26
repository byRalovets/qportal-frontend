import {FieldDto} from './field/field-dto';

export class FieldPageDTO {

  fields: Array<FieldDto>;
  totalPages: number;
  requestedPage: number;

  constructor(fields: Array<FieldDto>, totalPages: number, requestedPage: number) {
    this.fields = fields;
    this.totalPages = totalPages;
    this.requestedPage = requestedPage;
  }
}

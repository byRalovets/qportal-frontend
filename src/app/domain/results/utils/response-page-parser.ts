import {FieldHeaderDTO} from '../../field-header-dto';
import {ResponsePageDTO} from '../../response-page-dto';
import {ResponseParser} from './response-parser';

export class ResponsePageParser {

  static parseResponsePage(json: string): ResponsePageDTO {
    const data = JSON.parse(json);
    return new ResponsePageDTO(data.pages, ResponseParser.parseFields(JSON.stringify(data.responses)));
  }
}

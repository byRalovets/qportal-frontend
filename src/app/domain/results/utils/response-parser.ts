import {FieldHeaderDTO} from '../../field-header-dto';
import {ResponseDTO} from '../../response-dto';
import {AnswerParser} from '../../answer-parser';
// @ts-ignore
import {log} from 'util';

export class ResponseParser {

  static parseFields(json: string): Array<ResponseDTO> {
    const data = JSON.parse(json);

    // log('ALL RESPONSES INSIDE RESPONSE PARSER:\n\n' + JSON.stringify(data));

    const responses: Array <ResponseDTO> = [];

    data.forEach((item: any) => {
      // log('ANOTHER ONE RESPONSE:\n\n' + JSON.stringify(item));

      responses.push(new ResponseDTO(AnswerParser.parseAnswers(JSON.stringify(item.answers))));
    });

    return responses;
  }
}

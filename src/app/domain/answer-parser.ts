import {FieldHeaderDTO} from './field-header-dto';
import {AnswerDTO} from './answer-dto';
import {Answer} from './answer';
// @ts-ignore
import {log} from 'util';

export class AnswerParser {

  static parseAnswers(json: string): Array<AnswerDTO> {
    const data = JSON.parse(json);

    const answers: Array <AnswerDTO> = [];

    // log('ALL ANSWERS:\n\n' + JSON.stringify(data));

    data.forEach((item: any) => {
      // log('ALL ANSWERS:\n\n' + JSON.stringify(item));
      answers.push(new AnswerDTO(new Answer(item.fieldId, item.text)));
    });

    return answers;
  }
}

import {AnswerDTO} from './answer-dto';
import {Answer} from './answer';

export class AnswerParser {

    static parseAnswers(json: string): Array<AnswerDTO> {
        const data = JSON.parse(json);

        const answers: Array<AnswerDTO> = [];

        data.forEach((item: any) => {
            answers.push(new AnswerDTO(new Answer(item.fieldId, item.text)));
        });

        return answers;
    }
}

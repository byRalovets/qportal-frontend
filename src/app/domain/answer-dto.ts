import {Answer} from './answer';

export class AnswerDTO {

    fieldId: number;
    text: string;

    constructor(answer: Answer) {
        this.fieldId = answer.fieldId;
        this.text = answer.answers.join(', ');
    }

}

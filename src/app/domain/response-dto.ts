import {AnswerDTO} from './answer-dto';

export class ResponseDTO {

  answers: Array<AnswerDTO>;

  constructor(answers: Array<AnswerDTO>) {
    this.answers = answers;
  }

}

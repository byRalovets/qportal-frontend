export class Answer {

  fieldId: number;
  answers: Array<string> = new Array<string>();

  constructor(fieldId: number, answer: string) {
    this.fieldId = fieldId;
    this.answers.push(answer);
  }

  addAnswer(value: string) {
    this.answers.push(value);
  }

  removeAnswer(text: string) {
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i] === text) {
        this.answers.splice(i, 1);
      }
    }
  }

  clearAnswers() {
    this.answers.slice();
  }
}

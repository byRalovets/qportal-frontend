export class Answer {

    fieldId: number;
    answers: Array<string> = new Array<string>();

    constructor(fieldId: number, answer: string) {
        this.fieldId = fieldId;
        this.answers.push(answer);
    }

    addAnswer(value: string): void {
        this.answers.push(value);
    }

    removeAnswer(text: string): void {
        for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i] === text) {
                this.answers.splice(i, 1);
            }
        }
    }

    clearAnswers(): void {
        this.answers.slice();
    }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FieldDto} from '../../domain/field/field-dto';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {Answer} from '../../domain/answer';
import {AnswerDTO} from '../../domain/answer-dto';
import {ResponseDTO} from '../../domain/response-dto';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {FieldParser} from '../../domain/field/util/fieldParser';
// @ts-ignore
import {log} from 'util';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

    isSent = false;
    isLoaded = false;
    fields: Array<FieldDto> = [];
    requiredFieldAnswered = true;
    hasAnyFields = true;

    answers: Map<number, Answer> = new Map<number, Answer>();
    answerDTOlist: Array<AnswerDTO> = [];

    constructor(private router: Router, private token: TokenStorageService, private questionnaireService: QuestionnaireService) {
    }

    ngOnInit(): void {
        if (!this.token.getToken()) {
            this.router.navigate(['']).then();
        }

        this.questionnaireService.getFields().subscribe(data => {
            this.fields = FieldParser.parseFields(data);
            log(this.fields);
            if (this.fields.length > 0) {
                this.hasAnyFields = true;
            } else {
                this.hasAnyFields = false;
            }

            setTimeout(() => this.isLoaded = true, 300);
        });
    }

    onTextAnswerChanged(fieldId: number | null, value: string): void {
        if (fieldId == null) {
            return;
        }

        if (this.answers.has(fieldId)) {
            this.answers.get(fieldId)?.clearAnswers();
            this.answers.get(fieldId)?.addAnswer(value);
        } else {
            const answer = new Answer(fieldId, value);
            this.answers.set(fieldId, answer);
        }

        this.answers?.set(fieldId, new Answer(fieldId, value));
    }

    onCheckBoxChanged(fieldId: number | null, isChecked: boolean, optionLabel: string): void {

        if (fieldId == null) {
            return;
        }

        if (isChecked) {
            if (this.answers.has(fieldId)) {
                this.answers.get(fieldId)?.addAnswer(optionLabel);
            } else {
                const answer = new Answer(fieldId, optionLabel);
                this.answers.set(fieldId, answer);
            }
        }
    }

    onSubmit(): void {
        this.requiredFieldAnswered = true;
        for (const field of this.fields.filter(f => f.id !== null && f.isRequired)) {
            if (field.id != null && !this.answers.has(field.id)) {
                this.requiredFieldAnswered = false;
                return;
            }
        }

        this.answers.forEach(answer => {
            if (answer) {
                this.answerDTOlist.push(new AnswerDTO(answer));
            }
        });

        const responseDto = new ResponseDTO(this.answerDTOlist);

        this.isSent = true;
        this.questionnaireService.sendAnswer(responseDto);
    }

    onReset(): void {
        this.answers.clear();
    }
}

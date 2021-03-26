import {Component, OnInit} from '@angular/core';
import {ResponseDTO} from '../../domain/response-dto';
import {FieldHeaderDTO} from '../../domain/field-header-dto';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {FieldHeaderParser} from '../../domain/field-header-parser';
import {CompatClient, Stomp} from '@stomp/stompjs';
// @ts-ignore
import {log} from 'util';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {ResultsPageRequestDTO} from '../../domain/results/results-page-request-dto';
import {ResultsPageResponseParser} from '../../domain/results/utils/results-page-response-parser';
import {ResultsService} from '../../services/results/results.service';

@Component({
    selector: 'app-responses',
    templateUrl: './responses.component.html',
    styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

    private stompClient: CompatClient | undefined;

    currentPage = 1;
    totalPages = 0;
    totalResponses = 0;
    ITEM_COUNT = 5;
    hasAnyFields = false;

    responses: Array<ResponseDTO> = [];//{ answers: [ {fieldId: 1, text: "Anthony"}, {fieldId: 2, text: "Ralovets"}, {fieldId: 3, text: "Horki"}, {fieldId: 4, text: "Male"} ]}];
    fieldHeaders: Array<FieldHeaderDTO> = [];// { fieldId: 1, label: "First Name" }, { fieldId: 2, label: "Last Name" }, { fieldId: 3, label: "City" }, { fieldId: 4, label: "Sex" } ];

    websocketAccessToken = '';

    constructor(private questionnaireService: QuestionnaireService, private authService: AuthService, private tokenStorage: TokenStorageService, private resultsService: ResultsService) {
    }

    ngOnInit(): void {
        this.questionnaireService.getFieldHeaders().subscribe(data => {
            this.fieldHeaders.push(...FieldHeaderParser.parseFields(data));
            if (this.fieldHeaders.length > 0) {
                this.hasAnyFields = true;
            }

            this.initializeWebsocketConnection();
        });
    }

    initializeWebsocketConnection() {
        let socket = new WebSocket('ws://qportal.herokuapp.com/responses-endpoint');
        this.stompClient = Stomp.over(socket);

        const header = {
            "jwt-token" : this.tokenStorage.getToken()
        };

        log(header);

        this.stompClient.connect(header, (data: string) => {
            this.requestPage(1);
            this.stompClient?.subscribe('/user/topic/greetings', responsePageMessage => {
                log(responsePageMessage.body);

                const resultsPageResponse = ResultsPageResponseParser.parseResultsPageResponse(responsePageMessage.body);

                if (resultsPageResponse.totalPages === 0) {
                    log('resultsPageResponse.totalPages === 0');
                    this.totalPages = 0;
                    this.currentPage = 1;
                    this.responses = [];
                    this.totalResponses = 0;
                    return;
                }

                this.responses = resultsPageResponse.responses;
                this.totalPages = resultsPageResponse.totalPages;
                this.currentPage = resultsPageResponse.requestedPage;
                this.totalResponses = resultsPageResponse.totalResponses;
                return;
            });
        });
    }

    requestPage(requestedPage: number) {
        const request = new ResultsPageRequestDTO(
            requestedPage,
            this.ITEM_COUNT,
            this.tokenStorage.getToken()
        );

        console.log('Request is ' + JSON.stringify(request));
        this.stompClient?.send('/app/responses', {}, JSON.stringify(request));
    }

    findAnswerInResponse(fieldId: number, response: ResponseDTO) {
        for (let answer of response.answers) {
            if (answer.fieldId == fieldId) {
                return answer.text;
            }
        }
        return 'N/A';
    }

    onNextClick(): void {
        if (this.currentPage + 1 > this.totalPages) {
            return;
        }

        this.requestPage(this.currentPage + 1);
    }

    onPreviousClick(): void {
        if (this.currentPage === 1) {
            return;
        }

        this.requestPage(this.currentPage - 1);
    }


}

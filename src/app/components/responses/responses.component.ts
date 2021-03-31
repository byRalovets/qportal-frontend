import {Component, OnInit} from '@angular/core';
import {ResponseDTO} from '../../domain/response-dto';
import {FieldHeaderDTO} from '../../domain/field-header-dto';
import {QuestionnaireService} from '../../services/questionnaire/questionnaire.service';
import {FieldHeaderParser} from '../../domain/field-header-parser';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {ResultsPageRequestDTO} from '../../domain/results/results-page-request-dto';
import {ResultsPageResponseParser} from '../../domain/results/utils/results-page-response-parser';

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

    responses: Array<ResponseDTO> = [];
    fieldHeaders: Array<FieldHeaderDTO> = [];

    websocketAccessToken = '';

    constructor(private questionnaireService: QuestionnaireService, private authService: AuthService,
                private tokenStorage: TokenStorageService) {
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

    initializeWebsocketConnection(): void {
        const socket = new WebSocket('wss://qportal.herokuapp.com/responses-endpoint');
        this.stompClient = Stomp.over(socket);

        const header = {
            'jwt-token': this.tokenStorage.getToken()
        };

        this.stompClient.connect(header, () => {
            this.requestPage(1);
            this.stompClient?.subscribe('/user/topic/greetings', responsePageMessage => {

                const resultsPageResponse = ResultsPageResponseParser.parseResultsPageResponse(responsePageMessage.body);

                if (resultsPageResponse.totalPages === 0) {
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

    requestPage(requestedPage: number): void {
        const request = new ResultsPageRequestDTO(
            requestedPage,
            this.ITEM_COUNT,
            this.tokenStorage.getToken()
        );

        console.log('Request is ' + JSON.stringify(request));
        this.stompClient?.send('/app/responses', {}, JSON.stringify(request));
    }

    findAnswerInResponse(fieldId: number, response: ResponseDTO): string {
        for (const answer of response.answers) {
            if (answer.fieldId === fieldId) {
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

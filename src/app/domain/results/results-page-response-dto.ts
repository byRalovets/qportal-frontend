import {ResponseDTO} from '../response-dto';

export class ResultsPageResponseDTO {

    // tslint:disable-next-line:variable-name
    private _responses: Array<ResponseDTO>;
    // tslint:disable-next-line:variable-name
    private _totalPages: number;
    // tslint:disable-next-line:variable-name
    private _totalResponses: number;
    // tslint:disable-next-line:variable-name
    private _requestedPage: number;

    constructor(responses: Array<ResponseDTO>, totalPages: number, totalElements: number, requestedPage: number) {
        this._responses = responses;
        this._totalPages = totalPages;
        this._totalResponses = totalElements;
        this._requestedPage = requestedPage;
    }

    get responses(): Array<ResponseDTO> {
        return this._responses;
    }

    set responses(value: Array<ResponseDTO>) {
        this._responses = value;
    }

    get totalPages(): number {
        return this._totalPages;
    }

    set totalPages(value: number) {
        this._totalPages = value;
    }

    get totalResponses(): number {
        return this._totalResponses;
    }

    set totalResponses(value: number) {
        this._totalResponses = value;
    }

    get requestedPage(): number {
        return this._requestedPage;
    }

    set requestedPage(value: number) {
        this._requestedPage = value;
    }
}

import {ResponseDTO} from '../response-dto';

export class ResultsPageResponseDTO {

    private _responses: Array<ResponseDTO>;
    private _totalPages: number;
    private _totalResponses: number;
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

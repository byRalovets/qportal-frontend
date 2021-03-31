import {ResponseDTO} from './response-dto';

export class ResponsePageDTO {

    pages: number;
    responses: Array<ResponseDTO>;

    constructor(pages: number, responses: Array<ResponseDTO>) {
        this.pages = pages;
        this.responses = responses;
    }
}

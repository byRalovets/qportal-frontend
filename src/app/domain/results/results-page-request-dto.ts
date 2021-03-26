export class ResultsPageRequestDTO {

    page: number;
    count: number;
    userIdentifier: string;

    constructor(page: number, count: number, userIdentifier: string) {
        this.page = page;
        this.count = count;
        this.userIdentifier = userIdentifier;
    }
}

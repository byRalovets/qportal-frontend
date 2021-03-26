import {ResponseParser} from './response-parser';
import {ResultsPageResponseDTO} from '../results-page-response-dto';

export class ResultsPageResponseParser {

    static parseResultsPageResponse(json: string): ResultsPageResponseDTO {
        const data = JSON.parse(json);
        return new ResultsPageResponseDTO(
            ResponseParser.parseFields(JSON.stringify(data.responses)),
            data.totalPages,
            data.totalResponses,
            data.requestedPage
        );
    }
}

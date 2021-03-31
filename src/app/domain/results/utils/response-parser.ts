import {ResponseDTO} from '../../response-dto';
import {AnswerParser} from '../../answer-parser';

export class ResponseParser {

    static parseFields(json: string): Array<ResponseDTO> {
        const data = JSON.parse(json);

        const responses: Array<ResponseDTO> = [];

        data.forEach((item: any) => {
            responses.push(new ResponseDTO(AnswerParser.parseAnswers(JSON.stringify(item.answers))));
        });

        return responses;
    }
}

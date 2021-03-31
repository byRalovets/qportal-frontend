import {FieldDto} from './field/field-dto';
import {FieldPageDTO} from './field-page-dto';

export class FieldPageParser {

    static parseFieldPage(json: string): FieldPageDTO {
        const data = JSON.parse(json);

        const fields: Array<FieldDto> = [];

        if (data.fields) {
            data.fields.forEach((item: any) => {
                const f = new FieldDto(item.id, item.label, item.type, item.isRequired, item.isActive, item.options.join('\n'));
                fields.push(f);
            });
        }

        return new FieldPageDTO(fields, data.totalPages, data.requestedPage);
    }
}

import {FieldDto} from '../field-dto';

export class FieldParser {

    static parseFields(json: string): Array<FieldDto> {
        const data = JSON.parse(json);

        const fields: Array<FieldDto> = [];

        data.forEach((item: any) => {
            const f = new FieldDto(item.id, item.label, item.type, item.isRequired, item.isActive, item.options.join('\n'));

            fields.push(f);
        });

        return fields;
    }

    static parseField(json: string): FieldDto {
        const data = JSON.parse(json);
        return new FieldDto(data.id, data.label, data.type, data.isRequired, data.isActive, data.options.join('\n'));
    }
}

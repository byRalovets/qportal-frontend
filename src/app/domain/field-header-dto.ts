export class FieldHeaderDTO {

    fieldId: number;
    label: string;

    constructor(fieldId: number, label: string) {
        this.fieldId = fieldId;
        this.label = label;
    }
}

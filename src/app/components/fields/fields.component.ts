import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {log} from 'util';
import {FieldsService} from '../../services/fields/fields.service';
import {FieldType} from '../../domain/field/util/field-type';
import {FieldDto} from '../../domain/field/field-dto';
import {Observable} from 'rxjs';
import {FieldParser} from '../../domain/field/util/fieldParser';
import {FieldPageDTO} from '../../domain/field-page-dto';
import {FieldPageParser} from '../../domain/field-page-parser';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-fields',
    templateUrl: './fields.component.html',
    styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

    currentPage = 1;
    ITEM_COUNT = 5;
    fields: Array<FieldDto> = [];

    totalPages = 0;

    id: any = null;
    label = '';
    type = FieldType.SINGLELINE;
    isRequired = false;
    isActive = true;
    options = '';
    selectedItemType = FieldType.SINGLELINE.toString();
    typeHasOptions = false;
    isItemSelected = false;

    constructor(private fieldsService: FieldsService, private token: TokenStorageService, private router: Router) {
    }

    ngOnInit(): void {
        if (!this.token.getToken()) {
          this.router.navigate(['']);
        }

        this.requestPage(1);
    }

    // Fields list event

    onDeleteClick(field: FieldDto): void {
        this.fieldsService.deleteField(field)
            .subscribe(() => this.requestPage(this.currentPage));
    }

    onEditClick(field: FieldDto): void {
        this.clearSelectedField();
        this.updateSelectedFieldType();
        this.id = field.id;
        this.label = field.label;
        this.isRequired = field.isRequired;
        this.isActive = field.isActive;
        const ops = field.options?.join('\n').trim();
        this.options = ops ? ops : '';
        this.type = field.type;
        this.selectedItemType = FieldType[field.type].toString();
        this.isItemSelected = true;
    }

    onAddClick(): void {
        this.clearSelectedField();
    }

    // Modal event

    onModalClose(): void {
        this.clearSelectedField();
    }

    onModalSubmit(): void {
        this.updateSelectedFieldType();

        if (this.isItemSelected) {
            this.updateSelectedFieldType();
            for (let i = 0; i < this.fields.length; i++) {
                if (this.fields[i].id === this.id) {
                    log(JSON.stringify(this.fields[i]));
                    this.fields[i].label = this.label;
                    this.fields[i].type = this.type;
                    this.fields[i].options = this.options.split(',');
                    this.fields[i].isRequired = this.isRequired;
                    this.fields[i].isActive = this.isActive;
                    this.fieldsService.updateField(this.fields[i]).subscribe(data => {
                        const field = FieldParser.parseField(data);
                        this.fields[i].id = field.id;
                    })
                }
            }
            this.isItemSelected = false;
        } else {
            const field = new FieldDto(
                null,
                this.label,
                this.type,
                this.isRequired,
                this.isActive,
                this.options
            );


            this.fieldsService.addField(JSON.stringify(field)).subscribe(data => {
               const field = FieldParser.parseField(data);

               if (this.fields.length < this.ITEM_COUNT) {
                   this.fields.push(field);
               } else {
                   this.fields = [field];
                   this.currentPage++;
                   this.totalPages++;
               }
            });
        }
        this.isItemSelected = false;
    }

    // Pagination

    requestPage(requestedPage: number) {
        this.fieldsService.getFields(requestedPage, this.ITEM_COUNT).subscribe(data => {
            const fieldsPage: FieldPageDTO = FieldPageParser.parseFieldPage(data);

            log('requestedPage: ' + fieldsPage.requestedPage);
            log('totalPages: ' + fieldsPage.totalPages);

            if (fieldsPage.totalPages === 0) {
                this.totalPages = 0;
                this.currentPage = 1;
                this.fields = [];
                return;
            }

            if (fieldsPage.requestedPage <= fieldsPage.totalPages) {
                this.fields = fieldsPage.fields;
                this.totalPages = fieldsPage.totalPages;
                this.currentPage = fieldsPage.requestedPage;
                return;
            }

            if (fieldsPage.requestedPage > fieldsPage.totalPages) {
                this.requestPage(fieldsPage.totalPages);
            }
        });
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

    // Utility functions

    updateSelectedFieldType(): void {
        this.type = FieldType[Number(this.selectedItemType)] as unknown as FieldType;
        this.typeHasOptions =
            (this.selectedItemType === FieldType.RADIOBUTTON.toString()
                || this.selectedItemType === FieldType.CHECKBOX.toString());
    }

    clearSelectedField() {
        this.selectedItemType = FieldType.SINGLELINE.toString();
        this.label = '';
        this.isRequired = false;
        this.isActive = true;
        this.options = '';
        this.type = FieldType.SINGLELINE;
        this.typeHasOptions = false;
        this.isItemSelected = false;
    }

}

import {IFormController} from 'angular';
import AbstractTemplateValueEditor from '../abstract/abstract-template-value-editor';
import {ValueEditorOptions, ValueEditorValidations} from '../kp-value-editor/kp-value-editor.component';

export abstract class AbstractMetaValueEditorComponentController<MODEL, OPTIONS extends ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> extends AbstractTemplateValueEditor<MODEL, OPTIONS, VALIDATIONS> {

    public form: IFormController;

    public trueIfUndefined(value): boolean {
        if (typeof value === 'undefined') {
            return true;
        }

        return value;
    }

    public showValidationError(fieldName: string): boolean {
        if (this.form[fieldName]) {
            const {$invalid, $touched = true} = this.form[fieldName];

            return $invalid && ($touched || this.options.forceShowErrors);
        }

        return false;
    }

    protected getTemplateModel(): {} {
        return {
            name: this.valueEditorController.editorName || 'DEFAULT'
        };
    }


}

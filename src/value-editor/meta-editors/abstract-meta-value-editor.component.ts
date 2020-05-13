import {IFormController} from 'angular';
import {OptionsChangeDetection} from '../common/abstract-value-editor';
import AbstractTemplateValueEditor from '../common/abstract-template-value-editor';
import {ValueEditorOptions} from '../kp-value-editor/kp-value-editor.component';

export abstract class AbstractMetaValueEditorComponentController<MODEL, OPTIONS extends ValueEditorOptions> extends AbstractTemplateValueEditor<MODEL, OPTIONS> {

    public form: IFormController;

    public trueIfUndefined(value): boolean {
        if (typeof value === 'undefined') {
            return true;
        }

        return value;
    }

    public showError(fieldName: string): boolean {
        if (this.form[fieldName]) {
            const {$invalid, $touched = true} = this.form[fieldName];

            return $invalid && $touched;
        }

        return false;
    }

    protected getTemplateModel(): {} {
        return {
            name: this.valueEditorController.editorName || 'DEFAULT'
        };
    }

    protected onOptionsChange(newOptions: OPTIONS, oldOptions: OPTIONS | undefined, optionsChangeDetection: OptionsChangeDetection<OPTIONS> | undefined) {
        //
    }
}

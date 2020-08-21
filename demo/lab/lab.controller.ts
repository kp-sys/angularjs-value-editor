import {TextValueEditorOptions} from '../../src/value-editor/editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../../src/value-editor/editors/text/text.value-editor.component';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model: string = undefined;

    public options = {
        prefix: 'http://',
        suffix: '.cz',
        includePrefixAndSuffixToModel: true,
        type: 'url'
    } as TextValueEditorOptions;

    public validations = {
        minlength: 12,
        maxlength: 20
    } as TextValueEditorValidations;
}

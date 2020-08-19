import {TextValueEditorOptions} from '../../src/value-editor/editors/text/text-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model: string = '';

    public options = {
        suffix: 'centrum.cz',
        includePrefixAndSuffixToModel: false,
        type: 'email'
    } as TextValueEditorOptions
}

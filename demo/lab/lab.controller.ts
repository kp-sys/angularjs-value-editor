import {TextValueEditorValidations} from '../../src/value-editor/editors/text/text.value-editor.component';
import {AcceptableRootValueEditorOptions} from '../../src/value-editor/editors/acceptable-root/acceptable-root-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = {id: '1'};

    public options = {
        optionsTemplate: '{{$node.text}}',
        acceptableValue: {
            text: '0',
            id: '0',
            children: [
                {
                    text: '1-1',
                    id: '1'
                },
                {   id: '2',
                    text: '1-2'
                }
            ]
        },
        equalityComparator: /*@ngInject*/ ($element1, $element2) => $element1?.id === $element2?.id
    } as AcceptableRootValueEditorOptions<any>;

    public validations = {
        minlength: 12,
        maxlength: 20
    } as TextValueEditorValidations;
}

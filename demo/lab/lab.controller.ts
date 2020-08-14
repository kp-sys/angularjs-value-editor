import {AcceptableValueEditorOptions} from '../../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../src/value-editor/common-directives/disable-ngAnimate.directive';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model: any = 'houvno';

    public options = {
        __forceDisableNgAnimate: true,
        acceptableValues: [{x: 'a'}, {x: 'b'}, {x: 'c'}, {x: 'd'}, {x: 'e'}, {x: 'f'}, {x: 'g'}, {x: 'h'}],
        optionsTemplate: '{{$item.x}}',
        switchToBlockModeThreshold: 10,
        allowSelectNull: true,
        modelAsArray: true
    } as AcceptableValueEditorOptions<{x: string}> & UndocumentedDisableNgAnimateValueEditorInternalOption
}

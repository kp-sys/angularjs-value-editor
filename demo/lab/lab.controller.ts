import {DateValueEditorOptions} from '../../src/value-editor/editors/date/date-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model: string = undefined;

    public options = {
        onlyDate: false,
        maximumGranularity: 'minute',
        viewFormat: 'd.L.y HH:mm'
    } as DateValueEditorOptions
}

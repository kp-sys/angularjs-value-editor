import {RangeValueEditorModel} from '../../src/value-editor/editors/range/range.value-editor.component';
import {RangeValueEditorOptions} from '../../src/value-editor/editors/range/range-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model: RangeValueEditorModel = {
        from: 1,
        to: 100
    };

    public options = {
        currentValueTemplate: `
             <input type="number" ng-model="$from" ng-change="$setFrom($from)" min="{{$options.min}}" max="{{$options.max}}">
             - 
             <input type="number" ng-model="$to" ng-change="$setTo($to)" min="{{$options.min}}" max="{{$options.max}}">
        `
    } as RangeValueEditorOptions
}

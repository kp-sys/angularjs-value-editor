import NgModelConnector from './ng-model-connector';
import {IOnInit, IPostLink, IScope} from 'angular';
import {EVENTS, ValueEditorComponentController, ValueEditorOptions} from '../value-editor.component';
import {DefaultOptions} from '../typings';
import angular = require('angular');

export interface OptionsChangeEventObject<OPTIONS extends ValueEditorOptions = ValueEditorOptions> {
    oldOptions: OPTIONS;
    newOptions: OPTIONS;
}

/**
 * Abstract base class for general value-editor features.
 */
export default abstract class AbstractValueEditor<MODEL, OPTIONS extends ValueEditorOptions> extends NgModelConnector<MODEL> implements IPostLink, IOnInit {
    private static $inject = ['$scope'];

    protected options: OPTIONS;
    protected valueEditorController: ValueEditorComponentController<MODEL, OPTIONS>;

    constructor(protected $scope: IScope, protected defaultOptions: DefaultOptions<OPTIONS>) {
        super();
        this.options = angular.merge({}, this.defaultOptions);
    }

    public $onInit(): void {
        super.$onInit();
        this.options = angular.merge({}, this.defaultOptions, this.valueEditorController.options);
    }

    public $postLink(): void {
        this.onOptionsChange(this.options, undefined);

        this.$scope.$on(EVENTS.options, (event, data: OptionsChangeEventObject) => {
            const newOptions = angular.merge({}, this.defaultOptions, data.newOptions);
            const oldOptions = angular.merge({}, this.defaultOptions, data.oldOptions);

            this.options = newOptions;
            this.onOptionsChange(newOptions, oldOptions);
        });
    }

    /**
     * This method is called always, when value editor options is changed with old and new options object merged with default options.
     * @param newOptions New options.
     * @param oldOptions Old options.
     */
    protected abstract onOptionsChange(newOptions: OPTIONS, oldOptions: OPTIONS);
}

import {INgModelController, IOnInit} from 'angular';

/**
 * Connects outer required ngModel with inner ngModel
 */
export default class NgModelConnector<MODEL = any> implements IOnInit {
    public ngModelController: INgModelController;
    protected modelValue: MODEL;

    public set model(value: MODEL) {
        this.modelValue = value;
        this.ngModelController.$setViewValue(this.modelValue);
    }

    public get model(): MODEL {
        return this.modelValue;
    }

    public $onInit(): void {
        this.ngModelController.$render = () => {
            this.modelValue = this.ngModelController.$viewValue;
        };
    }
}

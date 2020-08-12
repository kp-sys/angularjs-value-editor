import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {AcceptableValueEditorBindings} from './acceptable.value-editor.component';
import {AcceptableValueEditorOptions} from './acceptable-value-editor-configuration.provider';
import KpValueEditorConfigurationServiceProvider from '../../kp-value-editor/kp-value-editor-configuration-provider';
import * as ngAnimateModule from 'angular-animate';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common-directives/disable-ngAnimate.directive';
import UISelectController from '../../../../test/utils/ui-select-controller';

interface AcceptableValueEditorModel {
    value: string;
}

const ACCEPTABLE_VALUES: AcceptableValueEditorModel[] = [
    {value: 'a'},
    {value: 'b'},
    {value: 'c'},
    {value: 'd'},
    {value: 'e'},
    {value: 'f'},
    {value: 'g'},
    {value: 'h'}
];

class CheckboxesController {

    constructor(private element: HTMLDivElement) {
    }

    public selectNthOption(index: number): this {
        const options = this.element.querySelectorAll('[name^="acceptable_"]');

        if (!options || options.length === 0) {
            throw new Error('No options found');
        }

        if (!options[index]) {
            throw new Error(`Option number ${index} not found`);
        }

        (options[index] as HTMLInputElement).click();

        return this;
    }

    public getMultipleSelectedValuesAsTexts(): string[] {
        return Array.from(this.element.querySelectorAll<HTMLSpanElement>('[name^="acceptable_"]:checked + div label span'))
            .map((element) => element.textContent);
    }

    public getOptionsCount(): number {
        // -1 because validation helper also pass selector test
        return this.element.querySelectorAll<HTMLDivElement>('[name^="acceptable_"]').length - 1;
    }

    public getOptionsText(): string[] {
        return Array.from(this.element.querySelectorAll<HTMLDivElement>('[name^="acceptable_"] + div label span')).map((element) => element.textContent);
    }

    public clearSelection() {
        let item: HTMLInputElement;

        // tslint:disable-next-line:no-conditional-assignment
        while ((item = this.element.querySelector('[name^="acceptable_"]:checked')) !== null) {
            item.click();
        }
    }

}

describe('acceptable-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<AcceptableValueEditorBindings<AcceptableValueEditorModel>>;
    let $scope: ScopeWithBindings<AcceptableValueEditorModel | AcceptableValueEditorModel[], AcceptableValueEditorBindings<AcceptableValueEditorModel>>;
    let defaultOptions: AcceptableValueEditorOptions<AcceptableValueEditorModel>;

    describe('common', () => {
        beforeEach(() => {
            angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider) => {
                kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(true);
            });

            inject(/*@ngInject*/ ($compile, $rootScope, acceptableValueEditorDefaultOptions) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<AcceptableValueEditorBindings<AcceptableValueEditorModel>>($compile, $scope);
                defaultOptions = acceptableValueEditorDefaultOptions;
            });
        });

        function changeWholeOptions(newOptions: Partial<AcceptableValueEditorOptions<AcceptableValueEditorModel>>) {
            $scope.options = Object.assign<{}, AcceptableValueEditorOptions<AcceptableValueEditorModel>, Partial<AcceptableValueEditorOptions<AcceptableValueEditorModel>>>({}, defaultOptions, newOptions);
        }

        describe('single selectable', () => {

            it('should change model on input', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(4);

                expect($scope.model).toEqual({value: 'd'});
            });

            it('should change value if model is changed', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});

                $scope.model = {value: 'c'};
                $scope.$apply();

                const value = new UISelectController(valueEditorMocker.getInputElement<HTMLInputElement>()).getSingleSelectedValueAsText();

                expect(value).toBe('{"value":"c"}');
            });

            it('should change options if acceptableValues are changed', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});

                $scope.$apply();

                let count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                // + 1 for null selection
                expect(count).toBe(ACCEPTABLE_VALUES.length + 1);

                const newAcceptableValues = ACCEPTABLE_VALUES.slice(0, 6);
                $scope.options.acceptableValues = newAcceptableValues;
                $scope.$apply();

                count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                // + 1 for null selection
                expect(count).toBe(newAcceptableValues.length + 1);
            });

            it('should change options template', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});

                let option3 = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsText()[4];

                expect(option3).toBe('{"value":"d"}');

                $scope.options.optionsTemplate = '{{$item.value}}';
                $scope.$apply();

                option3 = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsText()[4];

                expect(option3).toBe('d');
            });

            it('should change singleSelectedValueTemplate', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});

                $scope.model = {value: 'c'};
                $scope.$apply();

                let selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getSingleSelectedValueAsText();

                expect(selectedValue).toBe('{"value":"c"}');

                $scope.options.singleSelectedValueTemplate = '{{$select.selected.value}}';
                $scope.$apply();

                selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getSingleSelectedValueAsText();

                expect(selectedValue).toBe('c');
            });

            it('should have working searchable option', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});

                let uiSelectController = new UISelectController(valueEditorMocker.getInputElement());

                let optionsCount = uiSelectController.openUiSelect().getOptionsCount();
                expect(optionsCount).toBe(ACCEPTABLE_VALUES.length + 1);

                optionsCount = uiSelectController.openUiSelect().setSearchPhrase('f').getOptionsCount();
                expect(optionsCount).toBe(1);

                $scope.options.searchable = false;
                $scope.$apply();
                uiSelectController = new UISelectController(valueEditorMocker.getInputElement());

                optionsCount = uiSelectController.openUiSelect().getOptionsCount();
                expect(optionsCount).toBe(ACCEPTABLE_VALUES.length + 1);

                optionsCount = uiSelectController.openUiSelect().setSearchPhrase('f').getOptionsCount();
                expect(optionsCount).toBe(ACCEPTABLE_VALUES.length + 1);
            });

            it('should have working required validation', () => {
                valueEditorMocker.create('acceptable', {
                    editorName: 'acceptable',
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES
                    },
                    validations: {
                        required: true
                    }
                });

                expect($scope.form.acceptable.$error).toEqual({required: true});

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(3);

                expect($scope.model).toEqual({value: 'd'});
                expect($scope.form.acceptable.$error).toEqual({});
            });

            it('should have null option if component is singleselect and not required', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});

                const count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                // + 1 for null selection
                expect(count).toBe(ACCEPTABLE_VALUES.length + 1);
            });

            it('should not has null option if component is singleselect and not required', () => {
                valueEditorMocker.create('acceptable', {
                    options: {acceptableValues: ACCEPTABLE_VALUES},
                    validations: {required: true}
                });

                const count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                expect(count).toBe(ACCEPTABLE_VALUES.length);
            });

            it('should select null', () => {
                valueEditorMocker.create('acceptable', {options: {acceptableValues: ACCEPTABLE_VALUES}});
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(4);

                expect($scope.model).toEqual({value: 'd'});

                controller.openAndSelectNthOption(0);

                expect($scope.model).toEqual(null);

            });

            it('should convert model to array if modeAsArray option is set to true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        modelAsArray: true
                    }
                });

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(4);

                expect($scope.model).toEqual([{value: 'd'}]);
            });

            it('should select value if model is array and modelAsArray is se to true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        modelAsArray: true
                    }
                });

                $scope.model = [{value: 'c'}];
                $scope.$apply();

                const value = new UISelectController(valueEditorMocker.getInputElement<HTMLInputElement>()).getSingleSelectedValueAsText();

                expect(value).toBe('{"value":"c"}');
            });
        });

        describe('multi selectable ui-select', () => {

            it('should change model on input', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true
                    }
                });
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(3);

                expect($scope.model).toEqual([{value: 'd'}]);
            });

            it('should change value if model is changed', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true
                    }
                });

                $scope.model = [{value: 'c'}];
                $scope.$apply();

                const value = new UISelectController(valueEditorMocker.getInputElement<HTMLInputElement>()).getMultipleSelectedValuesAsTexts();

                expect(value).toEqual(['{"value":"c"}']);
            });

            it('should change options if acceptableValues are changed', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true
                    }
                });

                $scope.$apply();

                let count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                expect(count).toBe(ACCEPTABLE_VALUES.length);

                const newAcceptableValues = ACCEPTABLE_VALUES.slice(0, 6);
                $scope.options.acceptableValues = newAcceptableValues;
                $scope.$apply();

                count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                expect(count).toBe(newAcceptableValues.length);
            });

            it('should change options template', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true
                    }
                });

                let option3 = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsText()[3];

                expect(option3).toBe('{"value":"d"}');

                $scope.options.optionsTemplate = '{{$item.value}}';
                $scope.$apply();

                option3 = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsText()[3];

                expect(option3).toBe('d');
            });

            it('should change multiSelectedValueTemplate', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true
                    }
                });

                $scope.model = [{value: 'c'}, {value: 'a'}];
                $scope.$apply();

                let selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getMultipleSelectedValuesAsTexts();

                expect(selectedValue).toEqual(['{"value":"c"}', '{"value":"a"}']);

                $scope.options.multiSelectedValueTemplate = '{{$item.value}}';
                $scope.$apply();

                selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getMultipleSelectedValuesAsTexts();

                expect(selectedValue).toEqual(['c', 'a']);
            });

            it('should have working searchable option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true
                    }
                });

                let uiSelectController = new UISelectController(valueEditorMocker.getInputElement());

                let optionsCount = uiSelectController.openUiSelect().getOptionsCount();
                expect(optionsCount).toBe(ACCEPTABLE_VALUES.length);

                optionsCount = uiSelectController.openUiSelect().setSearchPhrase('f').getOptionsCount();
                expect(optionsCount).toBe(1);

                $scope.options.searchable = false;
                $scope.$apply();
                uiSelectController = new UISelectController(valueEditorMocker.getInputElement());

                optionsCount = uiSelectController.openUiSelect().getOptionsCount();
                expect(optionsCount).toBe(ACCEPTABLE_VALUES.length);

                optionsCount = uiSelectController.openUiSelect().setSearchPhrase('f').getOptionsCount();
                expect(optionsCount).toBe(ACCEPTABLE_VALUES.length);
            });

            it('should have working custom sorting', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        sortComparator: (e1, e2) => e1.value.localeCompare(e2.value) * -1
                    }
                });

                let option3 = new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(3).getMultipleSelectedValuesAsTexts();
                expect(option3).toEqual(['{"value":"e"}']);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES,
                        sortComparator: undefined
                    });
                    $scope.model = [];
                });

                option3 = new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(3).getMultipleSelectedValuesAsTexts();
                expect(option3).toEqual(['{"value":"d"}']);
            });

            it('should have working custom model sorting', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true
                    }
                }, true);

                new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'a'}, {value: 'e'}, {value: 'c'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES,
                        sortComparator: (e1, e2) => e1.value.localeCompare(e2.value) * -1
                    });
                    $scope.model = [];
                });

                new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'h'}, {value: 'd'}, {value: 'f'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES,
                        sortComparator: (e1, e2) => e1.value.localeCompare(e2.value) * -1,
                        sortModel: true
                    });
                    $scope.model = [];
                });

                new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'h'}, {value: 'f'}, {value: 'd'}]);
            });

            it('should have working required validation', () => {
                valueEditorMocker.create('acceptable', {
                    editorName: 'multiacceptable',
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES
                    },
                    validations: {
                        required: true
                    }
                });

                expect($scope.form.multiacceptable.$error).toEqual({required: true});

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(3);

                expect($scope.model).toEqual({value: 'd'});
                expect($scope.form.multiacceptable.$error).toEqual({});
            });

            it('should not throws exception if model is empty and sortModel is set to true', () => {
                expect(() => {
                    valueEditorMocker.create('acceptable', {
                        options: {
                            acceptableValues: ACCEPTABLE_VALUES,
                            multiselectable: true,
                            sortModel: true
                        }
                    });
                }).not.toThrow();

            });

            it('should convert model to array if modeAsArray option is set to true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        modelAsArray: true,
                        multiselectable: true
                    }
                });

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(4);
                // 4 because selected options disappears from list
                controller.selectNthOption(4);

                expect($scope.model).toEqual([{value: 'e'}, {value: 'f'}]);
            });

            it('should select value if model is array and modelAsArray is se to true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        modelAsArray: true,
                        multiselectable: true
                    }
                });

                $scope.model = [{value: 'c'}, {value: 'd'}];
                $scope.$apply();

                const value = new UISelectController(valueEditorMocker.getInputElement<HTMLInputElement>()).getMultipleSelectedValuesAsTexts();

                expect(value).toEqual(['{"value":"c"}', '{"value":"d"}']);
            });

            it('should have working emptyAsNull option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        emptyAsNull: true
                    }
                }, true);

                $scope.model = [{value: 'c'}];
                $scope.$apply();

                const uiSelectController = new UISelectController(valueEditorMocker.getInputElement<HTMLInputElement>());

                expect(uiSelectController.getMultipleSelectedValuesAsTexts()).toEqual(['{"value":"c"}']);

                uiSelectController.clearMultiselect();

                expect($scope.model).toBeNull();
            });


        });

        describe('multi selectable checkboxes', () => {

            it('should switch to checkboxes', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true
                    }
                });

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                expect(uiSelect.classList.contains('ui-select-bootstrap')).toBe(true);

                $scope.options.switchToCheckboxesThreshold = 5;
                $scope.$apply();

                const checkboxes = valueEditorMocker.getInputElement<HTMLElement>();
                expect(checkboxes.classList.contains('checkboxes-mode')).toBe(true);
            });

            it('should change model on input', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    }
                });

                const controller = new CheckboxesController(valueEditorMocker.getInputElement<HTMLDivElement>());

                controller.selectNthOption(3);

                expect($scope.model).toEqual([{value: 'd'}]);
            });

            it('should change value if model is changed', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    }
                });

                $scope.model = [{value: 'c'}];
                $scope.$apply();

                const value = new CheckboxesController(valueEditorMocker.getInputElement<HTMLDivElement>()).getMultipleSelectedValuesAsTexts();

                expect(value).toEqual(['{"value":"c"}']);
            });

            it('should change options if acceptableValues are changed', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    }
                });

                $scope.$apply();

                let count = new CheckboxesController(valueEditorMocker.getInputElement()).getOptionsCount();

                expect(count).toBe(ACCEPTABLE_VALUES.length);

                const newAcceptableValues = ACCEPTABLE_VALUES.slice(0, 6);
                $scope.options.acceptableValues = newAcceptableValues;
                $scope.$apply();

                count = new CheckboxesController(valueEditorMocker.getInputElement()).getOptionsCount();

                expect(count).toBe(newAcceptableValues.length);
            });

            it('should change options template', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    }
                });

                let option3 = new CheckboxesController(valueEditorMocker.getInputElement()).getOptionsText()[3];

                expect(option3).toBe('{"value":"d"}');

                $scope.options.optionsTemplate = '{{$item.value}}';
                $scope.$apply();

                option3 = new CheckboxesController(valueEditorMocker.getInputElement()).getOptionsText()[3];

                expect(option3).toBe('d');
            });

            it('should have working custom sorting', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5,
                        sortComparator: (e1, e2) => e1.value.localeCompare(e2.value) * -1
                    }
                });

                let option3 = new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(3).getMultipleSelectedValuesAsTexts();
                expect(option3).toEqual(['{"value":"e"}']);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        switchToCheckboxesThreshold: 5,
                        sortComparator: undefined
                    });
                    $scope.model = [];
                });

                option3 = new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(3).getMultipleSelectedValuesAsTexts();
                expect(option3).toEqual(['{"value":"d"}']);
            });

            it('should have working custom model sorting', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    }
                });

                new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'a'}, {value: 'd'}, {value: 'b'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        switchToCheckboxesThreshold: 5,
                        sortComparator: (e1, e2) => e1.value.localeCompare(e2.value) * -1
                    });
                    $scope.model = [];
                });

                new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'h'}, {value: 'e'}, {value: 'g'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        switchToCheckboxesThreshold: 5,
                        sortComparator: (e1, e2) => e1.value.localeCompare(e2.value) * -1,
                        sortModel: true
                    });
                    $scope.model = [];
                });

                new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'h'}, {value: 'g'}, {value: 'e'}]);
            });

            it('should have working showFirstCount option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    }
                });

                let checkboxesUl = valueEditorMocker.getInputElement<HTMLDivElement>().querySelectorAll('ul > li.av-item');
                let hasMoreContainer = valueEditorMocker.getInputElement<HTMLDivElement>().querySelector('.more-container') !== null;
                expect(checkboxesUl.length).toBe(8);
                expect(hasMoreContainer).toBe(false);

                $scope.options.showFirstCount = 5;
                $scope.$apply();

                checkboxesUl = valueEditorMocker.getInputElement<HTMLDivElement>().querySelectorAll('ul[ng-ref] > li.av-item');
                hasMoreContainer = valueEditorMocker.getInputElement<HTMLDivElement>().querySelector('.more-container') !== null;
                const moreContainerItemsCount = valueEditorMocker.getInputElement<HTMLDivElement>().querySelectorAll('ul .more-container li.av-item').length;
                expect(checkboxesUl.length).toBe(5);
                expect(hasMoreContainer).toBe(true);
                expect(moreContainerItemsCount).toBe(3);
            });

            it('should have working selectedFirst option', () => {
                $scope.model = [{value: 'b'}, {value: 'e'}, {value: 'g'}];

                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5,
                        sortComparator: undefined
                    }
                });

                let options = new CheckboxesController(valueEditorMocker.getInputElement()).getOptionsText();
                expect(options).toEqual(['{"value":"a"}', '{"value":"b"}', '{"value":"c"}', '{"value":"d"}', '{"value":"e"}', '{"value":"f"}', '{"value":"g"}', '{"value":"h"}']);

                $scope.$apply(() => changeWholeOptions({
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5,
                        selectedFirst: true,
                        sortComparator: undefined
                    })
                );

                options = new CheckboxesController(valueEditorMocker.getInputElement()).getOptionsText();
                expect(options).toEqual(['{"value":"b"}', '{"value":"e"}', '{"value":"g"}', '{"value":"a"}', '{"value":"c"}', '{"value":"d"}', '{"value":"f"}', '{"value":"h"}']);
            });

            it('should have working select all and deselect all buttons', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    }
                });

                valueEditorMocker.getInputElement().querySelector<HTMLButtonElement>('.btn-group .select-all').click();
                expect($scope.model).toEqual(ACCEPTABLE_VALUES);

                valueEditorMocker.getInputElement().querySelector<HTMLButtonElement>('.btn-group .deselect-all').click();
                expect($scope.model).toEqual([]);
            });

            it('should have working required validation', () => {
                valueEditorMocker.create('acceptable', {
                    editorName: 'acceptable',
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5
                    },
                    validations: {
                        required: true
                    }
                });

                expect($scope.form.acceptable.$error).toEqual({required: true});

                const controller = new CheckboxesController(valueEditorMocker.getInputElement<HTMLDivElement>());

                controller.selectNthOption(3);

                expect($scope.model).toEqual([{value: 'd'}]);
                expect($scope.form.acceptable.$error).toEqual({});
            });

            it('should have working emptyAsNull option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        switchToCheckboxesThreshold: 5,
                        emptyAsNull: true
                    }
                }, true);

                $scope.model = [{value: 'c'}];
                $scope.$apply();

                const checkboxesController = new CheckboxesController(valueEditorMocker.getInputElement<HTMLInputElement>());

                expect(checkboxesController.getMultipleSelectedValuesAsTexts()).toEqual(['{"value":"c"}']);

                checkboxesController.clearSelection();

                expect($scope.model).toBeNull();
            });
        });
    });

    describe('interaction with ngAnimate', () => {

        it('should pull down options if ngAnimate is disabled for this element', () => {

            // set classNameFilter
            angular.mock.module(ngAnimateModule, /*@ngInject*/ ($animateProvider: angular.animate.IAnimateProvider) => {
                $animateProvider.classNameFilter(/ng-animate-enabled/);
            });

            angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider) => {
                kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(true);
            });

            // tslint:disable-next-line:variable-name
            let $_timeout: ITimeoutService;

            inject(/*@ngInject*/ ($compile, $rootScope, acceptableValueEditorDefaultOptions, $timeout: ITimeoutService) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<AcceptableValueEditorBindings<AcceptableValueEditorModel>>($compile, $scope);
                defaultOptions = acceptableValueEditorDefaultOptions;
                $_timeout = $timeout;
            });

            valueEditorMocker.create('acceptable', {
                options: {
                    acceptableValues: ACCEPTABLE_VALUES,
                    // enable bug workaround
                    __forceDisableNgAnimate: true
                } as AcceptableValueEditorOptions<any> & UndocumentedDisableNgAnimateValueEditorInternalOption
            });

            const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
            const controller = new UISelectController(uiSelect);

            controller.openUiSelect();

            // noinspection JSUnusedAssignment
            $_timeout.flush();

            let opacity = uiSelect.querySelector<HTMLDivElement>('.ui-select-choices').style.opacity;

            // items should be visible
            expect(opacity).toBe('1');

            // close select
            controller.selectNthOption(1);

            // disable bug workaround
            ($scope.options as unknown as UndocumentedDisableNgAnimateValueEditorInternalOption).__forceDisableNgAnimate = false;

            controller.openUiSelect();

            opacity = uiSelect.querySelector<HTMLDivElement>('.ui-select-choices').style.opacity;

            // items should be hidden -> buggy behaviour
            expect(opacity).toBe('0');
        });
    });

    // TODO: Add some localizations and placeholder tests
});

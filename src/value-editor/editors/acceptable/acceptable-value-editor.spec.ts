import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {IFlushPendingTasksService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {AcceptableValueEditorBindings} from './acceptable.value-editor.component';
import {AcceptableValueEditorOptions} from './acceptable-value-editor-configuration.provider';
import KpValueEditorConfigurationServiceProvider from '../../kp-value-editor/kp-value-editor-configuration-provider';
import * as ngAnimateModule from 'angular-animate';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common/directives/disable-ngAnimate.directive';
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
        return Array.from(this.element.querySelectorAll<HTMLSpanElement>('input[name^="acceptable_"]:checked'))
            .map((element: HTMLInputElement) => element.parentElement.nextElementSibling)
            .map((element) => element.textContent);
    }

    public getOptionsCount(): number {
        // -1 because validation helper also pass selector test
        return this.element.querySelectorAll<HTMLDivElement>('input[name^="acceptable_"]').length - 1;
    }

    public getOptionsText(): string[] {
        return Array.from(this.element.querySelectorAll<HTMLDivElement>('input[name^="acceptable_"]:not(.validation-helper)'))
            .map((element: HTMLInputElement) => element.parentElement.nextSibling)
            .map((element) => element.textContent);
    }

    public clearSelection() {
        let item: HTMLInputElement;

        // tslint:disable-next-line:no-conditional-assignment
        while ((item = this.element.querySelector('input[name^="acceptable_"]:checked')) !== null) {
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

        describe('single selectable inline', () => {

            it('should change model on input', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5
                    }
                });
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(3);

                expect($scope.model).toEqual({value: 'd'});
            });

            it('should change value if model changed', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5
                    }
                });

                $scope.model = {value: 'c'};
                $scope.$apply();

                const value = new UISelectController(valueEditorMocker.getInputElement<HTMLInputElement>()).getSingleSelectedValueAsText();

                expect(value).toBe('{"value":"c"}');
            });

            it('should change options if acceptableValues are changed', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5
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
                        switchToInlineModeThreshold: 5
                    }
                });

                let option3 = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsText()[3];

                expect(option3).toBe('{"value":"d"}');

                $scope.options.optionsTemplate = '{{$item.value}}';
                $scope.$apply();

                option3 = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsText()[3];

                expect(option3).toBe('d');
            });

            it('should change singleSelectedValueTemplate', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5
                    }
                });

                $scope.model = {value: 'c'};
                $scope.$apply();

                let selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getSingleSelectedValueAsText();

                expect(selectedValue).toBe('{"value":"c"}');

                $scope.options.optionsTemplate = '{{$item.value}}';
                $scope.$apply();

                selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getSingleSelectedValueAsText();

                expect(selectedValue).toBe('c');
            });

            it('should have working searchable option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5
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

            it('should have working required validation', () => {
                valueEditorMocker.create('acceptable', {
                    editorName: 'acceptable',
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5
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

            it('should have null option if allowSelectNull is true and not required', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5,
                        allowSelectNull: true
                    }
                });

                const count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                // + 1 for null selection
                expect(count).toBe(ACCEPTABLE_VALUES.length + 1);
            });

            it('should not has null option if component is singleselect and not required', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5
                    },
                    validations: {
                        required: true
                    }
                });

                const count = new UISelectController(valueEditorMocker.getInputElement()).openUiSelect().getOptionsCount();

                expect(count).toBe(ACCEPTABLE_VALUES.length);
            });

            it('should select null', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5,
                        allowSelectNull: true
                    }
                });

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
                        switchToInlineModeThreshold: 5,
                        modelAsArray: true
                    }
                });

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(3);

                expect($scope.model).toEqual([{value: 'd'}]);
            });

            it('should select value if model is array and modelAsArray is se to true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5,
                        modelAsArray: true
                    }
                });

                $scope.model = [{value: 'c'}];
                $scope.$apply();

                const value = new UISelectController(valueEditorMocker.getInputElement<HTMLInputElement>()).getSingleSelectedValueAsText();

                expect(value).toBe('{"value":"c"}');
            });

            it('model should be empty array if allowSelectNull: true, moderAsArray: true and empty option selected', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5,
                        allowSelectNull: true,
                        modelAsArray: true
                    }
                });

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openAndSelectNthOption(0);

                expect($scope.model).toEqual([]);
            });

            it('should have working disabling single option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 5,
                        disabledItemsResolver: /*@ngInject*/ ($item: AcceptableValueEditorModel) => $item.value === 'b'
                    }
                });
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openUiSelect();

                const hasDisabledClass = uiSelect.querySelectorAll('.ui-select-choices-row')[1].classList.contains('disabled');

                expect(hasDisabledClass).toBeTrue();
            });
        });

        describe('single selectable block', () => {

            function getButton(index: number): HTMLButtonElement {
                return valueEditorMocker.getInputElement<HTMLDivElement>().querySelectorAll<HTMLButtonElement>('button')[index];
            }

            it('should change model on input', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0
                    }
                });

                getButton(2).click();

                expect($scope.model).toEqual({value: 'c'});
            });

            it('should change value if model is changed', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0
                    }
                });

                $scope.model = {value: 'b'};
                $scope.$apply();

                const classList = getButton(1).classList;

                expect(classList).toContain('active');
            });

            it('should change options template', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0
                    }
                });

                let option3 = getButton(2).textContent;

                expect(option3).toBe('{"value":"c"}');

                $scope.options.optionsTemplate = '{{$item.value}}';
                $scope.$apply();

                option3 = getButton(2).textContent;

                expect(option3).toBe('c');
            });

            it('should have working required validation', () => {
                valueEditorMocker.create('acceptable', {
                    editorName: 'acceptable',
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0
                    },
                    validations: {
                        required: true
                    }
                });

                expect($scope.form.acceptable.$error).toEqual({required: true});

                getButton(0).click();

                expect($scope.form.acceptable.$error).toEqual({});
            });

            it('should select null = unselect options', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0,
                        allowSelectNull: true
                    }
                });

                getButton(2).click();

                expect($scope.model).toEqual({value: 'c'});

                getButton(2).click();

                expect($scope.model).toBeNull();
            });

            it('should not deselect options is validation required is true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0,
                        allowSelectNull: true
                    },
                    validations: {
                        required: true
                    }
                });

                getButton(2).click();

                expect($scope.model).toEqual({value: 'c'});

                getButton(2).click();

                expect($scope.model).toEqual({value: 'c'});
            });

            it('should convert model to array if modeAsArray option set to true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        modelAsArray: true,
                        switchToInlineModeThreshold: 0
                    }
                });

                getButton(2).click();
                valueEditorMocker.triggerHandlerOnInput('input');

                expect($scope.model).toEqual([{value: 'c'}]);
            });

            it('should select value if model is array and modelAsArray is se to true', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        modelAsArray: true, switchToInlineModeThreshold: 0
                    }
                });

                $scope.model = [{value: 'b'}];
                $scope.$apply();

                const classList = getButton(1).classList;

                expect(classList).toContain('active');
            });

            it('model should be empty array if allowSelectNull: true, moderAsArray: true and empty option selected', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0,
                        allowSelectNull: true,
                        modelAsArray: true
                    }
                });

                getButton(2).click();
                getButton(2).click();

                expect($scope.model).toEqual([]);
            });

            it('should have working disabling single option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 0,
                        disabledItemsResolver: /*@ngInject*/ ($item: AcceptableValueEditorModel) => $item.value === 'b'
                    }
                });
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();

                const hasDisabledClass = uiSelect.querySelector('.list-group-item:nth-child(2)').classList.contains('disabled');

                expect(hasDisabledClass).toBeTrue();
            });

        });

        describe('multi selectable ui-select', () => {

            it('should change model on input', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
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
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
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
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
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
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
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
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
                    }
                });

                $scope.model = [{value: 'c'}, {value: 'a'}];
                $scope.$apply();

                let selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getMultipleSelectedValuesAsTexts();

                expect(selectedValue).toEqual(['{"value":"c"}', '{"value":"a"}']);

                $scope.options.optionsTemplate = '{{$item.value}}';
                $scope.$apply();

                selectedValue = new UISelectController(valueEditorMocker.getInputElement()).getMultipleSelectedValuesAsTexts();

                expect(selectedValue).toEqual(['c', 'a']);
            });

            it('should have working searchable option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
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
                        switchToInlineModeThreshold: 1,
                        sortComparator: /*@ngInject*/ ($element1, $element2) => $element1.value.localeCompare($element2.value) * -1
                    }
                });

                let option3 = new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(3).getMultipleSelectedValuesAsTexts();
                expect(option3).toEqual(['{"value":"e"}']);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        switchToInlineModeThreshold: 1,
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
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
                    }
                });

                new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'a'}, {value: 'e'}, {value: 'c'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        switchToInlineModeThreshold: 1,
                        acceptableValues: ACCEPTABLE_VALUES,
                        sortComparator: /*@ngInject*/ ($element1, $element2) => $element1.value.localeCompare($element2.value) * -1
                    });
                    $scope.model = [];
                });

                new UISelectController(valueEditorMocker.getInputElement()).openAndSelectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'h'}, {value: 'd'}, {value: 'f'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 1,
                        sortComparator: /*@ngInject*/ ($element1, $element2) => $element1.value.localeCompare($element2.value) * -1,
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
                        acceptableValues: ACCEPTABLE_VALUES,
                        switchToInlineModeThreshold: 1
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
                            switchToInlineModeThreshold: 1,
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
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
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
                        multiselectable: true,
                        switchToInlineModeThreshold: 1
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
                        switchToInlineModeThreshold: 1,
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

            it('should have working disabling single option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        switchToInlineModeThreshold: 5,
                        disabledItemsResolver: /*@ngInject*/ ($item: AcceptableValueEditorModel) => $item.value === 'b'
                    }
                });
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                const controller = new UISelectController(uiSelect);

                controller.openUiSelect();

                const hasDisabledClass = uiSelect.querySelectorAll('.ui-select-choices-row')[1].classList.contains('disabled');

                expect(hasDisabledClass).toBeTrue();
            });

        });

        describe('multi selectable checkboxes', () => {

            it('should switch to inline mode', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true
                    }
                });

                const checkboxes = valueEditorMocker.getInputElement<HTMLElement>();
                expect(checkboxes.classList.contains('checkboxes-mode')).toBe(true);

                $scope.options.switchToInlineModeThreshold = 5;
                $scope.$apply();

                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
                expect(uiSelect.classList.contains('ui-select-bootstrap')).toBe(true);
            });

            it('should change model on input', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        multiselectable: true
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
                        multiselectable: true
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
                        multiselectable: true
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
                        multiselectable: true
                    }
                }, true);

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
                        sortComparator: /*@ngInject*/ ($element1, $element2) => $element1.value.localeCompare($element2.value) * -1
                    }
                });

                let option3 = new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(3).getMultipleSelectedValuesAsTexts();
                expect(option3).toEqual(['{"value":"e"}']);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
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
                        multiselectable: true
                    }
                });

                new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'a'}, {value: 'd'}, {value: 'b'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        sortComparator: /*@ngInject*/ ($element1, $element2) => $element1.value.localeCompare($element2.value) * -1
                    });
                    $scope.model = [];
                });

                new CheckboxesController(valueEditorMocker.getInputElement()).selectNthOption(0).selectNthOption(3).selectNthOption(1);
                expect($scope.model).toEqual([{value: 'h'}, {value: 'e'}, {value: 'g'}]);

                $scope.$apply(() => {
                    changeWholeOptions({
                        multiselectable: true,
                        acceptableValues: ACCEPTABLE_VALUES.slice(),
                        sortComparator: /*@ngInject*/ ($element1, $element2) => $element1.value.localeCompare($element2.value) * -1,
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
                        multiselectable: true
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
                        sortComparator: undefined
                    }
                });

                let options = new CheckboxesController(valueEditorMocker.getInputElement()).getOptionsText();
                expect(options).toEqual(['{"value":"a"}', '{"value":"b"}', '{"value":"c"}', '{"value":"d"}', '{"value":"e"}', '{"value":"f"}', '{"value":"g"}', '{"value":"h"}']);

                $scope.$apply(() => changeWholeOptions({
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
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
                        multiselectable: true
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
                        multiselectable: true
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

            it('should have working disabling single option', () => {
                valueEditorMocker.create('acceptable', {
                    options: {
                        acceptableValues: ACCEPTABLE_VALUES,
                        multiselectable: true,
                        switchToInlineModeThreshold: 0,
                        disabledItemsResolver: /*@ngInject*/ ($item: AcceptableValueEditorModel) => $item.value === 'b'
                    }
                });
                const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();

                const hasDisabledClass = uiSelect.querySelector<HTMLInputElement>('.av-item:nth-child(2) .pretty input').disabled;

                expect(hasDisabledClass).toBeTrue();
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

            let ngFlushPendingTasks: IFlushPendingTasksService;

            inject(/*@ngInject*/ ($compile, $rootScope, acceptableValueEditorDefaultOptions, $flushPendingTasks) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<AcceptableValueEditorBindings<AcceptableValueEditorModel>>($compile, $scope);
                defaultOptions = acceptableValueEditorDefaultOptions;
                ngFlushPendingTasks = $flushPendingTasks;
            });

            valueEditorMocker.create('acceptable', {
                options: {
                    acceptableValues: ACCEPTABLE_VALUES,
                    switchToInlineModeThreshold: 1,
                    // enable bug workaround
                    __forceDisableNgAnimate: true
                } as AcceptableValueEditorOptions<any> & UndocumentedDisableNgAnimateValueEditorInternalOption
            });

            const uiSelect = valueEditorMocker.getInputElement<HTMLElement>();
            const controller = new UISelectController(uiSelect);

            controller.openUiSelect();

            // noinspection JSUnusedAssignment
            ngFlushPendingTasks();

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
});

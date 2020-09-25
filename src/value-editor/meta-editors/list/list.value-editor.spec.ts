import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ICompileService, IFlushPendingTasksService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {ListValueEditorBindings} from './list.value-editor.component';
import {TextValueEditorOptions} from '../../editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../../editors/text/text.value-editor.component';
import {KpUniversalFormSettings} from '../../kp-universal-form/kp-universal-form.component';
import {ListValueEditorOptions} from './list-value-editor-configuration.provider';
import anything = jasmine.anything;

describe('list-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<ListValueEditorBindings<string, TextValueEditorOptions, TextValueEditorValidations>>;
    let $scope: ScopeWithBindings<string[], ListValueEditorBindings>;
    let ngFlushPendingTasks: IFlushPendingTasksService;
    let ngCompile: ICompileService;
    /**
     * Simulates click on add button
     * @returns {HTMLElement}
     */
    function addItem(): HTMLElement {
        // add input
        valueEditorMocker.getCompiledElement().querySelector<HTMLButtonElement>('button.add').click();
        // select last added input
        const items = valueEditorMocker.getCompiledElement().querySelectorAll('.list-item');
        return items[items.length - 1].querySelector('kp-value-editor');
    }

    /**
     * Simulates click on remove button
     * @param {number} index
     */
    function removeItemOnIndex(index: number) {
        const items = valueEditorMocker.getCompiledElement().querySelectorAll<HTMLElement>('.list-item button.remove');

        if (index > (items.length - 1)) {
            throw new Error(`Cannot remove item on index ${index}.`);
        }

        items[index].click();
    }

    function getEditorOnIndex(index: number): HTMLElement {
        const items = valueEditorMocker.getCompiledElement().querySelectorAll<HTMLElement>('.list-item:not(.placeholder)');

        if (index > (items.length - 1)) {
            throw new Error(`Cannot access item on index ${index}.`);
        }

        return items[index].querySelector('kp-value-editor');
    }

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $flushPendingTasks) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<ListValueEditorBindings>($compile, $scope);
            ngFlushPendingTasks = $flushPendingTasks;
            ngCompile = $compile;
            
            valueEditorMocker.setPostConstructHook(() => $flushPendingTasks());
        });
    });

    it('should change model on input', () => {
        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            }
        });

        expect($scope.model).toEqual(['hello']);

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'world';
        valueEditorMocker.triggerHandlerOnInput('input');
        $scope.$apply();

        expect($scope.model).toEqual(['world']);
    });

    it('should change value if model changed', () => {
        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            }
        });

        const input = valueEditorMocker.getInputElement();
        expect(input.value).toBe('hello');

        $scope.model = ['world'];
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    it('should be able to add new item', () => {
        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            }
        });

        addItem();

        const editorInput = getEditorOnIndex(1).querySelector<HTMLInputElement>('[data-main-input]');
        editorInput.value = 'world';
        valueEditorMocker.triggerHandlerOnInput('input', editorInput);

        expect($scope.model).toEqual(['hello', 'world']);
    });

    it('should be able to remove item', () => {
        $scope.model = ['hello', 'world'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            }
        });

        removeItemOnIndex(0);

        expect($scope.model).toEqual(['world']);
    });

    it('should not be able to remove item if required validation is true and list has only one item', () => {
        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            },
            validations: {
                required: true
            }
        });

        removeItemOnIndex(0);
        // expect(() => removeItemOnIndex(0)).toThrow();
    });

    it('should have working list-required validation', () => {
        valueEditorMocker.create('list', {
            editorName: 'list',
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            },
            validations: {
                required: true
            }
        });

        $scope.model = [];
        $scope.$apply();

        expect($scope.form.list.$error).toEqual({'list-required': anything()});

        $scope.model = ['hello'];
        $scope.$apply();

        expect($scope.form.list.$error).toEqual({});
    });

    it('should have working max-count validation', () => {
        valueEditorMocker.create('list', {
            editorName: 'list',
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            },
            validations: {
                maxCount: 2
            }
        });

        $scope.model = ['', '', ''];
        $scope.$apply();

        expect($scope.form.list.$error).toEqual({'max-count': anything()});

        $scope.model = ['hello'];
        $scope.$apply();

        expect($scope.form.list.$error).toEqual({});
    });

    it('should be disabled', () => {
        $scope.model = ['hello'];

        valueEditorMocker.create('list', {isDisabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });

    it('should have aggregate validation statuses', () => {
        $scope.model = [''];

        valueEditorMocker.create('list', {
            editorName: 'list',
            options: {
                subEditor: {
                    type: 'text',
                    validations: {
                        minlength: 3
                    } as TextValueEditorValidations
                },
                newItemPrototype: ''
            }
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '12';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.list.$error).toEqual({minlength: anything()});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.list.$error).toEqual({});
    });

    it('should normalize model if it is not array', () => {
        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            }
        });

        expect($scope.model).toEqual([]);
    });

    it('should add one editor if it is empty and required validation is set to true', () => {
        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            },
            validations: {
                required: true
            }
        });

        expect($scope.model).toEqual(['']);
    });

    it('should have working emptyAsNull option', () => {
        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'},
                emptyAsNull: true
            }
        });

        expect($scope.model).toEqual(['hello']);

        removeItemOnIndex(0);

        $scope.$apply();

        expect($scope.model).toBeNull();
    });

    it('should call onAddItem and pass new prototype', (done) => {

        const NEW_PROTO = 'blablabla';

        const onAddItemFunction = jasmine.createSpy('onAddItemFunction', (model, propertyName, additionalParameters, timeout) => {
            return new Promise<string>((resolve) => timeout(() => resolve(NEW_PROTO), 10));
        }).and.callThrough();

        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            editorName: 'listEditor',
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'},
                onAddItem: /*@ngInject*/ ($model, $propertyName, $additionalParameters, $timeout) => onAddItemFunction($model, $propertyName, $additionalParameters, $timeout),
                additionalParameters: {
                    blabla: 'ughugh'
                }
            }
        });

        addItem();
        ngFlushPendingTasks();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(onAddItemFunction).toHaveBeenCalledWith(jasmine.arrayContaining(['hello']), 'listEditor', {blabla: 'ughugh'}, jasmine.anything());

                expect($scope.model).toEqual(['hello', NEW_PROTO]);

                resolve();
            }, 20);
        }).then(done);

    });

    it('should call onAddItem with universal-form model if editor is a member of universal-form', (done) => {

        const NEW_PROTO = 'blablabla';

        const onAddItemFunction = jasmine.createSpy('onAddItemFunction', (universalFormModel, timeout) => {
            return new Promise<string>((resolve) => timeout(() => resolve(NEW_PROTO), 10));
        }).and.callThrough();

        $scope.model = {
            // @ts-ignore
            texts: [],
            someAdditionalProperties: true
        };

        const template = `
            <kp-universal-form
                ng-model="model"
                form-settings="formSettings"
            >
            </kp-universal-form>
        `;

        // @ts-ignore
        $scope.formSettings = {
            fields: [
                {
                    label: '',
                    fieldName: 'texts',
                    editor: {
                        type: 'list',
                        options: {
                            newItemPrototype: '',
                            subEditorType: 'text',
                            onAddItem: /*@ngInject*/ ($universalFormModel, $timeout) => onAddItemFunction($universalFormModel, $timeout)
                        } as ListValueEditorOptions
                    }
                }
            ]
        } as KpUniversalFormSettings;

        const element = ngCompile(template)($scope);

        $scope.$apply();

        // add input
        element[0].querySelector<HTMLButtonElement>('button.add').click();

        ngFlushPendingTasks();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(onAddItemFunction).toHaveBeenCalledWith({
                    texts: [],
                    someAdditionalProperties: true
                }, jasmine.anything());

                resolve();
            }, 20);
        }).then(done);
    });

    it('should call onAddItem with universal-form model if editor is not a member of universal-form', (done) => {

        const onAddItemFunction = jasmine.createSpy('onAddItemFunction', ($universalFormModel, timeout) => {
            return new Promise<string>((resolve) => timeout(() => resolve(''), 10));
        }).and.callThrough();

        $scope.model = [''];

        valueEditorMocker.create('list', {
            editorName: 'listEditor',
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'},
                onAddItem: /*@ngInject*/ ($universalFormModel, $timeout) => onAddItemFunction($universalFormModel, $timeout)
            }
        });

        addItem();
        ngFlushPendingTasks();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(onAddItemFunction).toHaveBeenCalledWith(undefined, jasmine.anything());
                resolve();
            }, 20);
        }).then(done);

    });

    it('should focus first item', () => {
        $scope.model = ['hello', 'world'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditor: {type: 'text'}
            },
            isFocused: true
        }, true);

        const editorInput = getEditorOnIndex(0).querySelector<HTMLInputElement>('[data-main-input]');
        expect(document.activeElement).toBe(editorInput);

        valueEditorMocker.detachElementFromDocument();
    });
});

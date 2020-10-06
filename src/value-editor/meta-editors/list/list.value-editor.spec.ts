import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {ListValueEditorBindings} from './list.value-editor.component';
import {TextValueEditorOptions} from '../../editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../../editors/text/text.value-editor.component';
import anything = jasmine.anything;

describe('list-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<ListValueEditorBindings<string, TextValueEditorOptions, TextValueEditorValidations>>;
    let $scope: ScopeWithBindings<string[], ListValueEditorBindings>;
    // tslint:disable-next-line:variable-name
    let $_timeout: ITimeoutService;

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
        const items = valueEditorMocker.getCompiledElement().querySelectorAll<HTMLElement>('.list-item');

        if (index > (items.length - 1)) {
            throw new Error(`Cannot access item on index ${index}.`);
        }

        return items[index].querySelector('kp-value-editor');
    }

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $timeout: ITimeoutService) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<ListValueEditorBindings>($compile, $scope);
            $_timeout = $timeout;

            valueEditorMocker.setPostConstructHook(() => $timeout.flush());
        });
    });

    it('should change model on input', () => {
        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditorType: 'text'
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
                subEditorType: 'text'
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
                subEditorType: 'text'
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
                subEditorType: 'text'
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
                subEditorType: 'text'
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
                subEditorType: 'text'
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
                subEditorType: 'text'
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
                subEditorType: 'text',
                newItemPrototype: '',
                subEditorValidations: {
                    minlength: 3
                }
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
                subEditorType: 'text'
            }
        });

        expect($scope.model).toEqual([]);
    });

    it('should add one editor if it is empty and required validation is set to true', () => {
        valueEditorMocker.create('list', {
            options: {
                newItemPrototype: '',
                subEditorType: 'text'
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
                subEditorType: 'text',
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

        const onAddItemFunction = jasmine.createSpy('onAddItemFunction', (model, propertyName, timeout) => {
            return new Promise<string>((resolve) => timeout(() => resolve(NEW_PROTO), 10));
        }).and.callThrough();

        $scope.model = ['hello'];

        valueEditorMocker.create('list', {
            editorName: 'listEditor',
            options: {
                newItemPrototype: '',
                subEditorType: 'text',
                onAddItem: /*@ngInject*/ ($model, $propertyName, $timeout) => onAddItemFunction($model, $propertyName, $timeout)
            }
        });

        addItem();
        $_timeout.flush();

        new Promise((resolve) => {
            setTimeout(() => {
                expect(onAddItemFunction).toHaveBeenCalledWith(jasmine.arrayContaining(['hello']), 'listEditor', jasmine.anything());

                expect($scope.model).toEqual(['hello', NEW_PROTO]);

                resolve();
            }, 20);
        }).then(done);

    });

});

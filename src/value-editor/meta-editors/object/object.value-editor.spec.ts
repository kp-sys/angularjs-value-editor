import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {ObjectValueEditorBindings} from './object.value-editor.component';
import {
    ObjectValueEditorField,
    ObjectValueEditorOptions,
    UndocumentedObjectValueEditorInternalOptions
} from './object-value-editor-configuration.provider';
import {ListValueEditorOptions} from '../list/list-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../../editors/text/text.value-editor.component';
import {NumberValueEditorValidations} from '../../editors/number/number.value-editor.component';
import objectContaining = jasmine.objectContaining;
import anything = jasmine.anything;

const FIELDS: ObjectValueEditorField[] = [
    {
        label: 'Text',
        fieldName: 'text',
        editor: {
            type: 'text',
            editorName: 'texttext'
        }
    },
    {
        label: 'Number',
        fieldName: 'number',
        editor: {
            type: 'number',
        }
    },
    {
        label: 'Data',
        fieldName: 'dates',
        editor: {
            type: 'list',
            options: {
                subEditorType: 'date',
                newItemPrototype: ''
            } as ListValueEditorOptions
        }
    }
];

type MockModel = {
    text?: string,
    number?: number,
    dates?: string[]
};

describe('object-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<ObjectValueEditorBindings>;
    let $scope: ScopeWithBindings<MockModel, ObjectValueEditorBindings>;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $timeout: ITimeoutService) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<ObjectValueEditorBindings>($compile, $scope);

            valueEditorMocker.setPostConstructHook(() => $timeout.flush());
        });
    });

    it('should change model on input', () => {
        $scope.model = {
            number: 10
        };

        valueEditorMocker.create('object', {
            options: {
                fields: FIELDS
            }
        });

        expect($scope.model).toEqual({number: 10, dates: []});

        valueEditorMocker.getInputElement<HTMLInputElement>('number-value-editor').value = '20';
        valueEditorMocker.triggerHandlerOnInput('input', valueEditorMocker.getInputElement<HTMLInputElement>('number-value-editor'));
        $scope.$apply();

        expect($scope.model).toEqual(objectContaining({number: 20, dates: []}));
    });

    it('should change value if model is changed', () => {
        $scope.model = {
            text: 'Hello',
            number: 20,
            dates: ['']
        };

        valueEditorMocker.create('object', {
            options: {
                fields: FIELDS
            }
        });

        const input = valueEditorMocker.getInputElement('text-value-editor');
        expect(input.value).toBe('Hello');

        $scope.model = {
            number: 15,
            text: 'world'
        };
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    it('should be disabled', () => {
        $scope.model = {};

        valueEditorMocker.create('object', {
            isDisabled: false, options: {
                fields: FIELDS
            }
        });

        let inputs = [valueEditorMocker.getInputElement('text-value-editor').disabled, valueEditorMocker.getInputElement('number-value-editor').disabled];

        expect(inputs).toEqual([false, false]);

        $scope.isDisabled = true;
        $scope.$apply();

        inputs = [valueEditorMocker.getInputElement('text-value-editor').disabled, valueEditorMocker.getInputElement('number-value-editor').disabled];
        expect(inputs).toEqual([true, true]);
    });

    it('should have working attributes transformation', () => {
        $scope.model = {};

        const editedFields = angular.copy(FIELDS);
        editedFields[1].editor.editorName = 'number';

        valueEditorMocker.create('object', {
            isDisabled: false, options: {
                fields: editedFields,
                attributesTransformation: (attrs) => {
                    attrs.editorId = attrs.editorName;

                    return attrs;
                }
            }
        });

        const inputIds = [valueEditorMocker.getInputElement('text-value-editor').id, valueEditorMocker.getInputElement('number-value-editor').id];

        expect(inputIds).toEqual([editedFields[0].editor.editorName, editedFields[1].editor.editorName]);
    });

    it('should aggregate validation status', () => {
        $scope.model = {
            text: '',
            number: 20,
            dates: ['']
        };

        const modifiedFields = FIELDS.slice();

        modifiedFields[0].editor.validations = {required: true} as TextValueEditorValidations;
        modifiedFields[1].editor.validations = {min: 50} as NumberValueEditorValidations;

        valueEditorMocker.create('object', {
            editorName: 'object',
            options: {
                fields: modifiedFields
            }
        });

        expect($scope.form.object.$error).toEqual({
            required: anything(),
            min: anything()
        });

        $scope.model = {
            text: 'world',
            number: 55
        };
        $scope.$apply();

        expect($scope.form.object.$error).toEqual({});
    });

    it('should not render ng-form wrapper', () => {
        const element = valueEditorMocker.create('object', {
            editorName: 'object',
            options: {
                fields: FIELDS,
                __withoutNgForm: true
            } as ObjectValueEditorOptions & UndocumentedObjectValueEditorInternalOptions
        });

        expect(element.querySelector('fieldset[ng-form]')).toBe(null);
    });

    it('should have working editorName generation base on fieldName', () => {
        $scope.model = {
            number: 10
        };

        const valueEditorElement = valueEditorMocker.create('object', {
            options: {
                fields: FIELDS
            }
        });

        expect($scope.model).toEqual({number: 10, dates: []});

        const textValueEditorName = valueEditorMocker.getInputElement<HTMLInputElement>('text-value-editor').name;
        const numberValueEditorName = valueEditorMocker.getInputElement<HTMLInputElement>('number-value-editor').name;
        const listValueEditorName = valueEditorElement.querySelector<HTMLDivElement>('list-value-editor [ng-form]').attributes.getNamedItem('ng-form').value;

        expect(textValueEditorName).toBe('texttext');
        expect(numberValueEditorName).toBe('number');
        expect(listValueEditorName).toBe('dates');
    });
});

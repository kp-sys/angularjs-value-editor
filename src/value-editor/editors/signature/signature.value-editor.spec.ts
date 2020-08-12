import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {SignatureValueEditorBindings} from './signature.value-editor.component';
import objectContaining = jasmine.objectContaining;

const ITEMS = Object.freeze([
    'one',
    'two',
    'three',
    'four'
]);

describe('signature-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<SignatureValueEditorBindings>;
    let $scope: ScopeWithBindings<string, SignatureValueEditorBindings>;
    let _$timeout: ITimeoutService;
    let dataSourceSpy;
    let annotatedDataSourceSpy;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $timeout) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<SignatureValueEditorBindings>($compile, $scope);
            _$timeout = $timeout;
        });

        dataSourceSpy = jasmine.createSpy('dataSource').and.returnValue(Promise.resolve(ITEMS));
        annotatedDataSourceSpy = ['$model', '$name', '$formModel', dataSourceSpy];
    });

    it('should change model on input', () => {
        valueEditorMocker.create('signature');

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual('hello');
    });

    it('should change value if model is changed', () => {
        $scope.model = 'hello';

        valueEditorMocker.create('signature');

        const input = valueEditorMocker.getInputElement();
        expect(input.value).toBe('hello');

        $scope.model = 'world';
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    it('should have working required validation', () => {
        valueEditorMocker.create('signature', {
            editorName: 'signature',
            validations: {required: true}
        });

        $scope.$apply();

        expect($scope.form.signature.$error).toEqual({required: true});

        $scope.model = 'hello';
        $scope.$apply();

        expect($scope.form.signature.$error).toEqual({});
    });

    it('should be disabled', () => {
        valueEditorMocker.create('signature', {isDisabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });

    it('should have working required validation', () => {
        valueEditorMocker.create('signature', {editorName: 'signature', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.signature.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.signature.$error).toEqual({});
    });

    it('should have working minlength validation', () => {
        valueEditorMocker.create('signature', {editorName: 'signature', validations: {minlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'h';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.signature.$error).toEqual({minlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.signature.$error).toEqual({});
    });

    it('should have working maxlength validation', () => {
        valueEditorMocker.create('signature', {editorName: 'signature', validations: {maxlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.signature.$error).toEqual({maxlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hel';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.signature.$error).toEqual({});
    });

    it('should have working pattern validation', () => {
        valueEditorMocker.create('signature', {editorName: 'signature', validations: {pattern: '[0-9]*'}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.signature.$error).toEqual({pattern: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '1234';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.signature.$error).toEqual({});
    });

    it('should load values if canDoAction is true', (done) => {
        const MODEL = 'value';

        $scope.model = MODEL;
        $scope.$apply();

        valueEditorMocker.create('signature', {editorName: 'signature', options: {canDoAction: true, dataSource: annotatedDataSourceSpy}});

        _$timeout.flush();

        expect(dataSourceSpy).toHaveBeenCalledWith(MODEL, 'signature', objectContaining({signature: MODEL}));

        done();
    });

    it('should have working emptyAsNull option', () => {
        valueEditorMocker.create('signature', {options: {emptyAsNull: true}});

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual('hello');

        valueEditorMocker.getInputElement().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBeNull();
    });

});

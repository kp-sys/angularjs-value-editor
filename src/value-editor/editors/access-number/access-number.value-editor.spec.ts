import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {AccessNumberValueEditorBindings} from './access-number.value-editor.component';
import objectContaining = jasmine.objectContaining;

const ITEMS = Object.freeze([
    'one',
    'two',
    'three',
    'four'
]);

describe('access-number-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<AccessNumberValueEditorBindings>;
    let $scope: ScopeWithBindings<string, AccessNumberValueEditorBindings>;
    let _$timeout: ITimeoutService;
    let dataSourceSpy;
    let annotatedDataSourceSpy;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $timeout) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<AccessNumberValueEditorBindings>($compile, $scope);
            _$timeout = $timeout;
        });

        dataSourceSpy = jasmine.createSpy('dataSource').and.returnValue(Promise.resolve(ITEMS));
        annotatedDataSourceSpy = ['$model', '$name', '$formModel', dataSourceSpy];
    });

    it('should change model on input', () => {
        valueEditorMocker.create('access-number');

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual('hello');
    });

    it('should change value if model is changed', () => {
        $scope.model = 'hello';

        valueEditorMocker.create('access-number');

        const input = valueEditorMocker.getInputElement();
        expect(input.value).toBe('hello');

        $scope.model = 'world';
        $scope.$apply();

        expect(input.value).toBe('world');
    });

    it('should have working required validation', () => {
        valueEditorMocker.create('access-number', {
            editorName: 'accessNumber',
            validations: {required: true}
        });

        $scope.$apply();

        expect($scope.form.accessNumber.$error).toEqual({required: true});

        $scope.model = 'hello';
        $scope.$apply();

        expect($scope.form.accessNumber.$error).toEqual({});
    });

    it('should be disabled', () => {
        valueEditorMocker.create('access-number', {isDisabled: false});
        const input = valueEditorMocker.getInputElement<HTMLInputElement>();

        expect(input.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        expect(input.disabled).toBe(true);
    });

    it('should have working required validation', () => {
        valueEditorMocker.create('access-number', {editorName: 'accessNumber', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.accessNumber.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.accessNumber.$error).toEqual({});
    });

    it('should have not required validation if form contains `issue` field', () => {
        valueEditorMocker.setCustomTemplate(`
            <input type="text" name="issue" ng-model="issue">
        `);
        // @ts-ignore
        $scope.issue = 'issue';

        valueEditorMocker.create('access-number', {editorName: 'accessNumber', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.accessNumber.$error).toEqual({});
    });

    it('should have working minlength validation', () => {
        valueEditorMocker.create('access-number', {editorName: 'accessNumber', validations: {minlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'h';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.accessNumber.$error).toEqual({minlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.accessNumber.$error).toEqual({});
    });

    it('should have working maxlength validation', () => {
        valueEditorMocker.create('access-number', {editorName: 'accessNumber', validations: {maxlength: 3}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.accessNumber.$error).toEqual({maxlength: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hel';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.accessNumber.$error).toEqual({});
    });

    it('should have working pattern validation', () => {
        valueEditorMocker.create('access-number', {editorName: 'accessNumber', validations: {pattern: '[0-9]*'}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.accessNumber.$error).toEqual({pattern: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '1234';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.accessNumber.$error).toEqual({});
    });

    it('should load values if canDoAction is true', (done) => {
        const MODEL = 'value';

        $scope.model = MODEL;
        $scope.$apply();

        valueEditorMocker.create('access-number', {editorName: 'accessNumber', options: {canDoAction: true, dataSource: annotatedDataSourceSpy}});

        _$timeout.flush();

        expect(dataSourceSpy).toHaveBeenCalledWith(MODEL, 'accessNumber', objectContaining({accessNumber: MODEL}));

        done();
    });

    it('should have working emptyAsNull option', () => {
        valueEditorMocker.create('access-number', {options: {emptyAsNull: true}});

        valueEditorMocker.getInputElement().value = 'hello';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual('hello');

        valueEditorMocker.getInputElement().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBeNull();

    });
});

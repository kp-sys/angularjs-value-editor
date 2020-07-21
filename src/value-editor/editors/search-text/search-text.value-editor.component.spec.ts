import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import ValueEditorMocker, {NgChangeBindings, ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {
    SearchTextValueEditorBindings,
    SearchTextValueEditorModel,
    SearchTextValueEditorModelExtension
} from './search-text.value-editor.component';
import * as ngAnimateModule from 'angular-animate';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../common-directives/disable-ngAnimate.directive';
import {SearchTextValueEditorOptions} from './search-text-value-editor-configuration.provider';
import UISelectController from '../../../../test/utils/ui-select-controller';
import {patchAngularElementToReturnInjector} from '../../../../test/utils/test-utils';

const TEST_MODEL: SearchTextValueEditorModel = {
    extension: SearchTextValueEditorModelExtension.EQUALS,
    row: 'hello'
};

describe('search-text-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<SearchTextValueEditorBindings & NgChangeBindings>;
    let $scope: ScopeWithBindings<SearchTextValueEditorModel, SearchTextValueEditorBindings & NgChangeBindings>;

    function selectItemFromMenu(itemName: string) {
        valueEditorMocker.getInputElement().parentElement.querySelector<HTMLSpanElement>('.ui-select-toggle').click();
        Array.from(valueEditorMocker.getInputElement().parentElement.querySelectorAll<HTMLSpanElement>('.ui-select-choices-row-inner'))
            .filter((element) => element.textContent === itemName)[0].click();
    }

    describe('common usage', () => {
        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope, $injector) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<SearchTextValueEditorBindings>($compile, $scope);
                patchAngularElementToReturnInjector($injector);
            });
        });

        it('should has working model normalization', () => {
            valueEditorMocker.create('search-text');

            expect($scope.model).toEqual({extension: SearchTextValueEditorModelExtension.STARTS_WITH, row: ''});
        });

        it('should change model on input', () => {
            valueEditorMocker.create('search-text');
            valueEditorMocker.getInputElement<HTMLInputElement>().value = TEST_MODEL.row;
            valueEditorMocker.triggerHandlerOnInput('input');

            selectItemFromMenu('Equals');

            $scope.$apply();

            expect($scope.model).toEqual(TEST_MODEL);
        });

        it('should change value if model is changed', () => {
            valueEditorMocker.create('search-text');

            $scope.model = TEST_MODEL;
            $scope.$apply();

            const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

            expect(inputValue).toBe(TEST_MODEL.row);
        });

        it('should has working required validation', () => {
            valueEditorMocker.create('search-text', {editorName: 'search-text', validations: {required: true}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form['search-text'].$error).toEqual({required: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '123';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form['search-text'].$error).toEqual({});
        });

        it('should has working minlength validation', () => {
            valueEditorMocker.create('search-text', {editorName: 'searchText', validations: {minlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'h';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.searchText.$error).toEqual({minlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.searchText.$error).toEqual({});
        });

        it('should has working maxlength validation', () => {
            valueEditorMocker.create('search-text', {editorName: 'searchText', validations: {maxlength: 3}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.searchText.$error).toEqual({maxlength: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hel';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.searchText.$error).toEqual({});
        });

        it('should has working pattern validation', () => {
            valueEditorMocker.create('search-text', {editorName: 'searchText', validations: {pattern: '[0-9]*'}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            $scope.$apply();

            expect($scope.form.searchText.$error).toEqual({pattern: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '1234';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.form.searchText.$error).toEqual({});
        });

        it('should has working input disabling', () => {
            valueEditorMocker.create('search-text', {editorName: 'searchText', isDisabled: true});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = 'hello';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
            expect(valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLSpanElement>('.ui-select-toggle').attributes.getNamedItem('disabled').value).toBe('disabled');
        });

        it('should cooperate with ngChange', () => {
            const ngChangeSpy = jasmine.createSpy('ngChangeSpy');

            valueEditorMocker.create('search-text', {
                'ngChange()': ngChangeSpy
            });

            valueEditorMocker.getInputElement<HTMLInputElement>().value = TEST_MODEL.row;
            selectItemFromMenu('Equals');

            $scope.$apply();

            expect(ngChangeSpy).toHaveBeenCalled();
        });

        it('should has working emptyAsNull option', () => {
            valueEditorMocker.create('search-text', {options: {emptyAsNull: true}});

            valueEditorMocker.getInputElement<HTMLInputElement>().value = TEST_MODEL.row;
            valueEditorMocker.triggerHandlerOnInput('input');

            selectItemFromMenu('Equals');

            $scope.$apply();

            expect($scope.model).toEqual(TEST_MODEL);

            valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
            valueEditorMocker.triggerHandlerOnInput('input');

            expect($scope.model).toBeNull();

            selectItemFromMenu('Starts with');

            expect($scope.model).toBeNull();
        });

    });

    describe('interaction with ngAnimate', () => {

        it('should pull down options if ngAnimate is disabled for this element', () => {

            // set classNameFilter
            angular.mock.module(ngAnimateModule, /*@ngInject*/ ($animateProvider: angular.animate.IAnimateProvider) => {
                $animateProvider.classNameFilter(/ng-animate-enabled/);
            });

            angular.mock.module(valueEditorModule);

            // tslint:disable-next-line:variable-name
            let $_timeout: ITimeoutService;

            inject(/*@ngInject*/ ($compile, $rootScope, $timeout: ITimeoutService) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<SearchTextValueEditorBindings>($compile, $scope);
                $_timeout = $timeout;
            });

            valueEditorMocker.create('search-text', {
                options: {
                    // enable bug workaround
                    __forceDisableNgAnimate: true
                } as SearchTextValueEditorOptions & UndocumentedDisableNgAnimateValueEditorInternalOption
            });

            const uiSelect = valueEditorMocker.getInputElement<HTMLElement>().parentElement.querySelector<HTMLDivElement>('.ui-select-container');
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
});

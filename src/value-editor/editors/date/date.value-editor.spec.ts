/* tslint:disable:variable-name */
import * as angular from 'angular';
import {IDocumentService} from 'angular';
import {DateTime, FixedOffsetZone, Settings} from 'luxon';
import valueEditorModule from '../../value-editor.module';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {DateValueEditorBindings} from './date.value-editor.component';

Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;
Settings.defaultZoneName = FixedOffsetZone.utcInstance.name;

function isVisible(element: HTMLElement): boolean {
    return (element.style ? element.style.display !== 'none' : true) && (element.parentNode ? isVisible(element.parentNode as HTMLElement) : true);
}

function getUibDropdownMenuElement(inputElement: HTMLElement): HTMLElement {
    return angular.element(inputElement.parentNode).controller('uibDropdown').dropdownMenu[0];
}

function openDateTimePicker(inputElement: HTMLInputElement): HTMLElement {
    inputElement.parentElement.querySelector<HTMLElement>('[uib-dropdown-toggle]').click();

    const datetimepickerElement = getUibDropdownMenuElement(inputElement).querySelector<HTMLElement>('datetimepicker');

    if (isVisible(datetimepickerElement)) {
        return datetimepickerElement;
    }

    throw new Error('DateTimePicker is not visible');
}

// TODO: Write some more test, for example: Test for some settings options and for min/max validations.

describe('date-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<DateValueEditorBindings>;
    let $scope: ScopeWithBindings<string, DateValueEditorBindings>;
    let $_document: IDocumentService;

    beforeEach(() => {
        angular.mock.module(valueEditorModule);

        inject(/*@ngInject*/ ($compile, $rootScope, $document) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<DateValueEditorBindings>($compile, $scope);
            $_document = $document;
        });
    });

    it('should render value editor', () => {
        const element = valueEditorMocker.create('date');
        angular.element($_document[0].body).append(element);

        $scope.$apply();
    });

    it('should change model on input', () => {
        valueEditorMocker.create('date');
        valueEditorMocker.getInputElement<HTMLInputElement>().value = '22.2.2022';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe('2022-02-22T00:00:00.000Z');
    });

    it('should change value if model is changed', () => {
        valueEditorMocker.create('date');

        $scope.model = '2020-02-22T00:00:00.000Z';
        $scope.$apply();

        const inputValue = valueEditorMocker.getInputElement<HTMLInputElement>().value;

        expect(inputValue).toBe('22.2.2020');
    });

    it('should have working required validation', () => {
        valueEditorMocker.create('date', {editorName: 'date', validations: {required: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        $scope.$apply();

        expect($scope.form.date.$error).toEqual({required: true});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '22.2.2022';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.form.date.$error).toEqual({});
    });

    it('should have working input disabling', () => {
        valueEditorMocker.create('date', {isDisabled: true}, true);

        const inputElement = valueEditorMocker.getInputElement<HTMLInputElement>();

        inputElement.value = '123';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect(valueEditorMocker.getInputElement<HTMLInputElement>().disabled).toBe(true);
        expect(() => openDateTimePicker(inputElement)).toThrowError('DateTimePicker is not visible');
    });

    it('should have working emptyAsNull option', () => {
        valueEditorMocker.create('date', {options: {emptyAsNull: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '22.2.2022';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe('2022-02-22T00:00:00.000Z');

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBeNull();
    });

    it('should have working onlyDate option', () => {
        valueEditorMocker.create('date', {options: {onlyDate: true}});

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '22.2.2022';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBe('2022-02-22');

        valueEditorMocker.getInputElement<HTMLInputElement>().value = '';
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toBeNull();
    });

});

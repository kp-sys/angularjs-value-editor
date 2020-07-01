import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {Identified, IndexSelectionValueEditorBindings} from './index-selection.value-editor.component';
import KpValueEditorConfigurationServiceProvider from '../../kp-value-editor/kp-value-editor-configuration-provider';

const ITEMS: Array<Identified<number>> = [
    {
        id: 1,
        text: 'jedna'
    },
    {
        id: 2,
        text: 'dva'
    },
    {
        id: 3,
        text: 'tri'
    },
    {
        id: 4,
        text: 'styri'
    }
];

describe('index-selection-value-editor', () => {

    let valueEditorMocker: ValueEditorMocker<IndexSelectionValueEditorBindings<any, Identified>>;
    let $scope: ScopeWithBindings<number, IndexSelectionValueEditorBindings<any, Identified>>;

    function getButton(index: number): HTMLButtonElement {
        return valueEditorMocker.getInputElement<HTMLDivElement>().querySelectorAll<HTMLButtonElement>('button')[index];
    }

    beforeEach(() => {
        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider) => {
            kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(true);
        });

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<IndexSelectionValueEditorBindings<any, Identified>>($compile, $scope);
        });
    });

    it('should change model on input', () => {
        valueEditorMocker.create('index-selection', {options: {items: ITEMS}});
        getButton(2).click();
        valueEditorMocker.triggerHandlerOnInput('input');

        expect($scope.model).toEqual(3);
    });

    it('should change value if model is changed', () => {
        $scope.model = 2;

        valueEditorMocker.create('index-selection', {options: {items: ITEMS}});

        $scope.$apply();

        const classList = getButton(1).classList;

        expect(classList).toContain('active');
    });

    it('should has working required validation', () => {
        valueEditorMocker.create('index-selection', {options: {items: ITEMS}, editorName: 'idx', validations: {required: true}});

        $scope.$apply();

        expect($scope.form.idx.$error).toEqual({required: true});

        getButton(0).click();

        expect($scope.form.idx.$error).toEqual({});
    });

    it('should change options template', () => {
        valueEditorMocker.create('index-selection', {options: {items: ITEMS}});

        let option3 = getButton(2).textContent;

        expect(option3).toBe('{"id":3,"text":"tri"}');

        $scope.options.optionsTemplate = '{{$item.text}}';
        $scope.$apply();

        option3 = getButton(2).textContent;

        expect(option3).toBe('tri');
    });

    it('should reach on equalityComparator change', () => {
        // @ts-ignore
        $scope.model = 'tri';

        valueEditorMocker.create('index-selection', {options: {items: ITEMS}});

        let buttonTri = getButton(2);

        expect(buttonTri.classList).not.toContain('active');

        $scope.options.equalityComparator = (model, value) => model === value.text;
        $scope.$apply();

        buttonTri = getButton(2);
        expect(buttonTri.classList).toContain('active');
    });

    it('should be disabled', () => {
        valueEditorMocker.create('index-selection', {options: {items: ITEMS}, isDisabled: false});

        let buttonTri = getButton(2);

        expect(buttonTri.disabled).toBe(false);

        $scope.isDisabled = true;
        $scope.$apply();

        buttonTri = getButton(2);
        expect(buttonTri.disabled).toBe(true);
    });
});

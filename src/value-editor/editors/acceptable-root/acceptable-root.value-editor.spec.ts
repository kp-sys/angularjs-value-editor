import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {AcceptableRootValueEditorBindings, arrayEquals} from './acceptable-root.value-editor.component';

describe('acceptable-root-value-editor', () => {

    describe('utils', () => {

        it('should have working array comparing function', () => {
            expect(arrayEquals([1, 2], [1, 2])).toBeTrue();
            expect(arrayEquals([1], [1, 2])).toBeFalse();
            expect(arrayEquals([1, 2], [1])).toBeFalse();
            expect(arrayEquals([1, 2], [2, 3])).toBeFalse();

            const compareFunction = (e1, e2) => e1.a === e2.a;

            expect(arrayEquals([{a: 1}, {a: 2}], [{a: 1}, {a: 2}], compareFunction)).toBeTrue();
            expect(arrayEquals([{a: 1}], [{a: 1}, {a: 2}], compareFunction)).toBeFalse();
            expect(arrayEquals([{a: 1}, {a: 2}], [{a: 1}], compareFunction)).toBeFalse();
            expect(arrayEquals([{a: 1}, {a: 2}], [{a: 2}, {a: 3}], compareFunction)).toBeFalse();
        });
    });

    describe('component', () => {
        let valueEditorMocker: ValueEditorMocker<AcceptableRootValueEditorBindings<any>>;
        let $scope: ScopeWithBindings<{}, AcceptableRootValueEditorBindings<any>>;

        beforeEach(() => {
            angular.mock.module(valueEditorModule);

            inject(/*@ngInject*/ ($compile, $rootScope) => {
                $scope = $rootScope.$new();
                valueEditorMocker = new ValueEditorMocker<AcceptableRootValueEditorBindings<any>>($compile, $scope);
            });
        });

        it('should render component', () => {
            valueEditorMocker.create('acceptable-root');

            expect(valueEditorMocker.getInputElement()).not.toBeNull();
        });
    });

});

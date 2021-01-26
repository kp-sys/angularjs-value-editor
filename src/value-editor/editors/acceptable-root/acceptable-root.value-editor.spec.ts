import valueEditorModule from '../../value-editor.module';
import * as angular from 'angular';
import ValueEditorMocker, {ScopeWithBindings} from '../../../../test/utils/value-editor-mocker';
import {AcceptableRootValueEditorBindings, arrayEquals, Childrenable} from './acceptable-root.value-editor.component';


interface TreeItem extends Childrenable<TreeItem> {
    text: string;
    value: number;
}

const tree: TreeItem = {
    text: '0',
    value: 0,
    children: [
        {
            text: '0-0',
            value: 1
        },
        {
            text: '0-1',
            value: 2,
            children: [
                {
                    text: '0-1-0',
                    value: 3
                },
                {
                    text: '0-1-1',
                    value: 4
                }
            ]
        },
        {
            text: '0-2',
            value: 5
        }
    ]
};


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
        let valueEditorMocker: ValueEditorMocker<AcceptableRootValueEditorBindings<TreeItem>>;
        let $scope: ScopeWithBindings<TreeItem | TreeItem[], AcceptableRootValueEditorBindings<TreeItem>>;

        function getCheckbox(root: Element, ...indexes: number[]): HTMLInputElement {
            const checkbox = root.querySelector<HTMLInputElement>(`input[data-subtree-index="${indexes[0]}"]`);

            if (indexes.length > 1) {
                const itemElement = checkbox.closest<HTMLElement>('.item');
                let treeitemElement = itemElement.nextElementSibling;

                if (treeitemElement == null) {
                    itemElement.querySelector<HTMLDivElement>('.switcher').click();
                    $scope.$apply();

                    treeitemElement = itemElement.nextElementSibling;
                }

                return getCheckbox(treeitemElement, ...indexes.slice(1));
            }

            return checkbox;
        }


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

        it('should have working input disabling', () => {
            valueEditorMocker.create(
                'acceptable-root',
                {
                    isDisabled: true,
                    options: {
                        acceptableValue: tree,
                        optionsTemplate: '{{$node.text}}'
                    }
                });

            const checkbox = getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 2);
            expect(checkbox.checked).toBe(false);

            checkbox.click();
            $scope.$apply();

            expect($scope.model).toBeUndefined();
            expect(checkbox.checked).toBe(false);
            expect(checkbox.disabled).toBe(true);
        });

        describe('single-select', () => {
            it('should change model on input', () => {
                $scope.model = {text: '0-2', value: 5};

                valueEditorMocker.create(
                    'acceptable-root',
                    {
                        options: {
                            acceptableValue: tree,
                            optionsTemplate: '{{$node.text}}'
                        }
                    }
                );

                const checkbox = getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 2);
                expect(checkbox.checked).toBe(true);

                checkbox.click();
                $scope.$apply();

                expect($scope.model).toBeUndefined();

                getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 0).click();
                $scope.$apply();

                expect($scope.model).toEqual(jasmine.objectContaining({text: '0-0', value: 1}));
            });

            it('should change value if model is changed', () => {
                valueEditorMocker.create(
                    'acceptable-root',
                    {
                        options: {
                            acceptableValue: tree,
                            optionsTemplate: '{{$node.text}}'
                        }
                    }
                );

                $scope.model = {text: '0-2', value: 5};
                $scope.$apply();
                let checkbox = getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 2);
                expect(checkbox.checked).toBe(true);

                $scope.model = {text: '0-0', value: 1};
                $scope.$apply();
                expect(checkbox.checked).toBe(false);
                checkbox = getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 0);
                expect(checkbox.checked).toBe(true);
            });

            it('should have working required validation', () => {
                valueEditorMocker.create('acceptable-root', {
                    editorName: 'acceptable-root',
                    options: {
                        acceptableValue: tree,
                        optionsTemplate: '{{$node.text}}'
                    },
                    validations: {required: true}
                });

                $scope.model = null;
                $scope.$apply();

                expect($scope.form['acceptable-root'].$error).toEqual({required: true});

                getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 2).click();

                expect($scope.form['acceptable-root'].$error).toEqual({});
            });

        });

        describe('multi-select', () => {
            it('should change model on input', () => {
                $scope.model = [{text: '0-2', value: 5}];

                valueEditorMocker.create(
                    'acceptable-root',
                    {
                        options: {
                            acceptableValue: tree,
                            optionsTemplate: '{{$node.text}}',
                            multiselect: true
                        }
                    }
                );

                const checkbox = getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 2);
                expect(checkbox.checked).toBe(true);

                checkbox.click();
                $scope.$apply();

                expect($scope.model).toEqual([]);

                getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 1).click();

                expect($scope.model).toEqual([
                    jasmine.objectContaining({text: '0-1', value: 2}),
                    jasmine.objectContaining({text: '0-1-0', value: 3}),
                    jasmine.objectContaining({text: '0-1-1', value: 4})
                ]);
            });

            it('should change value if model is changed', () => {
                valueEditorMocker.create(
                    'acceptable-root',
                    {
                        options: {
                            acceptableValue: tree,
                            optionsTemplate: '{{$node.text}}',
                            multiselect: true
                        }
                    }
                );

                $scope.model = [{text: '0-0', value: 1}];
                $scope.$apply();
                const checkbox = getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 0);
                expect(checkbox.checked).toBe(true);

                $scope.model = [{text: '0-1-0', value: 3}, {text: '0-1-1', value: 4}];
                $scope.$apply();
                expect(checkbox.checked).toBe(false);
                expect(getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 1, 0).checked).toBe(true);
                expect(getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 1, 1).checked).toBe(true);
            });

            it('should have working required validation', () => {
                valueEditorMocker.create('acceptable-root', {
                    editorName: 'acceptable-root',
                    options: {
                        acceptableValue: tree,
                        optionsTemplate: '{{$node.text}}',
                        multiselect: true
                    },
                    validations: {required: true}
                });

                $scope.model = [];
                $scope.$apply();

                expect($scope.form['acceptable-root'].$error).toEqual({required: true});

                getCheckbox(valueEditorMocker.getInputElement<HTMLInputElement>(), 0, 2).click();

                expect($scope.form['acceptable-root'].$error).toEqual({});
            });

            it('should have working emptyAsNull option with equalityComparator', () => {
                $scope.model = [{text: '0', value: 0}];

                valueEditorMocker.create('acceptable-root', {
                    options: {
                        acceptableValue: tree,
                        optionsTemplate: '{{$node.text}}',
                        multiselect: true,
                        emptyAsNull: true,
                        equalityComparator: /*@ngInject*/ ($element1, $element2) => $element1.value === $element2.value
                    }
                });

                getCheckbox(valueEditorMocker.getInputElement(), 0).click();

                expect($scope.model).toBeNull();
            });


        });

    });

});

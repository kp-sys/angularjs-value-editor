import * as angular from 'angular';
import valueEditorModule from '../value-editor.module';
import KpValueEditorRegistrationServiceProvider from './kp-value-editor-registration.provider';
import TextValueEditorComponent from '../editors/text/text.value-editor.component';
import {camelCaseToKebabCase} from '../utils/string-utils';
import AbstractValueEditorComponentController from '../abstract/abstract-value-editor-component-controller';
import register, {Component} from '@kpsys/angularjs-register';
import AbstractValueEditorComponent from '../abstract/abstract-value-editor-component';
import ValueEditorMocker, {ScopeWithBindings} from '../../../test/utils/value-editor-mocker';
import {NumberValueEditorBindings} from '../editors/number/number.value-editor.component';
import {AliasesServiceProvider} from '../aliases/aliases.service';

class DummyValueEditorComponent extends AbstractValueEditorComponent implements Component<never> {
    public static readonly componentName = 'dummyValueEditor';
    public static readonly valueEditorType = 'dummy';

    public template = '<div class="dummy" data-main-input>DUMMY</div>';

    public controller = class extends AbstractValueEditorComponentController<any, any> {
        

        protected get emptyModel(): any {
            return undefined;
        }
    };
}

const mockModule = register('mock-module')
    .component(DummyValueEditorComponent.componentName, DummyValueEditorComponent)
    .name();

describe('kpValueEditorRegistrationProvider', () => {

    it('should throw error if registering already registered type ', () => {
        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorRegistrationServiceProvider: KpValueEditorRegistrationServiceProvider) => {
            expect(() => kpValueEditorRegistrationServiceProvider.registerEditor(TextValueEditorComponent.valueEditorType, 'some-dummy-selector')).toThrow();
        });
    });

    it('should throw error if registering already registered type ', () => {
        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorRegistrationServiceProvider: KpValueEditorRegistrationServiceProvider) => {
            expect(() => kpValueEditorRegistrationServiceProvider.registerEditor('some-dummy-type', camelCaseToKebabCase(TextValueEditorComponent.componentName))).toThrow();
        });
    });

    it('should register new value editor', () => {
        angular.mock.module(mockModule);

        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorRegistrationServiceProvider: KpValueEditorRegistrationServiceProvider) => {
            kpValueEditorRegistrationServiceProvider.registerEditor(DummyValueEditorComponent.valueEditorType, camelCaseToKebabCase(DummyValueEditorComponent.componentName));
        });

        let valueEditorMocker: ValueEditorMocker<NumberValueEditorBindings>;
        let $scope: ScopeWithBindings<number, NumberValueEditorBindings>;

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<NumberValueEditorBindings>($compile, $scope);
        });

        valueEditorMocker.create('dummy');

        const element = valueEditorMocker.getInputElement<HTMLDivElement>();

        expect(element.classList.contains('dummy'));
    });

    it('should register new value editor with alias defined', () => {
        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorRegistrationServiceProvider: KpValueEditorRegistrationServiceProvider) => {
            kpValueEditorRegistrationServiceProvider.registerEditor(DummyValueEditorComponent.valueEditorType, camelCaseToKebabCase(DummyValueEditorComponent.componentName));
        });

        angular.mock.module(mockModule, /*@ngInject*/ (aliasesServiceProvider: AliasesServiceProvider) => {
            aliasesServiceProvider.addAlias('dummy-alias', 'dummy');
        });

        let valueEditorMocker: ValueEditorMocker<NumberValueEditorBindings>;
        let $scope: ScopeWithBindings<number, NumberValueEditorBindings>;

        inject(/*@ngInject*/ ($compile, $rootScope) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<NumberValueEditorBindings>($compile, $scope);
        });

        valueEditorMocker.create('dummy-alias');

        const element = valueEditorMocker.getInputElement<HTMLDivElement>();

        expect(element.classList.contains('dummy'));
    });
});

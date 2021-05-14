import * as angular from 'angular';
import {IAugmentedJQuery, ICompileService, IFlushPendingTasksService, IRootScopeService, IScope} from 'angular';
import valueEditorModule from '../value-editor.module';
import KpValueEditorConfigurationServiceProvider from './kp-value-editor-configuration-provider';
import {CustomValueEditorType} from '../aliases/kp-value-editor-aliases.service';

describe('kp-value-editor pre-init hook', () => {

    let ngCompile: ICompileService;
    let ngRootScope: IRootScopeService;
    let ngFlushPendingTasks: IFlushPendingTasksService;
    let $scope: IScope;

    let numberEditorSpy: jasmine.Spy;
    let textEditorSpy: jasmine.Spy;
    let dateAndBooleanEditorSpy: jasmine.Spy;
    let searchableAndBPasswordEditorSpy: jasmine.Spy;

    let elements: IAugmentedJQuery[];

    function compileTemplate(type: CustomValueEditorType): IAugmentedJQuery {
        const element = angular.element(`
            <kp-value-editor
                ng-model="model"
                type="'${type}'"
            ></kp-value-editor>
        `);

        angular.element(document.body).append(element);

        ngCompile(element)($scope);
        $scope.$apply();

        return element;
    }

    beforeEach(() => {
        numberEditorSpy = jasmine.createSpy('numberEditorSpy').and.callThrough();
        textEditorSpy = jasmine.createSpy('textEditorSpy').and.callThrough();
        dateAndBooleanEditorSpy = jasmine.createSpy('dateAndBooleanEditorSpy').and.callThrough();
        searchableAndBPasswordEditorSpy = jasmine.createSpy('searchableAndBPasswordEditorSpy').and.callThrough();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider) => {
            kpValueEditorConfigurationServiceProvider.addValueEditorPreInitHook('number', () => {
                numberEditorSpy();
                return Promise.resolve();
            });
            kpValueEditorConfigurationServiceProvider.addValueEditorPreInitHook('text', () => {
                textEditorSpy();
                return Promise.resolve();
            }, false);
            kpValueEditorConfigurationServiceProvider.addValueEditorPreInitHook(['date', 'boolean'], () => {
                dateAndBooleanEditorSpy();
                return Promise.resolve();
            });
            kpValueEditorConfigurationServiceProvider.addValueEditorPreInitHook(['searchable', 'password'], () => {
                searchableAndBPasswordEditorSpy();
                return Promise.resolve();
            }, false);
        });

        inject(/*@ngInject*/ ($compile, $rootScope, $flushPendingTasks) => {
            ngCompile = $compile;
            ngRootScope = $rootScope;
            ngFlushPendingTasks = $flushPendingTasks;
        });

        $scope = ngRootScope.$new();
    });

    afterEach(() => {
        $scope.$destroy();
        elements.forEach((element) => element.remove());
    });

    it('should call once number editor\'s pre-init hook', () => {
        elements = [compileTemplate('number')];

        expect(numberEditorSpy).toHaveBeenCalledTimes(1);
        expect(textEditorSpy).not.toHaveBeenCalled();
    });

    it('should call twice text editor\'s pre-init hook', () => {
        elements = [
            compileTemplate('text'),
            compileTemplate('text')
        ];

        expect(numberEditorSpy).not.toHaveBeenCalled();
        expect(textEditorSpy).toHaveBeenCalledTimes(2);
    });

    it('should call once date and boolean editor\'s shared pre-init hook', () => {
        elements = [
            compileTemplate('year'),
            compileTemplate('date')
        ];

        expect(numberEditorSpy).not.toHaveBeenCalled();
        expect(textEditorSpy).not.toHaveBeenCalled();
        expect(dateAndBooleanEditorSpy).toHaveBeenCalledTimes(1);
    });

    it('should call twice search and password editor\'s shared pre-init hook', () => {
        elements = [
            compileTemplate('searchable'),
            compileTemplate('password')
        ];

        expect(numberEditorSpy).not.toHaveBeenCalled();
        expect(textEditorSpy).not.toHaveBeenCalled();
        expect(searchableAndBPasswordEditorSpy).toHaveBeenCalledTimes(2);
    });


});

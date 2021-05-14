import * as angular from 'angular';
import {IFlushPendingTasksService, ITimeoutService} from 'angular';
import valueEditorModule from '../value-editor.module';
import SearchableValueEditorConfigurationServiceProvider
    from '../editors/searchable/searchable-value-editor-configuration.provider';
import ValueEditorMocker, {ScopeWithBindings} from '../../../test/utils/value-editor-mocker';
import {SearchableValueEditorBindings} from '../editors/searchable/searchable.value-editor.component';

describe('AbstractValueEditorComponentController', () => {

    let valueEditorMocker: ValueEditorMocker<SearchableValueEditorBindings<any>>;
    let $scope: ScopeWithBindings<any, SearchableValueEditorBindings<any>>;
    let ngFlushPendingTasks: IFlushPendingTasksService;

    let searchFunction: (...args: any[]) => Promise<any>;

    beforeEach(() => {
        searchFunction = jasmine.createSpy('searchFunction', (model, $timeout: ITimeoutService) => {
            return new Promise<any>((resolve) => $timeout(() => resolve('hello'), 100));
        }).and.callThrough();

        angular.mock.module(valueEditorModule, /*@ngInject*/ (searchableValueEditorConfigurationServiceProvider: SearchableValueEditorConfigurationServiceProvider<string>) => {
            searchableValueEditorConfigurationServiceProvider.setConfiguration({
                searchModelFunction: /*@ngInject*/ ($model, $timeout) => searchFunction.call(this, $model, $timeout)
            });
        });

        inject(/*@ngInject*/ ($compile, $rootScope, $flushPendingTasks) => {
            $scope = $rootScope.$new();
            valueEditorMocker = new ValueEditorMocker<SearchableValueEditorBindings<string>>($compile, $scope);
            ngFlushPendingTasks = $flushPendingTasks;
        });
    });

    // FIXME See AbstractValueEditorComponentController#processNewOptions
    xit('should pass', (done) => {
        valueEditorMocker.create('searchable', {
            editorName: 'searchable',
            options: {
                searchModelFunction: /*@ngInject*/ ($model: any) => $model
            }
        });

        valueEditorMocker.getInputElement<HTMLInputElement>().parentElement.querySelector<HTMLButtonElement>('.search-button').click();

        ngFlushPendingTasks();

        new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 150);
        }).then(() => {
            $scope.$apply();
        }).finally(done);
    });
});

import SearchableValueEditorConfigurationProvider
    from '../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';
import {ITimeoutService} from 'angular';

/*@ngInject*/
export default function config(searchableValueEditorConfigurationServiceProvider: SearchableValueEditorConfigurationProvider<string>) {
    searchableValueEditorConfigurationServiceProvider.setConfiguration({
        searchModelFunction: /*@ngInject*/ ($timeout: ITimeoutService) => new Promise<string>((resolve => $timeout(() => resolve('Model'), 1500)))
    });
}

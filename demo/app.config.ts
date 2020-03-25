import IndexSelectionValueEditorConfigurationProvider
    from '../src/value-editor/editors/index-selection/index-selection-value-editor-configuration.provider';
import * as angular from 'angular';

/*@ngInject*/
export default function config(indexSelectionValueEditorConfigurationServiceProvider: IndexSelectionValueEditorConfigurationProvider<number, any>) {
    indexSelectionValueEditorConfigurationServiceProvider.setConfiguration({
        optionsTemplate: '{{$item.text}}',
        equalityComparator: (model, item) => {

            let singleModel = Array.isArray(model) ? model[0] : model;

            if (typeof singleModel === 'string') {
                singleModel = Number.parseInt(singleModel, 10)
            }

            return angular.equals(singleModel, item.id);
        }
    });
}

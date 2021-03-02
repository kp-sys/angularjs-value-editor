import KpValueEditorConfigurationServiceProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import * as angular from 'angular';
import KpUniversalFormConfigurationServiceProvider
    from 'src/value-editor/kp-universal-form/kp-universal-form-configuration-provider';
import SearchableValueEditorConfigurationServiceProvider
    from '../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';
import {KpAsyncValidationServiceProvider} from '../src/value-editor/kp-async-validation/kp-async-validation.provider';
import ObjectValueEditorConfigurationServiceProvider
    from '../src/value-editor/meta-editors/object/object-value-editor-configuration.provider';

/*@ngInject*/
export default function config(
    kpUniversalFormConfigurationServiceProvider: KpUniversalFormConfigurationServiceProvider,
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider,
    $animateProvider: angular.animate.IAnimateProvider,
    searchableValueEditorConfigurationServiceProvider: SearchableValueEditorConfigurationServiceProvider<any>,
    kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider,
    objectValueEditorConfigurationServiceProvider: ObjectValueEditorConfigurationServiceProvider
) {
    kpUniversalFormConfigurationServiceProvider.setAutofocusFirstField(true);
    kpValueEditorConfigurationServiceProvider.setDebugMode(false);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);

    searchableValueEditorConfigurationServiceProvider.setConfiguration({
        searchModelFunction: /*@ngInject*/ ($model, $uibModal) => $uibModal.open({
            component: 'modal',
            resolve: {
                model: () => $model
            }
        }).result
    });

    kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: { opt: number }) => {
        return Promise.reject(`opt-${$model?.opt}`);
    });

    $animateProvider.classNameFilter(/ng-animate-enabled/);

    objectValueEditorConfigurationServiceProvider.setConfiguration({
        labelsWidth: 4
    });
}

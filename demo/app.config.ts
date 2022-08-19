import KpValueEditorConfigurationServiceProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import KpUniversalFormConfigurationServiceProvider
    from 'src/value-editor/kp-universal-form/kp-universal-form-configuration-provider';
import SearchableValueEditorConfigurationServiceProvider
    from '../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';
import {KpAsyncValidationServiceProvider} from '../src/value-editor/kp-async-validation/kp-async-validation.provider';
import AcceptableValueEditorConfigurationServiceProvider
    from '../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';

/*@ngInject*/
export default function config(
    kpUniversalFormConfigurationServiceProvider: KpUniversalFormConfigurationServiceProvider,
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider,
    searchableValueEditorConfigurationServiceProvider: SearchableValueEditorConfigurationServiceProvider<any>,
    kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider,
    acceptableValueEditorConfigurationServiceProvider: AcceptableValueEditorConfigurationServiceProvider<any>
) {
    kpUniversalFormConfigurationServiceProvider.setAutofocusFirstField(true);
    kpValueEditorConfigurationServiceProvider.setDebugMode(true);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);
    kpValueEditorConfigurationServiceProvider.addValueEditorPreInitHook('searchable', async () => new Promise<void>((resolve) => {
        setTimeout(resolve, 30_000);
    }), true);

    searchableValueEditorConfigurationServiceProvider.setConfiguration({
        searchModelFunction: /*@ngInject*/ ($model, $uibModal) => $uibModal.open({
            component: 'modal',
            resolve: {
                model: () => $model
            }
        }).result
    });

    kpAsyncValidationServiceProvider.setValidationFunction(/*@ngInject*/ ($model: { opt: number }) => {
        return Promise.resolve();
    });

    acceptableValueEditorConfigurationServiceProvider.setConfiguration({
        optionsTemplate: '{{$item.text}}'
    });
}

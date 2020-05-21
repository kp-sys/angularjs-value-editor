import KpValueEditorConfigurationProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';

/*@ngInject*/
export default function config(
    valueEditorConfigurationServiceProvider: KpValueEditorConfigurationProvider
) {
    valueEditorConfigurationServiceProvider.setDebugMode(true);
}

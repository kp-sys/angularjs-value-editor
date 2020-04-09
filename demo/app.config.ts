import SignatureValueEditorConfigurationProvider
    from '../src/value-editor/editors/signature/signature-value-editor-configuration.provider';

/*@ngInject*/
export default function config(signatureValueEditorConfigurationServiceProvider: SignatureValueEditorConfigurationProvider) {
    signatureValueEditorConfigurationServiceProvider.setConfiguration({
        dataSource: /*@ngInject*/ ($name, $model) => {
            console.log($name, $model);

            return Promise.resolve(['a', 'b', 'c', 'd', $name]);
        }
    });
}

import AcceptableValueEditorConfigurationProvider
    from '../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';

/*@ngInject*/
export default function config(acceptableValueEditorConfigurationServiceProvider: AcceptableValueEditorConfigurationProvider<any>) {
    acceptableValueEditorConfigurationServiceProvider.setConfiguration({
        multiselectable: true,
        optionsTemplate: '{{$item.x}}'
    });
}

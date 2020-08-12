import {KpValueEditorAliasesServiceProvider} from '../../aliases/kp-value-editor-aliases.service';
import TextValueEditorConfigurationServiceProvider from '../text/text-value-editor-configuration.provider';

const EXEMPLAR_BAR_CODE_ALIAS = 'exemplar-bar-code';

/*@ngInject*/
export default function exemplarBarCodeValueEditorConfig(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider, textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationServiceProvider) {
    kpValueEditorAliasesServiceProvider
        .addAlias(EXEMPLAR_BAR_CODE_ALIAS, 'text');

    textValueEditorConfigurationServiceProvider
        .forAlias(EXEMPLAR_BAR_CODE_ALIAS)
        .setConfiguration({type: 'text'});
}


import {AliasesServiceProvider} from '../../aliases/aliases.service';
import TextValueEditorConfigurationServiceProvider from '../text/text-value-editor-configuration.provider';

const EXEMPLAR_BAR_CODE_ALIAS = 'exemplar-bar-code';

/*@ngInject*/
export default function exemplarBarCodeValueEditorConfig(aliasesServiceProvider: AliasesServiceProvider, textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationServiceProvider) {
    aliasesServiceProvider
        .addAlias(EXEMPLAR_BAR_CODE_ALIAS, 'text');

    textValueEditorConfigurationServiceProvider
        .forAlias(EXEMPLAR_BAR_CODE_ALIAS)
        .setConfiguration({type: 'text'});
}


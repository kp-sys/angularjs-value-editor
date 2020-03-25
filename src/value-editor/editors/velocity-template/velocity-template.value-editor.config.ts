import {AliasesServiceProvider} from '../../aliases/aliases.service';
import TextValueEditorConfigurationProvider from '../text/text-value-editor-configuration.provider';

const VELOCITY_TEMPLATE_ALIAS = 'velocity-template';

/*@ngInject*/
export default function velocityTemplateValueEditorConfig(aliasesServiceProvider: AliasesServiceProvider, textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationProvider) {
    aliasesServiceProvider
        .addAlias(VELOCITY_TEMPLATE_ALIAS, 'text');

    textValueEditorConfigurationServiceProvider
        .forAlias(VELOCITY_TEMPLATE_ALIAS)
        .setConfiguration({type: 'rich-textarea'});
}

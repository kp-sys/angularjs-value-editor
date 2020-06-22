import {AliasesServiceProvider} from '../../aliases/aliases.service';
import TextValueEditorConfigurationServiceProvider from '../text/text-value-editor-configuration.provider';

const VELOCITY_TEMPLATE_ALIAS = 'velocity-template';

/*@ngInject*/
export default function velocityTemplateValueEditorConfig(aliasesServiceProvider: AliasesServiceProvider, textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationServiceProvider) {
    aliasesServiceProvider
        .addAlias(VELOCITY_TEMPLATE_ALIAS, 'text');

    textValueEditorConfigurationServiceProvider
        .forAlias(VELOCITY_TEMPLATE_ALIAS)
        .setConfiguration({type: 'rich-textarea'});
}

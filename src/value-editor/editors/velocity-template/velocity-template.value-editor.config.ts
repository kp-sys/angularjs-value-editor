import {KpValueEditorAliasesServiceProvider} from '../../aliases/kp-value-editor-aliases.service';
import TextValueEditorConfigurationServiceProvider from '../text/text-value-editor-configuration.provider';

const VELOCITY_TEMPLATE_ALIAS = 'velocity-template';

/*@ngInject*/
export default function velocityTemplateValueEditorConfig(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider, textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationServiceProvider) {
    kpValueEditorAliasesServiceProvider
        .addAlias(VELOCITY_TEMPLATE_ALIAS, 'text');

    textValueEditorConfigurationServiceProvider
        .forAlias(VELOCITY_TEMPLATE_ALIAS)
        .setConfiguration({type: 'rich-textarea'});
}

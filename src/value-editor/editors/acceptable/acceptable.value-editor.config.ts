import {KpValueEditorAliasesServiceProvider} from '../../aliases/kp-value-editor-aliases.service';
import AcceptableValueEditorConfigurationServiceProvider from './acceptable-value-editor-configuration.provider';

const SINGLE_ACCEPTABLE_ALIAS = 'single-acceptable';
const MULTIPLE_ACCEPTABLE_ALIAS = 'multiple-acceptable';

/*@ngInject*/
export function acceptableValueEditorConfig(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider, acceptableValueEditorConfigurationServiceProvider: AcceptableValueEditorConfigurationServiceProvider<any>) {
    kpValueEditorAliasesServiceProvider
        .addAlias(SINGLE_ACCEPTABLE_ALIAS, 'acceptable');

    acceptableValueEditorConfigurationServiceProvider
        .forAlias(SINGLE_ACCEPTABLE_ALIAS)
        .setConfiguration({multiselectable: false});

    kpValueEditorAliasesServiceProvider
        .addAlias(MULTIPLE_ACCEPTABLE_ALIAS, 'acceptable');

    acceptableValueEditorConfigurationServiceProvider
        .forAlias(MULTIPLE_ACCEPTABLE_ALIAS)
        .setConfiguration({multiselectable: true});
}

import {AliasesServiceProvider} from '../../aliases/aliases.service';
import AcceptableValueEditorConfigurationServiceProvider from './acceptable-value-editor-configuration.provider';

const SINGLE_ACCEPTABLE_ALIAS = 'single-acceptable';
const MULTIPLE_ACCEPTABLE_ALIAS = 'multiple-acceptable';

/*@ngInject*/
export function acceptableValueEditorConfig(aliasesServiceProvider: AliasesServiceProvider, acceptableValueEditorConfigurationServiceProvider: AcceptableValueEditorConfigurationServiceProvider<any>) {
    aliasesServiceProvider
        .addAlias(SINGLE_ACCEPTABLE_ALIAS, 'acceptable');

    acceptableValueEditorConfigurationServiceProvider
        .forAlias(SINGLE_ACCEPTABLE_ALIAS)
        .setConfiguration({multiselectable: false});

    aliasesServiceProvider
        .addAlias(MULTIPLE_ACCEPTABLE_ALIAS, 'acceptable');

    acceptableValueEditorConfigurationServiceProvider
        .forAlias(MULTIPLE_ACCEPTABLE_ALIAS)
        .setConfiguration({multiselectable: true});
}

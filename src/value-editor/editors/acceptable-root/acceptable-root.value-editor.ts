import {AliasesServiceProvider} from '../../aliases/aliases.service';
import AcceptableRootValueEditorConfigurationProvider from './acceptable-root-value-editor-configuration.provider';

const SINGLE_ACCEPTABLE_ROOT_ALIAS = 'single-acceptable-root';
const MULTIPLE_ACCEPTABLE_ROOT_ALIAS = 'multiple-acceptable-root';

/*@ngInject*/
export function acceptableRootValueEditorConfig(aliasesServiceProvider: AliasesServiceProvider, acceptableRootValueEditorConfigurationServiceProvider: AcceptableRootValueEditorConfigurationProvider<any>) {
    aliasesServiceProvider
        .addAlias(SINGLE_ACCEPTABLE_ROOT_ALIAS, 'acceptable-root');

    acceptableRootValueEditorConfigurationServiceProvider
        .forAlias(SINGLE_ACCEPTABLE_ROOT_ALIAS)
        .setConfiguration({multiselect: false});

    aliasesServiceProvider
        .addAlias(MULTIPLE_ACCEPTABLE_ROOT_ALIAS, 'acceptable-root');

    acceptableRootValueEditorConfigurationServiceProvider
        .forAlias(MULTIPLE_ACCEPTABLE_ROOT_ALIAS)
        .setConfiguration({multiselect: true});
}

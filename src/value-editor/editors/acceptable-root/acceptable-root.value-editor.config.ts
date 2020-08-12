import {KpValueEditorAliasesServiceProvider} from '../../aliases/kp-value-editor-aliases.service';
import AcceptableRootValueEditorConfigurationServiceProvider
    from './acceptable-root-value-editor-configuration.provider';

const SINGLE_ACCEPTABLE_ROOT_ALIAS = 'single-acceptable-root';
const MULTIPLE_ACCEPTABLE_ROOT_ALIAS = 'multiple-acceptable-root';

/*@ngInject*/
export function acceptableRootValueEditorConfig(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider, acceptableRootValueEditorConfigurationServiceProvider: AcceptableRootValueEditorConfigurationServiceProvider<any>) {
    kpValueEditorAliasesServiceProvider
        .addAlias(SINGLE_ACCEPTABLE_ROOT_ALIAS, 'acceptable-root');

    acceptableRootValueEditorConfigurationServiceProvider
        .forAlias(SINGLE_ACCEPTABLE_ROOT_ALIAS)
        .setConfiguration({multiselect: false});

    kpValueEditorAliasesServiceProvider
        .addAlias(MULTIPLE_ACCEPTABLE_ROOT_ALIAS, 'acceptable-root');

    acceptableRootValueEditorConfigurationServiceProvider
        .forAlias(MULTIPLE_ACCEPTABLE_ROOT_ALIAS)
        .setConfiguration({multiselect: true});
}

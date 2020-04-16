import {AliasesServiceProvider} from '../../aliases/aliases.service';
import {AcceptableRootValueEditorOptions} from './acceptable-root-value-editor-configuration.provider';

/*@ngInject*/
export function acceptableRootValueEditorConfig(aliasesServiceProvider: AliasesServiceProvider) {
    aliasesServiceProvider
        .addAlias('single-acceptable-root', 'acceptable-root')
        .withOptions<AcceptableRootValueEditorOptions<any>>({multiselect: false});

    aliasesServiceProvider
        .addAlias('multiple-acceptable-root', 'acceptable-root')
        .withOptions<AcceptableRootValueEditorOptions<any>>({multiselect: true});
}

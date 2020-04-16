import {AliasesServiceProvider} from '../../aliases/aliases.service';
import {TextValueEditorOptions} from '../text/text-value-editor-configuration.provider';

/*@ngInject*/
export default function exemplarBarCodeValueEditorConfig(aliasesServiceProvider: AliasesServiceProvider) {
    aliasesServiceProvider
        .addAlias('exemplar-bar-code', 'text')
        .withOptions<TextValueEditorOptions>({type: 'text'});
}


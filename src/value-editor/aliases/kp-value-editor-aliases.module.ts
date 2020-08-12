import register from '@kpsys/angularjs-register';
import {KpValueEditorAliasesServiceProviderImpl} from './kp-value-editor-aliases.service';

/**
 * @ngdoc module
 * @name angularjs-value-editor.aliases
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Support for editor types aliasing
 */

export default register('angularjs-value-editor.aliases')
    .provider(KpValueEditorAliasesServiceProviderImpl.providerName, KpValueEditorAliasesServiceProviderImpl)
    .name();

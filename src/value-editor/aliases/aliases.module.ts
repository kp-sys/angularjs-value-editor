import register from '@kpsys/angularjs-register';
import {AliasesServiceProviderImpl} from './aliases.service';

/**
 * @ngdoc module
 * @name angularjs-value-editor.aliases
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Support for editor types aliasing
 */

export default register('angularjs-value-editor.aliases')
    .provider(AliasesServiceProviderImpl.providerName, AliasesServiceProviderImpl)
    .name();

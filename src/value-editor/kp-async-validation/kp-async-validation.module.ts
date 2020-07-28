import register from '@kpsys/angularjs-register';
import {KpAsyncValidationServiceProvider} from './kp-async-validation.provider';
import KpAsyncValidationDirective from './kp-async-validation.directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.async-validation
 * @module angularjs-value-editor.async-validation
 *
 * @description
 *
 */

export default register('angularjs-value-editor.async-validation')
    .provider(KpAsyncValidationServiceProvider.providerName, KpAsyncValidationServiceProvider)
    .directive(KpAsyncValidationDirective.directiveName, KpAsyncValidationDirective)
    .name();

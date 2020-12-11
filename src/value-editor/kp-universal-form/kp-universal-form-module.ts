import register from '@kpsys/angularjs-register';
import KpUniversalFormConfigurationServiceProvider from './kp-universal-form-configuration-provider';
import KpUniversalFormComponent from './kp-universal-form.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.universal-form
 * @module angularjs-value-editor.universal-form
 *
 * @description
 *
 */

export default register('angularjs-value-editor.universal-form')
    .provider(KpUniversalFormConfigurationServiceProvider.providerName, KpUniversalFormConfigurationServiceProvider)
    .component(KpUniversalFormComponent.componentName, KpUniversalFormComponent)
    .name();
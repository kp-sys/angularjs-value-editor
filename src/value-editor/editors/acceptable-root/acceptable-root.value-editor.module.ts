import './acceptable-root.value-editor.less';
import register from '@kpsys/angularjs-register';
import treeControlModule from './tree-control/tree-control';
import AcceptableRootValueEditorConfigurationServiceProvider, {ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_OPTIONS} from './acceptable-root-value-editor-configuration.provider';
import AcceptableRootValueEditorLocalizationsServiceProvider, {ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './acceptable-root-value-editor-localization.provider';
import AcceptableRootValueEditorComponent from './acceptable-root.value-editor.component';
import {acceptableRootValueEditorConfig} from './acceptable-root.value-editor.config';
import AcceptableRootRequiredValidationsDirective from './acceptable-root-required-validations-directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.acceptable-root
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 *
 */

export default register('angularjs-value-editor.acceptable-root', [treeControlModule])
    .config(acceptableRootValueEditorConfig)
    .constant('acceptableRootValueEditorDefaultOptions', ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('acceptableRootValueEditorDefaultLocalizations', ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(AcceptableRootValueEditorConfigurationServiceProvider.providerName, AcceptableRootValueEditorConfigurationServiceProvider)
    .provider(AcceptableRootValueEditorLocalizationsServiceProvider.providerName, AcceptableRootValueEditorLocalizationsServiceProvider)
    .directive(AcceptableRootRequiredValidationsDirective.directiveName, AcceptableRootRequiredValidationsDirective)
    .component(AcceptableRootValueEditorComponent.componentName, AcceptableRootValueEditorComponent)
    .name();

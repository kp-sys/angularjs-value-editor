import './acceptable-root.value-editor.less';
import register from '@kpsys/angularjs-register';
import treeControlModule from './tree-control/angular-tree-control';
import AcceptableRootValueEditorConfigurationProvider, {ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_OPTIONS} from './acceptable-root-value-editor-configuration.provider';
import AcceptableRootValueEditorLocalizationsProvider, {ACCEPTABLE_ROOT_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './acceptable-root-value-editor-localization.provider';
import AcceptableRootValueEditorComponent from './acceptable-root.value-editor.component';
import {acceptableRootValueEditorConfig} from './acceptable-root.value-editor';

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
    .provider(AcceptableRootValueEditorConfigurationProvider.providerName, AcceptableRootValueEditorConfigurationProvider)
    .provider(AcceptableRootValueEditorLocalizationsProvider.providerName, AcceptableRootValueEditorLocalizationsProvider)
    .component(AcceptableRootValueEditorComponent.componentName, AcceptableRootValueEditorComponent)
    .name();

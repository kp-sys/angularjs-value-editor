import register from '@kpsys/angularjs-register';
import KpValueEditorForceSettingsComponent from './kp-value-editor-force-settings.component';
import KpValueEditorForceSettingComponent from './kp-value-editor-force-setting.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.force-settings
 * @module angularjs-value-editor.force-settings
 *
 * @description
 *
 */

export default register('angularjs-value-editor.force-settings')
    .component(KpValueEditorForceSettingsComponent.componentName, KpValueEditorForceSettingsComponent)
    .component(KpValueEditorForceSettingComponent.componentName, KpValueEditorForceSettingComponent)
    .name();

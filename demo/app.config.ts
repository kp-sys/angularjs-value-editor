import KpValueEditorConfigurationServiceProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import PasswordValueEditorLocalizationsServiceProvider
    from '../src/value-editor/editors/password/password-value-editor-localization.provider';

/*@ngInject*/
export default function config(
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider,
    passwordValueEditorLocalizationsServiceProvider: PasswordValueEditorLocalizationsServiceProvider
) {
    kpValueEditorConfigurationServiceProvider.setDebugMode(true);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);

    passwordValueEditorLocalizationsServiceProvider.setLocalization('confirmPassword', 'Heslo znovu');
}

import KpValueEditorConfigurationProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import PasswordValueEditorLocalizationsProvider
    from '../src/value-editor/editors/password/password-value-editor-localization.provider';

/*@ngInject*/
export default function config(
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationProvider,
    passwordValueEditorLocalizationsServiceProvider: PasswordValueEditorLocalizationsProvider
) {
    kpValueEditorConfigurationServiceProvider.setDebugMode(true);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);

    passwordValueEditorLocalizationsServiceProvider.setLocalization('confirmPassword', 'Heslo znovu');
}

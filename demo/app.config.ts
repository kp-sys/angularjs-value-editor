import KpValueEditorConfigurationServiceProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import PasswordValueEditorLocalizationsServiceProvider
    from '../src/value-editor/editors/password/password-value-editor-localization.provider';
import * as angular from 'angular';

/*@ngInject*/
export default function config(
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider,
    passwordValueEditorLocalizationsServiceProvider: PasswordValueEditorLocalizationsServiceProvider,
    $animateProvider: angular.animate.IAnimateProvider
) {
    kpValueEditorConfigurationServiceProvider.setDebugMode(true);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);

    passwordValueEditorLocalizationsServiceProvider.setLocalization('confirmPassword', 'Heslo znovu');

    $animateProvider.classNameFilter(/ng-animate-enabled/);
}

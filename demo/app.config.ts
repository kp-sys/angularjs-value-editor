import KpValueEditorConfigurationServiceProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import * as angular from 'angular';
import TextValueEditorConfigurationServiceProvider
    from '../src/value-editor/editors/text/text-value-editor-configuration.provider';

/*@ngInject*/
export default function config(
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider,
    // passwordValueEditorLocalizationsServiceProvider: PasswordValueEditorLocalizationsServiceProvider,
    $animateProvider: angular.animate.IAnimateProvider,
    textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationServiceProvider
) {
    kpValueEditorConfigurationServiceProvider.setDebugMode(true);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);

    // passwordValueEditorLocalizationsServiceProvider.setLocalization('confirmPassword', 'Heslo znovu');

    $animateProvider.classNameFilter(/ng-animate-enabled/);

    textValueEditorConfigurationServiceProvider.setConfiguration({
        customEmptyAsNullCheck: /*@ngInject*/ ($value) => $value === 'hovno'
    });
}

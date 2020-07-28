import KpValueEditorConfigurationServiceProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import * as angular from 'angular';
import {ITimeoutService} from 'angular';
import TextValueEditorConfigurationServiceProvider
    from '../src/value-editor/editors/text/text-value-editor-configuration.provider';
import {KpAsyncValidationServiceProvider} from '../src/value-editor/kp-async-validation/kp-async-validation.provider';
import PasswordValueEditorLocalizationsServiceProvider
    from '../src/value-editor/editors/password/password-value-editor-localization.provider';

/*@ngInject*/
export default function config(
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider,
    passwordValueEditorLocalizationsServiceProvider: PasswordValueEditorLocalizationsServiceProvider,
    $animateProvider: angular.animate.IAnimateProvider,
    textValueEditorConfigurationServiceProvider: TextValueEditorConfigurationServiceProvider,
    kpAsyncValidationServiceProvider: KpAsyncValidationServiceProvider
) {
    kpValueEditorConfigurationServiceProvider.setDebugMode(true);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);

    passwordValueEditorLocalizationsServiceProvider.setLocalization('confirmPassword', 'Heslo znovu');

    $animateProvider.classNameFilter(/ng-animate-enabled/);

    textValueEditorConfigurationServiceProvider.setConfiguration({
        customEmptyAsNullCheck: /*@ngInject*/ ($value) => $value === 'hovno'
    });

    kpAsyncValidationServiceProvider.setValidationFunction(
        /*@ngInject*/ ($timeout: ITimeoutService, $model: string) => new Promise((resolve, reject) => $timeout(() => {
            if ($model === 'hovno') {
                reject('Dyk je to hovno...');
            } else {
                resolve();
            }
        }, 1000))
    );
}

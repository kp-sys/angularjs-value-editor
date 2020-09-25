import KpValueEditorConfigurationServiceProvider
    from '../src/value-editor/kp-value-editor/kp-value-editor-configuration-provider';
import * as angular from 'angular';
import {IHttpService, ITimeoutService} from 'angular';
import PasswordValueEditorLocalizationsServiceProvider
    from '../src/value-editor/editors/password/password-value-editor-localization.provider';
import AutocompleteValueEditorConfigurationServiceProvider
    from '../src/value-editor/editors/autocomplete/autocomplete-value-editor-configuration.provider';

interface ResponseContent {
    value: string;
}

interface Response {
    totalElements: number;
    content: ResponseContent[];
}

/*@ngInject*/
export default function config(
    kpValueEditorConfigurationServiceProvider: KpValueEditorConfigurationServiceProvider,
    passwordValueEditorLocalizationsServiceProvider: PasswordValueEditorLocalizationsServiceProvider,
    $animateProvider: angular.animate.IAnimateProvider,
    autocompleteValueEditorConfigurationServiceProvider: AutocompleteValueEditorConfigurationServiceProvider<string>
) {
    kpValueEditorConfigurationServiceProvider.setDebugMode(true);
    kpValueEditorConfigurationServiceProvider.setPreciseWatchForOptionsChanges(false);

    autocompleteValueEditorConfigurationServiceProvider.setConfiguration({
        emptyAsNull: false,
        dataSource: /*@ngInject*/ ($timeout: ITimeoutService, $http: IHttpService) => {
            return $http.get<Response>('https://develop.kpsys.cz/api/autocomplete/FRZ264_b')
                .then((response) => response.data)
                .then((response) => response.content)
                .then((listResult) => listResult.map((item) => item.value));
        }
    });

    $animateProvider.classNameFilter(/ng-animate-enabled/);
}

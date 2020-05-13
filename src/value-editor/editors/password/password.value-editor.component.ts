import KpValueEditorComponent, {ValueEditorBindings} from '../../kp-value-editor/kp-value-editor.component';
import AbstractValueEditor, {OptionsChangeDetection} from '../../common/abstract-value-editor';
import * as angular from 'angular';
import {IOnInit} from 'angular';
import {
    PasswordValueEditorConfigurationService,
    PasswordValueEditorOptions
} from './password-value-editor-configuration.provider';
import {PasswordValueEditorLocalizationsService} from './password-value-editor-localization.provider';
import {TextValueEditorValidations} from '../text/text.value-editor.component';

export class PasswordValueEditorComponentController extends AbstractValueEditor<string, PasswordValueEditorOptions> implements IOnInit {
    public passwordRepetition: string;

    /*@ngInject*/
    constructor(passwordValueEditorConfigurationService: PasswordValueEditorConfigurationService,
                passwordValueEditorLocalizationsService: PasswordValueEditorLocalizationsService) {
        super(passwordValueEditorConfigurationService, passwordValueEditorLocalizationsService);
    }

    public $onInit(): void {
        super.$onInit();

        const originalRenderFunction = this.ngModelController.$render;

        this.ngModelController.$render = () => {
            originalRenderFunction();
            this.passwordRepetition = this.model;
        };
    }

    protected onOptionsChange(newOptions: PasswordValueEditorOptions, oldOptions, whatChanged: OptionsChangeDetection<PasswordValueEditorOptions>) {
        //
    }

}

/**
 * @ngdoc component
 * @name passwordValueEditor
 * @module angularjs-value-editor.password
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Value editor for password input.
 *
 * Supported options: {@link type:PasswordValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="passwordValueEditorExample" module="passwordValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'password'" ng-model="model" options="{withConfirmation: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('passwordValueEditorExample', ['angularjs-value-editor'])
 *     </file>
 * </example>
 */
export default class PasswordValueEditorComponent {
    public static componentName = 'passwordValueEditor';

    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${KpValueEditorComponent.componentName}`
    };

    public templateUrl = require('./password.value-editor.tpl.pug');

    public controller = PasswordValueEditorComponentController;
}

export interface PasswordValueEditorBindings extends ValueEditorBindings<PasswordValueEditorOptions, TextValueEditorValidations> {
}

import {ValueEditorOptions, ValueEditorValidations} from '../kp-value-editor/kp-value-editor.component';
import {CustomValueEditorType} from '../aliases/aliases.service';
import {Component} from '@kpsys/angularjs-register';
import KpValueEditorForceSettingsComponent, {
    ALL_TYPES,
    KpValueEditorForceSettingsComponentController
} from './kp-value-editor-force-settings.component';
import {ILogService, IOnInit} from 'angular';

export class KpValueEditorForceSettingComponentController<OPTIONS, VALIDATIONS> implements KpValueEditorForceSettingComponentBindings<OPTIONS, VALIDATIONS>, IOnInit {
    public options: OPTIONS;
    public type: CustomValueEditorType;
    public validations: VALIDATIONS;

    public kpValueEditorForceSettingsComponentController: KpValueEditorForceSettingsComponentController;

    /*@ngInject*/
    constructor(private $log: ILogService) {
    }

    public $onInit(): void {
        if (this.validations) {
            this.$log.warn('Setting of validations is not implemented yet!');
        }

        this.kpValueEditorForceSettingsComponentController.addNewSettings(this.type ?? ALL_TYPES, this.options, this.validations);
    }
}

/**
 * @ngdoc component
 * @name kpValueEditorForceSetting
 * @module angularjs-value-editor.force-settings
 *
 * @template OPTIONS
 * @template VALIDATIONS
 *
 * @requires component:kpValueEditorForceSettings
 *
 * @param {CustomValueEditorType=} type Type of value editor. If `type` is not specified, options will be passed to all editors.
 * @param {OPTIONS=} options Options
 * @param {VALIDATIONS=} validations Validations (not implemented yet)
 *
 * @description
 * This component is used for override options and validations for specified type of value editor. It requires {@link component:kpValueEditorForceSettings}
 */
export default class KpValueEditorForceSettingComponent<OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> implements Component<KpValueEditorForceSettingComponentBindings<OPTIONS, VALIDATIONS>> {
    public static readonly componentName = 'kpValueEditorForceSetting';

    public require = {
        kpValueEditorForceSettingsComponentController: `^^${KpValueEditorForceSettingsComponent.componentName}`
    };

    public bindings = {
        type: '@?',
        options: '<?',
        validations: '<?'
    } as const;

    public priority = 20;

    public controller = KpValueEditorForceSettingComponentController;
}

interface KpValueEditorForceSettingComponentBindings<OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> {
    type?: CustomValueEditorType;
    options?: OPTIONS;
    validations?: VALIDATIONS;
}

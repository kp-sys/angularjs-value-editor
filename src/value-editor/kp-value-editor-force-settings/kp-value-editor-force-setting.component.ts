import {ValueEditorOptions, ValueEditorValidations} from '../kp-value-editor/kp-value-editor.component';
import {CustomValueEditorType} from '../aliases/kp-value-editor-aliases.service';
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
    public strategy: KpValueEditorForceSettingsMergeStrategy;

    public kpValueEditorForceSettingsComponentController: KpValueEditorForceSettingsComponentController;

    /*@ngInject*/
    constructor(private $log: ILogService) {
    }

    public $onInit(): void {
        if (this.validations) {
            this.$log.warn('Setting of validations is not implemented yet!');
        }

        this.kpValueEditorForceSettingsComponentController.addNewSettings(this.type ?? ALL_TYPES, this.options, this.validations, this.strategy ?? DEFAULT_MERGE_STRATEGY);
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
 * @param {KpValueEditorForceSettingsMergeStrategy=} strategy If some option is object, this param specifies merge strategy.
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
        validations: '<?',
        strategy: '@?'
    } as const;

    public priority = 20;

    public controller = KpValueEditorForceSettingComponentController;
}

interface KpValueEditorForceSettingComponentBindings<OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> {
    type?: CustomValueEditorType;
    options?: OPTIONS;
    validations?: VALIDATIONS;
    strategy?: KpValueEditorForceSettingsMergeStrategy;
}

/**
 * @ngdoc type
 * @name KpValueEditorForceSettingsMergeStrategy
 * @module angularjs-value-editor.force-settings
 *
 * @description
 * ```
 *  type KpValueEditorForceSettingsMergeStrategy = 'overwrite' | 'merge';
 * ```
 *
 * Default value: {@link DEFAULT_MERGE_STRATEGY}.
 */
export type KpValueEditorForceSettingsMergeStrategy = 'overwrite' | 'merge';

/**
 * @ngdoc constant
 * @name DEFAULT_MERGE_STRATEGY
 * @module angularjs-value-editor.force-settings
 *
 * @description
 * Default value for {@link KpValueEditorForceSettingsMergeStrategy}
 *
 * ```
 *  const DEFAULT_MERGE_STRATEGY: KpValueEditorForceSettingsMergeStrategy = 'overwrite';
 * ```
 */
export const DEFAULT_MERGE_STRATEGY: KpValueEditorForceSettingsMergeStrategy = 'overwrite';

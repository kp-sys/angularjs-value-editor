import {Component} from '@kpsys/angularjs-register';
import {ValueEditorOptions, ValueEditorValidations} from '../kp-value-editor/kp-value-editor.component';
import {CustomValueEditorType} from '../aliases/aliases.service';
import * as angular from 'angular';
import {IOnDestroy} from 'angular';
import {
    DEFAULT_MERGE_STRATEGY,
    KpValueEditorForceSettingsMergeStrategy
} from './kp-value-editor-force-setting.component';

export const ALL_TYPES = 'ALL';

class OptionsAndValidations<OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations> {

    public options: OPTIONS;
    public validations: VALIDATIONS;
    public strategy: KpValueEditorForceSettingsMergeStrategy;

    constructor(options: OPTIONS, validations: VALIDATIONS, strategy: KpValueEditorForceSettingsMergeStrategy) {
        this.options = options;
        this.validations = validations;
        this.strategy = strategy;
    }
}

export class KpValueEditorForceSettingsComponentController implements IOnDestroy {
    private settings: Map<CustomValueEditorType, OptionsAndValidations>;

    constructor() {
        this.settings = new Map();
    }

    public $onDestroy(): void {
        this.settings.clear();
        this.settings = undefined;
    }

    public getValidationsForTypeOrEmpty<VALIDATIONS extends ValueEditorOptions>(type: CustomValueEditorType): VALIDATIONS {
        return (this.settings.get(type)?.validations ?? {}) as VALIDATIONS;
    }

    public mergeOptionsForType<OPTIONS extends ValueEditorOptions = ValueEditorOptions>(type: CustomValueEditorType, options: OPTIONS): OPTIONS {
        const mergeStrategy = this.settings.get(type)?.strategy ?? DEFAULT_MERGE_STRATEGY;
        const mergeFunction = mergeStrategy === 'merge' ? angular.merge : Object.assign;
        return mergeFunction({}, options, this.getOptionsForTypeOrEmpty(type, mergeStrategy));
    }

    public addNewSettings<OPTIONS extends ValueEditorOptions = ValueEditorOptions, VALIDATIONS extends ValueEditorValidations = ValueEditorValidations>(type: CustomValueEditorType, options: OPTIONS, validations: VALIDATIONS, strategy: KpValueEditorForceSettingsMergeStrategy) {
        this.settings.set(type, new OptionsAndValidations<OPTIONS, VALIDATIONS>(options, validations, strategy));
    }

    private getOptionsForTypeOrEmpty<OPTIONS extends ValueEditorOptions>(type: CustomValueEditorType, mergeStrategy: KpValueEditorForceSettingsMergeStrategy): OPTIONS {
        const mergeFunction = mergeStrategy === 'merge' ? angular.merge : Object.assign;
        return mergeFunction({}, (this.settings.get(ALL_TYPES)?.options ?? {}), this.settings.get(type)?.options ?? {}) as OPTIONS;
    }
}

/**
 * @ngdoc component
 * @name kpValueEditorForceSettings
 * @module angularjs-value-editor.force-settings
 *
 * @description
 *  This component allows to force settings of value-editor.
 *
 * @example
 * <example name="valueEditorForceSettingsExample" module="valueEditorForceSettingsExample" frame-no-resize="true">
 *   <file name="index.html">
 *       <main>
 *            <kp-value-editor-force-settings>
 *                <kp-value-editor-force-setting type="text" options="{type: 'textarea'}"></kp-value-editor-force-setting>
 *
 *                <kp-value-editor type="'text'" ng-model="model" options="{type: 'text'}"></kp-value-editor>
 *            </kp-value-editor-force-settings>
 *            <div>{{model}}</div>
 *       </main>
 *   </file>
 *   <file name="script.js">
 *       angular.module('valueEditorForceSettingsExample', ['angularjs-value-editor']);
 *   </file>
 * </example>
 */
// tslint:disable-next-line:max-classes-per-file
export default class KpValueEditorForceSettingsComponent implements Component<any> {
    public static readonly componentName = 'kpValueEditorForceSettings';

    public transclude = true;

    public template = '<ng-transclude></ng-transclude>';

    public controller = KpValueEditorForceSettingsComponentController;
}

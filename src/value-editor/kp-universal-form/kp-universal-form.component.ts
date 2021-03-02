import NgModelConnector from '../utils/ng-model-connector';
import {
    IFormController,
    IInterpolateService,
    ILogService,
    IPostLink,
    ITemplateCacheService,
    ITimeoutService,
    ITranscludeFunction
} from 'angular';
import {ObjectValueEditorField} from '../meta-editors/object/object-value-editor-configuration.provider';
import {generateUuid} from '../utils/uuid-generator';
import {KpUniversalFormConfigurationService} from './kp-universal-form-configuration-provider';
import {ValueEditorSize} from '../kp-value-editor/kp-value-editor.component';
import {Component} from '@kpsys/angularjs-register';

/**
 * @ngdoc type
 * @name KpUniversalFormSettings
 * @module angularjs-value-editor
 *
 * @property {ObjectValueEditorField[]} fields Fields definition.
 * @property {string=} header Form header
 * @property {string=} footer Form footer
 *
 * @description
 *
 */
export interface KpUniversalFormSettings {
    fields: ObjectValueEditorField[];
    header?: string;
    footer?: string;
}

const TEMPLATE_PREFIX = 'valueEditor.universal-form';

export abstract class KpUniversalFormComponentController<MODEL = {}> extends NgModelConnector<MODEL> implements KpUniversalFormComponentBindings, IPostLink {
    public static TEMPLATE_URL = require('./kp-universal-form.tpl.pug');

    public templateUrl: string;
    public formSettings: KpUniversalFormSettings;
    public internalFormController: IFormController;
    public formName: string;
    public formId: string;
    public labelsWidth: number;
    public showErrors: boolean;
    public options: KpUniversalFormComponentOptions;
    public asyncValidationsModel: {};
    public configuration: KpUniversalFormConfigurationService;

    private transclusion: {
        beforeHeader: string
        afterHeader: string
        beforeFooter: string
        afterFooter: string
    };

    private uuid: string;

    /*@ngInject*/
    constructor(kpUniversalFormConfigurationService: KpUniversalFormConfigurationService,
                private $interpolate: IInterpolateService,
                private $templateCache: ITemplateCacheService,
                private $timeout: ITimeoutService,
                private $log: ILogService,
                private $transclude: ITranscludeFunction) {
        super();

        this.configuration = kpUniversalFormConfigurationService;
        this.uuid = generateUuid();
    }

    public $onInit(): void {
        super.$onInit();

        this.validateName();

        this.resolveTransclusion();

        this.updateTemplate();
    }

    public $postLink() {
        if (this.formController) {
            this.$timeout(() => this.formController({$formController: this.internalFormController}));
        }
    }

    public abstract formController(locals: { $formController: IFormController });

    public abstract onSubmit(locals: { $event: Event });

    public abstract ngChange();

    public onChange() {
        if (this.ngChange) {
            this.ngChange();
        }
    }

    public resolveAutofocusFirstField(): boolean {
        return this.options?.autofocusFirstField ?? this.configuration.autofocusFirstField;
    }

    private updateTemplate() {
        this.$templateCache.remove(this.templateUrl);
        const newTemplateName = `${TEMPLATE_PREFIX}_${this.uuid}_${new Date().valueOf()}`;
        const template = this.$templateCache.get<string>(KpUniversalFormComponentController.TEMPLATE_URL);
        const interpolated = this.$interpolate(template)({
            formName: this.formName,
            transclusion: this.transclusion
        });
        this.$templateCache.put(newTemplateName, interpolated);
        this.templateUrl = newTemplateName;
    }

    private validateName() {
        if (!this.formName) {
            this.formName = 'universalForm';
        }

        if (!/^[a-zA-Z0-9._]*$/.test(this.formName)) {
            this.$log.warn(`Invalid value of attribute name - ${this.formName}. Fallbacking to default name 'universalForm'.`);
        }
    }

    private resolveTransclusion() {
        this.transclusion = {
            beforeHeader: this.$transclude.isSlotFilled('beforeHeader') ? this.$transclude(null, null, 'beforeHeader').html() : null,
            afterHeader: this.$transclude.isSlotFilled('afterHeader') ? this.$transclude(null, null, 'afterHeader').html() : null,
            beforeFooter: this.$transclude.isSlotFilled('beforeFooter') ? this.$transclude(null, null, 'beforeFooter').html() : null,
            afterFooter: this.$transclude.isSlotFilled('afterFooter') ? this.$transclude(null, null, 'afterFooter').html() : null
        };
    }
}

/**
 * @ngdoc component
 * @name kpUniversalForm
 * @module angularjs-value-editor
 *
 * @param {KpUniversalFormSettings} formSettings Definition of form content.
 * @param {string=} formName Name of the form. Due to internal reason, it must be in accordance with `^[a-zA-Z0-9._]*$` regexp.
 * @param {string=} formId Id of the form.
 * @param {function(IFormController)=} formController Connecting to controller.
 * @param {function(IFormController)=} formController.$formController Exposed form controller.
 * @param {function(Event)=} onSubmit Function called on submit form.
 * @param {Event=} onSubmit.$event Submit event.
 * @param {ObjectValueEditorLabelsWidth=} labelsWidth See {@link ObjectValueEditorOptions}. Default value is `2`.
 * @param {boolean=} showErrors If `true` it displays all validation error messages.
 * @param {ValueEditorSize} size Bootstrap size of editor. Possible values are: `'md'`, `'sm'`, `'xs'`. Default value is: `'md'`.
 * @param {KpUniversalFormComponentOptions=} options Specific options for universal form.
 * @param {{}=} asyncValidationsModel Specify model for async validations. If defined, all async validations with set `wholeForm = true` use this model.
 *
 * @description
 * Component for generating forms by definition passed via `formSettings` attribute.
 *
 * It supports transclusion with following scopes:
 *  - `kpUniversalFormBeforeHeader`
 *  - `kpUniversalFormAfterHeader`
 *  - `kpUniversalFormBeforeFooter`
 *  - `kpUniversalFormAfterFooter`
 *
 * @example
 * <example name="universalFormExample" module="universalFormExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main class="container" ng-controller="controller as $ctrl">
 *              <kp-universal-form ng-model="model" name="myForm" form-settings="$ctrl.formSettings" form-controller="formController = $formController"></kp-universal-form>
 *              <div>Model:</div>
 *              <pre ng-bind="model | json"></pre>
 *              <div>Form controller:</div>
 *              <pre ng-bind="formController | json"></pre>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('universalFormExample', ['angularjs-value-editor'])
 *          .controller('controller', class {
 *              formSettings = {
 *                  header: '<h3>Header</h3>',
 *                  footer: '<hr><h4>Footer</h4>',
 *                  fields: [
 *                      {
 *                          label: 'Text',
 *                          fieldName: 'text',
 *                          editor: {
 *                              type: 'text',
 *                              editorName: 'text',
 *                              validations: {
 *                                  required: true
 *                              }
 *                          }
 *                      },
 *                      {
 *                          label: 'Number',
 *                          fieldName: 'number',
 *                          editor: {
 *                              type: 'number',
 *                              editorName: 'number'
 *                          }
 *                      },
 *                      {
 *                          label: 'Data',
 *                          fieldName: 'date',
 *                          editor: {
 *                              type: 'list',
 *                              editorName: 'dates',
 *                              options: {
 *                                  subEditorType: 'date',
 *                                  newItemPrototype: '',
 *                                  subEditorValidations: {
 *                                      required: true
 *                                  }
 *                              },
 *                              validations: {
 *                                  required: true
 *                              }
 *                          }
 *                      }
 *                  ]
 *              };
 *          });
 *     </file>
 * </example>
 */
export default class KpUniversalFormComponent implements Component<KpUniversalFormComponentBindings> {
    public static readonly componentName = 'kpUniversalForm';

    public require = {
        ngModelController: 'ngModel'
    };

    public transclude = {
        beforeHeader: '?kpUniversalFormBeforeHeader',
        afterHeader: '?kpUniversalFormAfterHeader',
        beforeFooter: '?kpUniversalFormBeforeFooter',
        afterFooter: '?kpUniversalFormAfterFooter'
    };

    public bindings = {
        formSettings: '<',
        formName: '@?',
        formId: '@?',
        formController: '&?',
        onSubmit: '&?',
        labelsWidth: '@?',
        showErrors: '<?',
        options: '<?',
        asyncValidationsModel: '<?',
        ngChange: '&?',
        size: '<?'
    } as const;

    public controller = KpUniversalFormComponentController;

    public template = '<ng-include src="$ctrl.templateUrl"></ng-include>';
}

/**
 * @ngdoc type
 * @name KpUniversalFormComponentOptions
 * @module angularjs-value-editor
 *
 * @property {boolean} preciseWatchForOptionsChanges {@link kpValueEditorConfigurationServiceProvider}
 * @property {boolean} autofocusFirstField {@link kpValueEditorConfigurationServiceProvider}
 *
 * @description
 * Options for {@link kpUniversalForm}
 *
 */
export interface KpUniversalFormComponentOptions {
    preciseWatchForOptionsChanges?: boolean;
    autofocusFirstField?: boolean;
}

export interface KpUniversalFormComponentBindings {
    formSettings: KpUniversalFormSettings;
    formName?: string;
    formId?: string;
    labelsWidth?: number;
    showErrors?: boolean;
    options?: KpUniversalFormComponentOptions;
    asyncValidationsModel?: {};
    size?: ValueEditorSize

    formController(locals: { $formController: IFormController });

    onSubmit(locals: { $event: Event });

    ngChange();
}

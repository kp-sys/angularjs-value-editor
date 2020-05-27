import NgModelConnector from '../common/ng-model-connector';
import {
    IFormController,
    IInterpolateService,
    ILogService,
    IPostLink,
    ITemplateCacheService,
    ITimeoutService
} from 'angular';
import {ObjectValueEditorField} from '../meta-editors/object/object-value-editor-configuration.provider';
import {generateUuid} from '../utils/uuid-generator';

/**
 * @ngdoc type
 * @name KpUniversalFormComponentSettings
 * @module angularjs-value-editor
 *
 * @property {ObjectValueEditorField[]} fields Fields definition.
 * @property {string=} header Form header
 * @property {string=} footer Form footer
 *
 * @description
 *
 */
export interface KpUniversalFormComponentSettings {
    fields: ObjectValueEditorField[];
    header?: string;
    footer?: string;
}

const TEMPLATE_PREFIX = 'valueEditor.universal-form';

export abstract class KpUniversalFormComponentController<MODEL = {}> extends NgModelConnector<MODEL> implements KpUniversalFormComponentBindings, IPostLink {
    public static TEMPLATE_URL = require('./kp-universal-form.tpl.pug');

    public templateUrl: string;
    public formSettings: KpUniversalFormComponentSettings;
    public internalFormController: IFormController;
    public name: string;
    public labelsWidth: number;
    public forceShowErrors: boolean;
    public options: KpUniversalFormComponentOptions;

    private uuid: string;

    /*@ngInject*/
    constructor(private $interpolate: IInterpolateService, private $templateCache: ITemplateCacheService, private $timeout: ITimeoutService, private $log: ILogService) {
        super();

        this.uuid = generateUuid();
    }

    public $onInit(): void {
        super.$onInit();

        this.validateName();

        this.updateTemplate();
    }

    public $postLink() {
        this.$timeout(() => this.formController({$formController: this.internalFormController}));
    }

    public abstract formController(locals: { $formController: IFormController });

    public abstract submitFunction(locals: { $event: Event });

    private updateTemplate() {
        this.$templateCache.remove(this.templateUrl);
        const newTemplateName = `${TEMPLATE_PREFIX}_${this.uuid}_${new Date().valueOf()}`;
        const template = this.$templateCache.get<string>(KpUniversalFormComponentController.TEMPLATE_URL);
        const interpolated = this.$interpolate(template)({
            name: this.name
        });
        this.$templateCache.put(newTemplateName, interpolated);
        this.templateUrl = newTemplateName;
    }

    private validateName() {
        if (!this.name) {
            this.name = 'universalForm';
        }

        if (!/^[a-zA-Z0-9._]*$/.test(this.name)) {
            this.$log.warn(`Invalid value of attribute name - ${this.name}. Fallbacking to default name 'universalForm'.`);
        }
    }
}

/**
 * @ngdoc component
 * @name kpUniversalForm
 * @module angularjs-value-editor
 *
 * @param {KpUniversalFormComponentSettings} formSettings Definition of form content.
 * @param {string=} name Name of the form. Due to internal reason, it must be in accordance with `^[a-zA-Z0-9._]*$` regexp.
 * @param {function(IFormController)=} formController Connecting to controller.
 * @param {function(IFormController)=} formController.$formController Exposed form controller.
 * @param {function(Event)=} submitFunction Function called on submit form.
 * @param {Event=} submitFunction.$event Submit event.
 * @param {ObjectValueEditorLabelsWidth=} labelsWidth See {@link ObjectValueEditorOptions}. Default value is `2`.
 * @param {boolean=} forceShowErrors If `true` it displays all validation error messages.
 * @param {KpUniversalFormComponentOptions=} options Specific options for universal form.
 *
 * @description
 * Component for generating forms by definition passed via `formSettings` attribute.
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
 *                          type: 'text',
 *                          editorName: 'text',
 *                          validations: {
 *                              required: true
 *                          }
 *                      },
 *                      {
 *                          label: 'Number',
 *                          type: 'number',
 *                          editorName: 'number'
 *                      },
 *                      {
 *                          label: 'Data',
 *                          type: 'list',
 *                          editorName: 'dates',
 *                          options: {
 *                              subEditorType: 'date',
 *                              newItemPrototype: '',
 *                              subEditorValidations: {
 *                                  required: true
 *                              }
 *                          },
 *                          validations: {
 *                              required: true
 *                          }
 *                      }
 *                  ]
 *              };
 *          });
 *     </file>
 * </example>
 */
export default class KpUniversalFormComponent {
    public static readonly componentName = 'kpUniversalForm';

    public require = {
        ngModelController: 'ngModel'
    };

    public bindings = {
        formSettings: '<',
        name: '@?',
        formController: '&?',
        submitFunction: '&?',
        labelsWidth: '@?',
        forceShowErrors: '<?',
        options: '<?'
    };

    public controller = KpUniversalFormComponentController;

    public template = '<ng-include src="$ctrl.templateUrl"></ng-include>';
}

/**
 * @ngdoc type
 * @name KpUniversalFormComponentOptions
 * @module angularjs-value-editor
 *
 * @property {boolean} preciseWatchForOptionsChanges {@link kpValueEditorConfigurationServiceProvider}
 *
 * @description
 * Options for {@link kpUniversalForm}
 *
 */
export interface KpUniversalFormComponentOptions {
    preciseWatchForOptionsChanges?: boolean;
}

export interface KpUniversalFormComponentBindings {
    formSettings: KpUniversalFormComponentSettings;
    name?: string;
    labelsWidth?: number;
    forceShowErrors?: boolean;
    options?: KpUniversalFormComponentOptions;

    formController(locals: { $formController: IFormController });

    submitFunction(locals: { $event: Event });
}

import AbstractValueEditorComponentController from './abstract-value-editor-component-controller';
import {ValueEditorOptions} from '../kp-value-editor/kp-value-editor.component';
import {IInterpolateService, IOnInit, ITemplateCacheService} from 'angular';
import {AbstractValueEditorConfigurationService} from './abstract-value-editor-configuration.provider';
import {AbstractValueEditorLocalizationService} from './abstract-value-editor-localization.provider';
import {generateUuid} from '../utils/uuid-generator';

/**
 * Abstract editor class which contains some helpers for managing and simplify template parsing.
 */
export default abstract class AbstractTemplateValueEditor<MODEL, OPTIONS extends ValueEditorOptions> extends AbstractValueEditorComponentController<MODEL, OPTIONS> implements IOnInit {
    /**
     * Pre-defined component template.
     * @type {string}
     */
    public static COMPONENT_TEMPLATE = '<ng-include src="$ctrl.templateUrl"></ng-include>';

    /**
     * Generate template URL for ng-include
     */
    protected templateUrl: string;
    protected uuid: string;

    #templateUpdated: boolean = false;

    constructor(
        protected baseTemplateUrl: string,
        private templatePrefix: string,
        private $interpolate: IInterpolateService,
        private $templateCache: ITemplateCacheService,
        protected configurationService: AbstractValueEditorConfigurationService<OPTIONS>,
        protected localizationService?: AbstractValueEditorLocalizationService<any>
    ) {
        super(configurationService, localizationService);

        this.uuid = generateUuid();
    }

    public $onInit(): void {
        super.$onInit();
    }

    public $postLink() {
        super.$postLink();

        if (!this.#templateUpdated) {
            this.updateTemplate();
        }
    }

    /**
     * This function returns model for template.
     * @returns {{}}
     */
    protected abstract getTemplateModel(): {};

    /**
     * Updates template
     */
    protected updateTemplate() {
        this.#templateUpdated = true;

        this.$templateCache.remove(this.templateUrl);
        const newTemplateName = `${this.templatePrefix}_${this.uuid}_${new Date().valueOf()}`;
        const template = this.$templateCache.get<string>(this.baseTemplateUrl);
        const interpolated = this.$interpolate(template)({
            ...this.getTemplateModel()
        });
        this.$templateCache.put(newTemplateName, interpolated);
        this.templateUrl = newTemplateName;
    }
}

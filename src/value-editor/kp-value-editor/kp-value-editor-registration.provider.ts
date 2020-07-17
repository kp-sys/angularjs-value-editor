import AliasesService, {CustomValueEditorType} from '../aliases/aliases.service';

/**
 * @ngdoc provider
 * @name kpValueEditorRegistrationServiceProvider
 * @module angularjs-value-editor
 *
 * @description
 * This provider is user for registering new value editor types.
 */
export default class KpValueEditorRegistrationServiceProvider {
    public static readonly providerName = 'kpValueEditorRegistrationService';

    /**
     * Map<type, selector>
     */
    private editors: Map<CustomValueEditorType, string>;

    constructor() {
        this.editors = new Map<CustomValueEditorType, string>();
    }

    /**
     * @ngdoc method
     * @name kpValueEditorRegistrationServiceProvider#registerEditor
     *
     * @param {CustomValueEditorType} type New value editor type.
     * @param {string} selector Value editor component element selector.
     *
     * @description
     * Registers new value editor component.
     *
     * `type` and `selector` must be unique.
     */
    public registerEditor(type: CustomValueEditorType, selector: string) {
        this.editors.forEach((value, key) => {
            if (key === type) {
                throw new Error(`Type '${type}' is already registered.`)
            }

            if (value === selector) {
                throw new Error(`Value editor component selector '${selector}' is already registered.`)
            }
        });

        this.editors.set(type, selector);
    }

    /*@ngInject*/
    protected $get(aliasesService: AliasesService): KpValueEditorRegistrationService {
        return {
            getSelectorForType: (type: CustomValueEditorType) => {
                if (aliasesService.isAlias(type)) {
                    type = aliasesService.getAlias(type);
                }

                if (!this.editors.has(type)) {
                    throw new Error(`Unknown value editor type: '${type}'`);
                }

                return this.editors.get(type);
            }
        };
    }
}

/**
 * @ngdoc service
 * @name kpValueEditorRegistrationService
 * @module angularjs-value-editor
 *
 * @description
 *
 */
export interface KpValueEditorRegistrationService {

    /**
     * @ngdoc method
     * @name kpValueEditorRegistrationService#getSelectorForType
     *
     * @param {CustomValueEditorType} type Value editor type. Aliases are supported.
     *
     * @returns {string} Value editor component selector.
     *
     * @description
     * Returns registered value editor component selector for dynamic create HTML tag as editor template.
     *
     * If no selector for type is found, it throws error.
     */
    getSelectorForType(type: CustomValueEditorType): string;
}

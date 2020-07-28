/**
 * @ngdoc service
 * @name AbstractValueEditorLocalizationService
 * @module angularjs-value-editor
 *
 * @description
 * Generic service for value editor localizations.
 */
export interface AbstractValueEditorLocalizationService<LOC extends ValueEditorLocalizations> {
    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#setLocalization
     * @module angularjs-value-editor
     *
     * @param {string} code Message code.
     * @param {string} message Localization message.
     *
     * @description
     * Sets one localization message to given parameter.
     */
    setLocalization<KEY extends keyof LOC>(code: KEY, message: LOC[KEY]): void;

    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#setAll
     * @module angularjs-value-editor
     *
     * @param {ValueEditorLocalizations} localizations
     *
     * @description
     * Sets localizations at once.
     */
    setAll(localizations: LOC): void;

    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#getLocalization
     * @module angularjs-value-editor
     *
     * @param {string} code Wanted localization code.
     *
     * @returns {string} Localization message.
     *
     * @description
     * Returns specific localization message.
     */
    getLocalization<KEY extends keyof LOC>(code: KEY): LOC[KEY] | KEY;

    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#getAll
     * @module angularjs-value-editor
     *
     * @returns {ValueEditorLocalizations} All messages.
     *
     * @description
     * Returns all localization messages.
     */
    getAll(): LOC;
}

/**
 * @ngdoc provider
 * @name AbstractValueEditorLocalizationProvider
 * @module angularjs-value-editor
 *
 * @abstract
 *
 * @description
 * All methods from {@link AbstractValueEditorLocalizationService} work well in this provider.
 */
export default abstract class AbstractValueEditorLocalizationProvider<LOC extends ValueEditorLocalizations> implements AbstractValueEditorLocalizationService<LOC> {
    private localizations: LOC;

    protected constructor(defaultLocalizations: Required<Readonly<LOC>>) {
        this.localizations = Object.assign({}, defaultLocalizations);
    }

    public setLocalization<KEY extends keyof LOC>(code: KEY, message: LOC[KEY]) {
        this.localizations[code] = message;
    }

    public setAll(localizations: LOC) {
        this.localizations = Object.assign({}, localizations);
    }

    public getLocalization<KEY extends keyof LOC>(code: KEY): LOC[KEY] | KEY {
        return this.localizations[code] ?? code;
    }

    public getAll(): LOC {
        return Object.assign({}, this.localizations);
    }

    protected $get(): AbstractValueEditorLocalizationService<LOC> {
        return this;
    }
}

/**
 * @ngdoc type
 * @name ValueEditorLocalizations
 * @module angularjs-value-editor
 *
 * @description
 * All value editor localizations must be object with all string typed properties.
 *
 * ```
 *      interface ValueEditorLocalizations {
 *          [key: string]: string;
 *      }
 * ```
 */
export interface ValueEditorLocalizations {
    [key: string]: string;
}

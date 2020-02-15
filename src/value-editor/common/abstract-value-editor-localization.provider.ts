/**
 * @ngdoc provider
 * @name AbstractValueEditorLocalizationProvider
 * @module angularjs-value-editor
 *
 * @abstract
 *
 * @description
 * Generic provider for value editor localizations.
 */
export default abstract class AbstractValueEditorLocalizationProvider<LOC extends ValueEditorLocalizations> {
    protected abstract localizations: LOC;

    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationProvider#setLocalization
     * @module angularjs-value-editor
     *
     * @param {string} code Message code.
     * @param {string} message Localization message.
     *
     * @description
     * Sets one localization message to given parameter.
     */
    public setLocalization<KEY extends keyof LOC>(code: KEY, message: LOC[KEY]) {
        this.localizations[code] = message;
    }

    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationProvider#setAll
     * @module angularjs-value-editor
     *
     * @param {ValueEditorLocalizations} localizations
     *
     * @description
     * Sets localizations at once.
     */
    public setAll(localizations: LOC) {
        this.localizations = localizations;
    }

    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationProvider#getLocalization
     * @module angularjs-value-editor
     *
     * @param {string} code Wanted localization code.
     *
     * @returns {string} Localization message.
     *
     * @description
     * Returns specific localization message.
     */
    public getLocalization<KEY extends keyof LOC>(code: KEY): LOC[KEY] {
        return this.localizations[code];
    }

    /**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationProvider#getAll
     * @module angularjs-value-editor
     *
     * @returns {ValueEditorLocalizations} All messages.
     *
     * @description
     * Returns all localization messages.
     */
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

/**
 * @ngdoc service
 * @name AbstractValueEditorLocalizationService
 * @module angularjs-value-editor
 *
 * @abstract
 *
 * @description
 * See {@link AbstractValueEditorLocalizationProvider}
 */
export type AbstractValueEditorLocalizationService<LOC extends ValueEditorLocalizations> = {
    [METHOD in keyof AbstractValueEditorLocalizationProvider<LOC>]: AbstractValueEditorLocalizationProvider<LOC>[METHOD];
}

/* tslint:disable:ban-types */
/**
 * @ngdoc provider
 * @name kpValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor
 *
 * @description
 * Provider for {@link kpValueEditorConfigurationService}
 */
import {CustomValueEditorType} from '../aliases/kp-value-editor-aliases.service';
import {Injectable} from 'angular';

/**
 * @ngdoc type
 * @name ValueEditorPreInitHook
 * @module angularjs-value-editor
 *
 * @property {function(): Promise} hook Hook implementation. It must return `Promise`.
 * @property {boolean} runOnce If it is one-time hook or if this hook should be triggered each time when editor is rendered.
 * @property {boolean} triggered If hook has been triggered.
 *
 * @description
 * Value editor pre-init hook configuration
 */
export interface ValueEditorPreInitHook {
    hook: Injectable<Function | ((...args: any[]) => Promise<void>)>;
    runOnce: boolean;
    triggered: boolean;
}

type ValueEditorPreInitHooks = {
    [EDITOR_TYPE in CustomValueEditorType]: ValueEditorPreInitHook[];
}

export default class KpValueEditorConfigurationServiceProvider {
    public static readonly providerName = 'kpValueEditorConfigurationService';
    #valueEditorPreInitHooks: ValueEditorPreInitHooks = {};
    #debugMode: boolean = false;
    #preciseWatchForOptionsChanges: boolean = false;
    #disableAutoWrapping: boolean = false;

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDebugMode
     *
     * @param {boolean} isEnabled
     *
     * @description
     * Enable / disable debug mode. It show / hide information section below value editor.
     */
    public setDebugMode(isEnabled: boolean) {
        this.#debugMode = isEnabled;
    }

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDebugMode
     *
     * @param {boolean} preciseWatchForOptionsChanges
     *
     * @description
     * It enables deep watching for changes in value editors options.
     * If watching for changes is not needed, it's recommended set it to `false` due to high system requirements.
     * (It makes deep equal of options in each digest cycle).
     */
    public setPreciseWatchForOptionsChanges(preciseWatchForOptionsChanges: boolean) {
        this.#preciseWatchForOptionsChanges = preciseWatchForOptionsChanges;
    }

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDisableAutoWrapping
     *
     * @param {boolean} disableAutoWrapping
     *
     * @description
     * If `true`, {@link errorMessages} directive will not wrap value editor, if its parent element isn't relatively positioned.
     */
    public setDisableAutoWrapping(disableAutoWrapping: boolean) {
        this.#disableAutoWrapping = disableAutoWrapping;
    }

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#addValueEditorPreInitHook
     *
     * @param {CustomValueEditorType | CustomValueEditorType[]} editor Value editor type.
     * @param {function(): Promise} hook Async hook. It must return `Promise`.
     * @param {boolean=} runOnce If it is one-time hook or if this hook should be triggered each time when editor is rendered. Default is `true`.
     *
     * @description
     * Set value editor pre-init hook. This hook is triggered before rendering of specific value editor and holds rendering until the hook is resolved.
     * If it takes too long ({@link showLoadingSpinnerDueToEditorHookDelay}), spinner is displayed.
     * Setting hook is good e.g. for load some needed dependencies, concretely for async import of `trumbowyg` in {@link htmlValueEditor}.
     */
    public addValueEditorPreInitHook(editor: CustomValueEditorType | CustomValueEditorType[], hook: Injectable<Function | ((...args: any[]) => PromiseLike<void>)>, runOnce: boolean = true) {
        if (!Array.isArray(editor)) {
            editor = [editor];
        }

        const valueEditorPreInitHook: ValueEditorPreInitHook = {
            hook,
            runOnce,
            triggered: false
        };

        editor.forEach((e) => {
            if (!this.#valueEditorPreInitHooks[e]) {
                this.#valueEditorPreInitHooks[e] = [];
            }

            this.#valueEditorPreInitHooks[e].push(valueEditorPreInitHook);
        });
    }

    protected $get(): KpValueEditorConfigurationService {
        return Object.defineProperties({}, {
            debugMode: {
                get: () => this.#debugMode
            },
            preciseWatchForOptionsChanges: {
                get: () => this.#preciseWatchForOptionsChanges
            },
            disableAutoWrapping: {
                get: () => this.#disableAutoWrapping
            },
            getPreInitHooksFor: {
                value: (type: CustomValueEditorType) => {
                    return this.#valueEditorPreInitHooks[type];
                }
            }
        });
    }
}

/**
 * @ngdoc service
 * @name kpValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @property {boolean} debugMode Show debug information
 * @property {boolean} preciseWatchForOptionsChanges
 * @property {boolean} disableAutoWrapping
 *
 * @description
 *
 * Default options:
 * ```
 *  {
 *      debugMode: false,
 *      preciseWatchForOptionsChanges: false,
 *      disableAutoWrapping: false
 *  }
 * ```
 */
export interface KpValueEditorConfigurationService {
    readonly debugMode: boolean;
    readonly preciseWatchForOptionsChanges: boolean;
    readonly disableAutoWrapping: boolean;

    /**
     * @ngdoc method
     * @name kpValueEditorConfigurationService#getPreInitHooksFor
     * @module angularjs-value-editor
     *
     * @return {ValueEditorPreInitHook[]} Hooks.
     *
     * @description
     * Return pre-init hooks for specified value editor.
     */
    getPreInitHooksFor(type: CustomValueEditorType): ValueEditorPreInitHook[];
}

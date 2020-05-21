import {ValueEditorBindings} from '../../src/value-editor/kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {IAugmentedJQuery, ICompileService, IFormController, IScope} from 'angular';
import {TValueEditorType} from '../../src/value-editor/typings';

function camelCaseToKebabCase(name) {
    return name.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}

/**
 * Helper for easy mocking of value-editor component
 */
export default class ValueEditorMocker<BINDINGS extends ValueEditorBindings = ValueEditorBindings> {
    private compiledElement: JQLite;
    private customTemplate: string = null;
    private postConstructHook: () => void;

    constructor(private $compile: ICompileService, private $scope: ScopeWithBindings<any, BINDINGS>) {
    }

    /**
     * Creates and compiles element with value-editor.
     * @param {TValueEditorType} type Value editor type.
     * @param {object} bindings Component bindings
     * @param {boolean=} attachToBody If `true`, element wil be attached to `body` element before compilation.
     * @returns {JQLite} Compiled element
     */
    public create(type: TValueEditorType, bindings?: BINDINGS, attachToBody?: boolean): HTMLElement {
        this.customTemplate = this.customTemplate || '';

        const template = this.getTemplate(type, bindings);

        const element = angular.element(template);

        if (attachToBody) {
            angular.element(document.body).append(element);
        }

        this.compiledElement = this.$compile(element)(this.$scope);
        this.$scope.$apply();

        if (this.postConstructHook && typeof this.postConstructHook === 'function') {
            this.postConstructHook();
        }

        return this.getCompiledElement().querySelector<HTMLElement>('kp-value-editor');
    }

    /**
     * Returns compiled HTML element
     * @returns {HTMLElement}
     */
    public getCompiledElement(): HTMLElement {
        return this.compiledElement[0];
    }

    /**
     * Find HTML input element
     * @returns {HTMLElement} Input element.
     */
    public getInputElement<T extends HTMLElement = HTMLInputElement>(additionalQuery?: string): T {
        let element = this.getCompiledElement();

        if (additionalQuery) {
            element = element.querySelector(additionalQuery);
        }
        return element.querySelector('[data-main-input]');
    }

    /**
     * Trigger custom event on input element.
     * @param {string} eventType Event name
     * @param {HTMLInputElement | IAugmentedJQuery} customInput Specify custom input element
     */
    public triggerHandlerOnInput(eventType: string, customInput?: HTMLInputElement | IAugmentedJQuery) {
        angular.element(customInput ?? this.getInputElement()).triggerHandler(eventType);
    }

    /**
     * Remove attached element from document
     */
    public detachElementFromDocument() {
        angular.element(this.compiledElement).remove();
    }

    public setPostConstructHook(postConstructHook: () => void) {
        this.postConstructHook = postConstructHook;
    }

    public setCustomTemplate(template: string) {
        if (this.customTemplate === '') {
            throw new Error('Custom template cannot be set after mock initialization (via create())');
        }

        this.customTemplate = template;
    }

    /**
     * Create HTML template from value editor type and bindings.
     * @param {TValueEditorType} type Value editor type.
     * @param {object} bindings Component bindings
     * @returns {string} HTML template.
     */
    private getTemplate(type: TValueEditorType, bindings: BINDINGS): string {
        let template = `<kp-value-editor type="'${type}'" ng-model="model" `;

        if (bindings) {
            const bindingsTemplates = [];
            for (const key in bindings) {
                if (Object.prototype.hasOwnProperty.call(bindings, key)) {
                    bindingsTemplates.push(`${camelCaseToKebabCase(key)}="${key}"`);
                    // @ts-ignore
                    this.$scope[key] = bindings[key];
                }
            }
            template += bindingsTemplates.join(' ');
        }

        template += '></kp-value-editor>';

        template = `
            <form name="form">
            ${this.customTemplate}
            ${template}
            </form>
        `;

        return template;
    }
}

export type ScopeWithBindings<MODEL, BINDINGS extends ValueEditorBindings = ValueEditorBindings> =
    IScope
    & { [K in keyof BINDINGS]: BINDINGS[K] }
    & { model: MODEL, form: IFormController };

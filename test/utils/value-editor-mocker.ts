import {TValueEditorType, ValueEditorBindings} from '../../src/value-editor/value-editor.component';
import * as angular from 'angular';
import {ICompileService, IScope} from 'angular';

/**
 * Helper for easy mocking of value-editor component
 */
export default class ValueEditorMocker<BINDINGS extends ValueEditorBindings = ValueEditorBindings> {
    private compiledElement: JQLite;

    constructor(private $compile: ICompileService, private $scope: ScopeWithBindings<any, BINDINGS>) {
    }

    /**
     * Creates and compiles element with value-editor.
     * @param {TValueEditorType} type Value editor type.
     * @param {object} bindings Component bindings
     * @returns {JQLite} Compiled element
     */
    public create(type: TValueEditorType, bindings?: BINDINGS): JQLite {

        const template = this.getTemplate(type, bindings);

        this.compiledElement = this.$compile(angular.element(template))(this.$scope);
        this.$scope.$apply();

        return this.compiledElement;
    }

    /**
     * Find HTML input element
     * @returns {HTMLElement} Input element.
     */
    public getInputElement<T extends HTMLElement>(): T {
        return this.compiledElement[0].querySelector('[data-main-input]');
    }

    /**
     * Trigger custom event on input element.
     * @param {string} eventType Event name
     */
    public triggerHandlerOnInput(eventType: string) {
        angular.element(this.compiledElement[0].querySelector('[data-main-input]')).triggerHandler(eventType);
    }

    /**
     * Create HTML template from value editor type and bindings.
     * @param {TValueEditorType} type Value editor type.
     * @param {object} bindings Component bindings
     * @returns {string} HTML template.
     */
    private getTemplate(type: TValueEditorType, bindings: BINDINGS): string {
        let template = `<kp-value-editor type="'${type}'" ng-model="model" status="status" `;

        if (bindings) {
            const bindingsTemplates = [];
            for (const key in bindings) {
                if (Object.prototype.hasOwnProperty.call(bindings, key)) {
                    bindingsTemplates.push(`${key}="${key}"`);
                    // @ts-ignore
                    this.$scope[key] = bindings[key];
                }
            }
            template += bindingsTemplates.join(' ');
        }

        template += '></kp-value-editor>';

        return template;
    }
}

export type ScopeWithBindings<MODEL, BINDINGS extends ValueEditorBindings = ValueEditorBindings> = IScope & {[K in keyof BINDINGS]: BINDINGS[K]} & {model: MODEL};

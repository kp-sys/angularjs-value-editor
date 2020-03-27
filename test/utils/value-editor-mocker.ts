import {TValueEditorType, ValueEditorBindings} from '../../src/value-editor/value-editor.component';
import * as angular from 'angular';
import {ICompileService, IFormController, IScope} from 'angular';

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
     * @param {boolean=} attachToBody If `true`, element wil be attached to `body` element before compilation.
     * @returns {JQLite} Compiled element
     */
    public create(type: TValueEditorType, bindings?: BINDINGS, attachToBody?: boolean): JQLite {

        const template = this.getTemplate(type, bindings);

        const element = angular.element(template);

        if (attachToBody) {
            angular.element(document.body).append(element);
        }

        this.compiledElement = this.$compile(element)(this.$scope);
        this.$scope.$apply();

        const editorReference = this.compiledElement[0].querySelector('kp-value-editor');

        return angular.element(editorReference) as JQLite;
    }

    /**
     * Find HTML input element
     * @returns {HTMLElement} Input element.
     */
    public getInputElement<T extends HTMLElement = HTMLInputElement>(): T {
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
     * Remove attached element from document
     */
    public detachElementFromDocument() {
        angular.element(this.compiledElement).remove();
    }

    /**
     * Create HTML template from value editor type and bindings.
     * @param {TValueEditorType} type Value editor type.
     * @param {object} bindings Component bindings
     * @returns {string} HTML template.
     */
    private getTemplate(type: TValueEditorType, bindings: BINDINGS): string {
        let template = `<kp-value-editor type="'${type}'" ng-model="model" status="status" `;

        const nonExpressionFields = ['editorId', 'name', 'placeholder'];

        if (bindings) {
            const bindingsTemplates = [];
            for (const key in bindings) {
                if (Object.prototype.hasOwnProperty.call(bindings, key)) {
                    if(nonExpressionFields.includes(key)) {
                        bindingsTemplates.push(`${key}="${bindings[key]}"`);
                    } else {
                        bindingsTemplates.push(`${key}="${key}"`);
                    }
                    // @ts-ignore
                    this.$scope[key] = bindings[key];
                }
            }
            template += bindingsTemplates.join(' ');
        }

        template += '></kp-value-editor>';

        template = `
            <form name="form">
            ${template}
            </form>
        `;

        return template;
    }
}

export type ScopeWithBindings<MODEL, BINDINGS extends ValueEditorBindings = ValueEditorBindings> = IScope & {[K in keyof BINDINGS]: BINDINGS[K]} & {model: MODEL, form: IFormController};

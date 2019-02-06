import {TValueEditorType, ValueEditorBindings} from '../../src/value-editor/value-editor.component';
import * as angular from 'angular';
import {ICompileService, IScope} from 'angular';

export default class ValueEditorMocker<BINDINGS extends ValueEditorBindings = ValueEditorBindings> {
    private compiledElement: JQLite;

    constructor(private $compile: ICompileService, private $scope: ScopeWithBindings<any, BINDINGS>) {
    }

    public create(type: TValueEditorType, bindings?: BINDINGS): JQLite {

        const template = this.getTemplate(type, bindings);

        this.compiledElement = this.$compile(angular.element(template))(this.$scope);
        this.$scope.$apply();

        return this.compiledElement;
    }

    public getInputElement<T extends HTMLElement>(): T {
        return this.compiledElement[0].querySelector('[data-main-input]');
    }

    public triggerHandlerOnInput(eventType: string) {
        angular.element(this.compiledElement[0].querySelector('[data-main-input]')).triggerHandler(eventType);
    }

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

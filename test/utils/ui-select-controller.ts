import * as angular from 'angular';

export default class UISelectController {
    private readonly multiselectable: boolean;

    constructor(private element: HTMLElement) {
        this.multiselectable = !!element.classList.contains('ui-select-multiple');
    }

    public isOpen(): boolean {
        return this.element.classList.contains('open');
    }

    public openUiSelect(): this {
        if (this.multiselectable) {
            this.element.querySelector<HTMLDivElement>('.ui-select-search').click();

            if (!this.isOpen()) {
                this.openUiSelect();
            }
        } else {
            this.element.querySelector<HTMLDivElement>('.ui-select-toggle').click();
        }

        return this;
    }

    public selectNthOption(index: number): this {
        const options: NodeList = this.element.querySelectorAll<HTMLDivElement>('.ui-select-choices-row');
        if (!options || options.length === 0) {
            throw new Error('No options found');
        }

        if (!options[index]) {
            throw new Error(`Option number ${index} not found`);
        }

        (options[index] as HTMLDivElement).click();

        return this;
    }

    public openAndSelectNthOption(index: number): this {
        this.openUiSelect();
        return this.selectNthOption(index);
    }

    public getSingleSelectedValueAsText(): string {
        return this.element.querySelector<HTMLSpanElement>('.ui-select-match-text').textContent;
    }

    public getMultipleSelectedValuesAsTexts(): string[] {
        return Array.from(this.element.querySelectorAll<HTMLSpanElement>('.ui-select-match-item [uis-transclude-append]'))
            .map((element) => element.textContent);
    }

    public getOptionsCount(): number {
        return this.element.querySelectorAll<HTMLDivElement>('.ui-select-choices-row').length;
    }

    public getOptionsText(): string[] {
        return Array.from(this.element.querySelectorAll<HTMLDivElement>('.ui-select-choices-row')).map((element) => element.textContent);
    }

    public setSearchPhrase(phrase: string): this {
        const input = this.element.querySelector<HTMLInputElement>('.ui-select-search');

        input.value = phrase;
        angular.element(input).triggerHandler('input');

        return this;
    }
}

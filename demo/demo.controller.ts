import {Identified} from '../src/value-editor/editors/index-selection/index-selection.value-editor.component';
import bind from 'bind-decorator';
import {ITimeoutService} from 'angular';

export default class DemoController<T extends Identified<number>> {

    public items: Identified<number>[] = [
        {
            id: 1,
            text: 'one'
        },
        {
            id: 2,
            text: 'two'
        },
        {
            id: 3,
            text: 'three'
        },
        {
            id: 4,
            text: 'four'
        }
    ];

    /*@ngInject*/
    constructor(private $timeout: ITimeoutService) {
    }

    @bind
    public requestFunction() {
        return new Promise((resolve) => {
            this.$timeout(() => resolve(this.items.map((item) => item.text)),
                1000
            );
        });
    };
}

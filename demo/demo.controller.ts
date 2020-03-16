import {ITimeoutService} from 'angular';
import bind from 'bind-decorator';

export default class DemoController {
    public model: number;

    /*@ngInject*/
    constructor(private $timeout: ITimeoutService) {
    }

    @bind
    public generate() {
        return new Promise(((resolve, reject) => {
            this.$timeout(() => reject('generatedValue'), 1000)
        }));
    }
}

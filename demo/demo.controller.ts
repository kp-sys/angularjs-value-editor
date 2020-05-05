export default class DemoController {

    public value = {from: 22, to: 55};

    public setValue() {
        this.value = Object.assign({}, this.value);
    }

}

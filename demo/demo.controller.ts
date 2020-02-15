export default class DemoController {
    public acceptableValues = [{x: 'a'}, {x: 'b'}, {x: 'c'}, {x: 'd'}, {x: 'e'}, {x: 'f'}, {x: 'g'}, {x: 'h'}];
    public comp = (e1, e2) => e1.x.localeCompare(e2.x) * -1
}

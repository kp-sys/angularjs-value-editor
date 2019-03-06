import DateTimePickerController, {ViewType} from '../src/value-editor/editors/date/datetimepicker-controller';

export default class DemoController {
}

// @ts-ignore
window.c = new DateTimePickerController(document.querySelector('#picker'));
// @ts-ignore
window.DateTimePickerController = DateTimePickerController;
// @ts-ignore
window.ViewType = ViewType;

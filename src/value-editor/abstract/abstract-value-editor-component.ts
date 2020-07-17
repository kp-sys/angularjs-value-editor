import KpValueEditorComponent from '../kp-value-editor/kp-value-editor.component';

export default abstract class AbstractValueEditorComponent {
    public require = {
        ngModelController: 'ngModel',
        valueEditorController: `^${KpValueEditorComponent.componentName}`
    };
}

import AcceptableValueEditorComponent, {AcceptableValueEditorComponentController} from './acceptable.value-editor.component';
import * as angular from 'angular';
import {IAttributes, IAugmentedJQuery, IScope} from 'angular';
import {UndocumentedAcceptableValueEditorInternalOptions} from './acceptable-value-editor-configuration.provider';
import KpValueEditorComponent, {KpValueEditorComponentController} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc directive
 * @name disableNgAnimate
 * @module angularjs-value-editor.acceptable
 *
 * @description
 *
 */
export default class DisableNganimateDirective {
    public static readonly directiveName = 'disableNgAnimate';

    public restrict = 'A';

    public require = [`^^${AcceptableValueEditorComponent.componentName}`, 'uiSelect', `^^${KpValueEditorComponent.componentName}`];

    /*@ngInject*/
    constructor(private $animate: angular.animate.IAnimateService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [acceptableValueEditorComponentController, uiSelectController, kpValueEditorComponentController]: [AcceptableValueEditorComponentController<any>, any, KpValueEditorComponentController]) {

        const resolveNgAnimate = () => {
            if ((acceptableValueEditorComponentController.options as unknown as UndocumentedAcceptableValueEditorInternalOptions).__forceDisableNgAnimate) {
                uiSelectController.$animate = null;
            } else if (uiSelectController.$animate === null && this.$animate) {
                uiSelectController.$animate = this.$animate;
            }
        }

        kpValueEditorComponentController.addOptionsChangeListener(resolveNgAnimate.bind(this));

        resolveNgAnimate();
    }
}

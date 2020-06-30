import * as angular from 'angular';
import {IAttributes, IAugmentedJQuery, IScope} from 'angular';
import KpValueEditorComponent, {KpValueEditorComponentController} from '../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc directive
 * @name disableNgAnimate
 * @module angularjs-value-editor
 *
 * @restrict A
 * @element ui-select
 *
 * @description
 * Fixes bug in ui-select consisting of setting `opacity: 0` and not setting `opacity: 1` if `ngAnimate` is present and disabled by `classNameFilter`.
 */
export default class DisableNgAnimateDirective {
    public static readonly directiveName = 'disableNgAnimate';

    public restrict = 'A';

    public require = ['uiSelect', `^^${KpValueEditorComponent.componentName}`];

    /*@ngInject*/
    constructor(private $animate: angular.animate.IAnimateService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, [uiSelectController, kpValueEditorComponentController]: [any, KpValueEditorComponentController]) {

        const resolveNgAnimate = () => {
            if ((kpValueEditorComponentController.valueEditorInstance.options as unknown as UndocumentedDisableNgAnimateValueEditorInternalOption).__forceDisableNgAnimate) {
                uiSelectController.$animate = null;
            } else if (uiSelectController.$animate === null && this.$animate) {
                uiSelectController.$animate = this.$animate;
            }
        }

        kpValueEditorComponentController.addOptionsChangeListener(resolveNgAnimate.bind(this));

        resolveNgAnimate();
    }
}

export interface UndocumentedDisableNgAnimateValueEditorInternalOption {
    // if true, it force to not using ngAnimate, due to some special technical issues, specially if ngAnimate is present
    // and classNameFilter is set, uiSelect does not showing options.
    __forceDisableNgAnimate: boolean;
}

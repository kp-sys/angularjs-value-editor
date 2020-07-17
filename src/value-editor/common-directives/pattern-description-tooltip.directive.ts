import {IAttributes, IAugmentedJQuery, ICompileService, IScope} from 'angular';
import {ValueEditorLocalizations} from '../abstract/abstract-value-editor-localization.provider';
import {KpValueEditorComponentController} from '../kp-value-editor/kp-value-editor.component';

export interface PatternDescriptionLocalization extends ValueEditorLocalizations {
    patternDescription?;
}

/**
 * @ngdoc directive
 * @name patternDescriptionTooltip
 * @module angularjs-value-editor
 *
 * @requires ^^kpValueEditor
 *
 * @description
 * This directive adds tooltip on input, if valueEditor has defined non-empty localization named `patternDescription`.
 */
export default class PatternDescriptionTooltipDirective {
    public static readonly directiveName = 'patternDescriptionTooltip';

    public restrict = 'A';
    public terminal = true;
    public priority = 800;

    public require = '^^kpValueEditor';

    /*@ngInject*/
    constructor(private $compile: ICompileService) {
    }

    public link($scope: IScope, $element: IAugmentedJQuery, $attrs: IAttributes, kpValueEditorController: KpValueEditorComponentController) {
        $element.removeAttr($attrs[PatternDescriptionTooltipDirective.directiveName]);

        const patternDescription = (kpValueEditorController.localizations as PatternDescriptionLocalization)?.patternDescription;

        if (patternDescription) {
            $attrs.$set('uib-tooltip', patternDescription);
            $attrs.$set('tooltip-placement', 'top-left');
            $attrs.$set('tooltip-trigger', `'focus'`);
        }

        this.$compile($element)($scope);
    }
}

import {IDirective} from 'angular';
import {AcceptableValueEditorLocalizationsService} from './acceptable-value-editor-localizations.provider';
import {decorateIsDisabledFunctionInController} from './acceptable-value-editor.utils';

/**
 * @ngdoc service
 * @name uiSelectMultipleDirectiveDecorator
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * This decorator modifies placeholder behaviour in multiselectable ui-select. In original, placeholder disappears if some values is selected,
 * but empty space under items is confusing, so in terms of UX, it is better to leave placeholder visible always.
 * If all items are selected, it shows `allSelected` localization from {@link AcceptableValueEditorLocalizations}
 */

/*@ngInject*/
export default function uiSelectMultipleDirectiveDecorator($delegate: [IDirective], acceptableValueEditorLocalizationsService: AcceptableValueEditorLocalizationsService) {

    const directive = $delegate[0];

    const link = directive.link;

    directive.require = ['^uiSelect', '^ngModel', 'uiSelectMultiple'];

    $delegate[0].compile = () => function ($scope, $element, $attrs, controllers) {
        (link as () => void).apply(this, arguments);

        const $select = controllers[0];
        const uiSelectMultipleDirectiveController = controllers[2];

        uiSelectMultipleDirectiveController.getPlaceholder = () => {
            if ($select.items.length === 0) {
                return acceptableValueEditorLocalizationsService.getLocalization('allSelected');
            }

            return $select.placeholder;
        };

        decorateIsDisabledFunctionInController($select);
    };

    return $delegate;
}

uiSelectMultipleDirectiveDecorator.decoratorName = 'uiSelectMultipleDirective';

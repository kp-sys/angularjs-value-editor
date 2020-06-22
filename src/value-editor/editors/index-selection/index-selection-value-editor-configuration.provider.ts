import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';
import * as angular from 'angular';
import {Identified} from './index-selection.value-editor.component';

/**
 * @ngdoc type
 * @name IndexSelectionValueEditorOptions
 * @module angularjs-value-editor.index-selection
 *
 * @template ID
 * @template VALUE
 *
 * @property {VALUE[]} items Array of predefined values.
 * @property {string} optionsTemplate Angular template for displaying options. Current option is accessible via `$item` variable name.
 * @property {function(ID, VALUE): boolean} equalityComparator If defined, options will compared with this comparator. It is comparing model and selecting item.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link indexSelectionValueEditorDefaultOptions}
 */
export interface IndexSelectionValueEditorOptions<ID, VALUE extends Identified<ID> = Identified<ID>> extends ValueEditorOptions {
    items: VALUE[];
    optionsTemplate?: string;
    equalityComparator?: (model: [ID], item: VALUE) => boolean;
}

/**
 * @ngdoc constant
 * @name indexSelectionValueEditorDefaultOptions
 * @module angularjs-value-editor.index-selection
 *
 * @description
 * For description see {@link IndexSelectionValueEditorOptions}
 *
 * ```javascript
 *  {
 *      items: [],
 *      optionsTemplate: '{{$item}}',
 *      equalityComparator: (model, item) => angular.equals(Array.isArray(model) ? model[0] : model, item.id)
 *  }
 * ```
 */
export const INDEX_SELECTION_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<IndexSelectionValueEditorOptions<any, Identified>> = {
    items: [],
    optionsTemplate: '{{$item}}',
    equalityComparator: (model, item) => angular.equals(Array.isArray(model) ? model[0] : model, item.id)
};

/**
 * @ngdoc provider
 * @name indexSelectionValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.index-selection
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link indexSelectionValueEditorDefaultOptions}
 */
export default class IndexSelectionValueEditorConfigurationServiceProvider<ID, VALUE extends Identified<ID>> extends AbstractValueEditorConfigurationProvider<IndexSelectionValueEditorOptions<ID, VALUE>> {
    public static readonly providerName = 'indexSelectionValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, indexSelectionValueEditorDefaultOptions: DefaultOptions<IndexSelectionValueEditorOptions<ID, VALUE>>) {
        super(aliasesServiceProvider, indexSelectionValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name indexSelectionValueEditorConfigurationService
 * @module angularjs-value-editor.index-selection
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link indexSelectionValueEditorDefaultOptions}
 */
export interface IndexSelectionValueEditorConfigurationService<ID, VALUE extends Identified<ID>> extends AbstractValueEditorConfigurationService<IndexSelectionValueEditorOptions<ID, VALUE>> {
}

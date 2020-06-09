import {IFilterService} from 'angular';

function isBlank(search: string): boolean {
    return typeof search === 'undefined' || search === null || search === '';
}

/**
 * @ngdoc filter
 * @name nullAwareFilter
 * @module angularjs-value-editor.acceptable
 *
 * @template T
 *
 * @param {T[]} items Array of items
 * @param {string} search Filter expression
 *
 * @description
 * It is almost classic angular filter `filter`, but if search is null it returns original data.
 */

/*@ngInject*/
export default function nullAwareFilter<T>($filter: IFilterService): (items: T[], search?: string) => T[] {
    return (items: T[], search?: string): T[] => {
        return isBlank(search) ? items : $filter('filter')(items, search);
    };
}

nullAwareFilter.filterName = 'nullAwareFilter';

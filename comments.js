/**
 * Abstract editor class which contains some helpers for managing and simplify template parsing.
 */
/**
     * Pre-defined component template.
     * @type {string}
     */
/**
     * Generate template URL for ng-include
     */
/**
     * This function returns model for template.
     * @returns {{}}
     */
/**
     * Updates template
     *//**
 * Abstract base class for general value-editor features.
 *
 * @template OPTIONS
 */
/* If initial options are not defaults, trigger options change.*/
/**
     * This method changes options.
     * This method is called by KpValueEditorComponentController::processOptionsChange(), don't use it by own.
     * @param {OPTIONS} newOptions
     * @param {OPTIONS} oldOptions
     * @param {PropertyChangeDetection} whatChanged
     */
/**
     * Simplifies localization. No need to call localization service.
     * @param {string} code Message code.
     * @returns {string} Localized message.
     */
/* istanbul ignore else */
/**
     * Return `true` if model is empty.
     *
     * @template MODEL
     *
     * @param {MODEL=} modelValue You can insert custom model value. If not specified, internal model used.
     * @return {boolean}
     */
/**
     * This method is called always, when value editor options is changed with old and new options object merged with default options.
     * @param {OPTIONS} newOptions New options.
     * @param {OPTIONS} oldOptions Old options.
     * @param {PropertyChangeDetection<OPTIONS>} optionsChangeDetection Object whose keys are name of changed properties and value is boolean status of change.
     */
/* tslint:disable-next-line:no-empty*/
/**
     * Every editor must have defined empty model. It is important for `emptyAsNull` functionality (for now...).
     * @returns {MODEL}
     */
/*@ngInject*//*@ngInject*/
/*@ngInject*/
/* try to change options via reference*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*//**
 * @ngdoc service
 * @name AbstractValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @template CONFIGURATION
 *
 * @abstract
 *
 * @description
 * Abstract service for configuring editors options.
 *
 * The generic parameter `CONFIGURATION` is current value editor options type.
 */
/**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#forAlias
     * @module angularjs-value-editor
     *
     * @param {CustomValueEditorType} alias Alias
     *
     * @returns {ConfigurationBuilder<CONFIGURATION>} Builder
     *
     * @description
     * This method is used for aliasing configuration.
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#getDefaults
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Default value editor options.
     *
     * @description
     * Returns default value editor options.
     *
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#getConfiguration
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Current value editor options.
     *
     * @description
     * Returns current value editor options.
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#setConfiguration
     * @module angularjs-value-editor
     *
     * @param {Partial<CONFIGURATION>} configuration New value editor configuration.
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete new value editor configuration.
     *
     * @description
     * Sets new value editor configuration.
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#setAliasedConfiguration
     * @module angularjs-value-editor
     *
     * @param {CustomValueEditorType} alias Alias
     * @param {Partial<CONFIGURATION>} configuration New value editor configuration.
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete new value editor configuration for specified alias.
     *
     * @description
     * Sets new value editor configuration for specific alias.
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorConfigurationService#getAliasedConfiguration
     * @module angularjs-value-editor
     *
     * @param {CustomValueEditorType} alias Alias
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete value editor configuration for specified alias.
     *
     * @description
     * Get value editor configuration for specific alias.
     */
/**
 * @ngdoc provider
 * @name AbstractValueEditorConfigurationProvider
 * @module angularjs-value-editor
 *
 * @template CONFIGURATION
 *
 * @description
 * All methods from {@link AbstractValueEditorConfigurationService} is available in this provider.
 */
/**
 * @ngdoc type
 * @name ConfigurationBuilder
 * @module angularjs-value-editor
 *
 * @template CONFIGURATION
 *
 * @description
 * Methods for setting and getting configuration.
 */
/**
     * @ngdoc method
     * @name ConfigurationBuilder#getConfiguration
     * @module angularjs-value-editor
     *
     * @returns {DefaultOptions<CONFIGURATION>} Current value editor options.
     *
     * @description
     * Returns current value editor options.
     *
     * {@link  AbstractValueEditorConfigurationProvider#getConfiguration}
     */
/**
     * @ngdoc method
     * @name ConfigurationBuilder#setConfiguration
     * @module angularjs-value-editor
     *
     * @param {Partial<CONFIGURATION>} configuration New value editor configuration.
     *
     * @returns {DefaultOptions<CONFIGURATION>} Complete new value editor configuration.
     *
     * @description
     * Sets new value editor configuration.
     *
     * {@link  AbstractValueEditorConfigurationProvider#setConfiguration}
     *//*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*//**
 * @ngdoc service
 * @name AbstractValueEditorLocalizationService
 * @module angularjs-value-editor
 *
 * @description
 * Generic service for value editor localizations.
 */
/**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#setLocalization
     * @module angularjs-value-editor
     *
     * @param {string} code Message code.
     * @param {string} message Localization message.
     *
     * @description
     * Sets one localization message to given parameter.
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#setAll
     * @module angularjs-value-editor
     *
     * @param {ValueEditorLocalizations} localizations
     *
     * @description
     * Sets localizations at once.
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#getLocalization
     * @module angularjs-value-editor
     *
     * @param {string} code Wanted localization code.
     *
     * @returns {string} Localization message.
     *
     * @description
     * Returns specific localization message.
     */
/**
     * @ngdoc method
     * @name AbstractValueEditorLocalizationService#getAll
     * @module angularjs-value-editor
     *
     * @returns {ValueEditorLocalizations} All messages.
     *
     * @description
     * Returns all localization messages.
     */
/**
 * @ngdoc provider
 * @name AbstractValueEditorLocalizationProvider
 * @module angularjs-value-editor
 *
 * @abstract
 *
 * @description
 * All methods from {@link AbstractValueEditorLocalizationService} work well in this provider.
 */
/**
 * @ngdoc type
 * @name ValueEditorLocalizations
 * @module angularjs-value-editor
 *
 * @description
 * All value editor localizations must be object with all string typed properties.
 *
 * ```
 *      interface ValueEditorLocalizations {
 *          [key: string]: string;
 *      }
 * ```
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.aliases
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Support for editor types aliasing
 *//*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*//**
 * @ngdoc type
 * @name CustomValueEditorType
 * @module angularjs-value-editor.aliases
 *
 * @requires TValueEditorType
 *
 * @description
 * ```js
 *  type CustomValueEditorType = TValueEditorType | string
 * ```
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name kpValueEditorAliasesService
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Service for working with editor aliases.
 */
/**
     * @ngdoc method
     * @name kpValueEditorAliasesService#getAlias
     *
     * @param {CustomValueEditorType} alias Get alias settings.
     *
     * @returns {AliasDefinition} Alias definition.
     *
     * @description
     * Return alias definition.
     */
/**
     * @ngdoc method
     * @name kpValueEditorAliasesService#isAlias
     *
     * @param {CustomValueEditorType} type Tested editor type.
     *
     * @returns {boolean} `true` if type is alias.
     *
     * @description
     * Test if type is alias.
     */
/**
 * @ngdoc provider
 * @name kpValueEditorAliasesServiceProvider
 * @module angularjs-value-editor.aliases
 *
 * @description
 * Provider for define aliases.
 */
/**
     * @ngdoc method
     * @name kpValueEditorAliasesServiceProvider#addAlias
     *
     * @param {CustomValueEditorType} aliasTypeName New alias.
     * @param {CustomValueEditorType} editorType Existing aliased editor.
     *
     * @returns {AliasesServiceProviderBuildOptions}
     *
     * @description
     * Add new alias.
     */
/**
     * @ngdoc method
     * @name kpValueEditorAliasesServiceProvider#removeAlias
     *
     * @param {CustomValueEditorType} aliasTypeName Removing alias.
     *
     * @description
     * Remove alias.
     *//**
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
/*@ngInject*/
/* if true, it force to not using ngAnimate, due to some special technical issues, specially if ngAnimate is present*/
/* and classNameFilter is set, uiSelect does not showing options.*//**
 * @ngdoc directive
 * @name patternDescriptionTooltip
 * @module angularjs-value-editor
 *
 * @requires ^^kpValueEditor
 *
 * @description
 * This directive adds tooltip on input, if valueEditor has defined non-empty localization named `patternDescription`.
 */
/*@ngInject*//**
 * @ngdoc directive
 * @name acceptableRootRequiredValidations
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 *
 *//* tslint:disable:ban-types */
/**
 * @ngdoc type
 * @name AcceptableRootValueEditorOptions
 * @module angularjs-value-editor.acceptable-root
 *
 * @template MODEL
 *
 * @property {MODEL} acceptableValue Tree of acceptable values. Every node should have array of child nodes in property `children`.
 * @property {boolean} multiselect If `true`, it will be multiselectable.
 * @property {MODEL[]} disabledItems Disabled items.
 * @property {Injectable<Function>} equalityComparator
 * ```
 * function(...args: any[]) => boolean
 * ```
 * Custom equality comparator as angularjs injectable function.
 *
 * | Injectable&nbsp;argument&nbsp;name | Description  |
 * | ------------------------ | ---------------------- |
 * | `$element1`  | Element 1                          |
 * | `$element2`  | Element 2                          |
 *
 * @property {string} optionsTemplate Angular template for displaying value in tree. Current option is accessible via `$node` variable name.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link acceptableRootValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name acceptableRootValueEditorDefaultOptions
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * For description see {@link AcceptableRootValueEditorOptions}
 *
 * ```javascript
 *  {
 *      acceptableValue: null,
 *      multiselect: false,
 *      disabledItems: [],
 *      equalityComparator: angular.equals,
 *      optionsTemplate: '{{$node}}'
 *  }
 * ```
 */
/*@ngInject*/
/**
 * @ngdoc provider
 * @name acceptableRootValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link acceptableRootValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name acceptableRootValueEditorConfigurationService
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link acceptableRootValueEditorDefaultOptions}
 *//**
 * @ngdoc provider
 * @name acceptableRootValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * See {@link acceptableRootValueEditorLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name acceptableRootValueEditorLocalizationsService
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name AcceptableRootValueEditorLocalizations
 * @module angularjs-value-editor.acceptable-root
 *
 * @param {string} cannotSelect
 * @param {string} showAll
 * @param {string} deselectAll
 * @param {string} selectAll
 *
 *
 * @description
 * Default localizations: {@link acceptableRootValueEditorDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name acceptableRootValueEditorDefaultLocalizations
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 * ```
 * {
 *      cannotSelect: '(cannot select)',
 *      showAll: 'Show all',
 *      deselectAll: 'Deselect all',
 *      selectAll: 'Select all'
 * }
 * ```
 *//* istanbul ignore file */
/* neni cas... :-(*/
/*@ngInject*/
/* expanded is always first level*/
/**
 * @ngdoc component
 * @name acceptableRootValueEditor
 * @module angularjs-value-editor.acceptable-root
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `any | any[]`
 *
 *
 * Value editor for tree selection.
 *
 * It has two aliases:
 *
 *  - `single-acceptable-root`
 *  - `multiple-acceptable-root`
 *
 * Supported options: {@link type:AcceptableRootValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="acceptableRootValueEditorExample" module="acceptableRootValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="ctrl as $ctrl">
 *              <kp-value-editor type="'multiple-acceptable-root'" ng-model="model" options="{acceptableValue: $ctrl.acceptableValue, optionsTemplate: '{{$node.text}}'}"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('acceptableRootValueEditorExample', ['angularjs-value-editor'])
 *          .controller('ctrl', class {
 *              acceptableValue = {
 *                  text: '0',
 *                  children: [
 *                      {
 *                          text: '1'
 *                      },
 *                      {
 *                          text: '2',
 *                          children: [
 *                              {
 *                                  text: '2-1'
 *                              },
 *                              {
 *                                  text: '2-2'
 *                              }
 *                          ]
 *                      }
 *                  ]
 *              };
 *          });
 *     </file>
 * </example>
 *//*@ngInject*//**
 * @ngdoc module
 * @name angularjs-value-editor.acceptable-root
 * @module angularjs-value-editor.acceptable-root
 *
 * @description
 *
 *//*@ngInject*//* istanbul ignore file */
/* neni cas... :-(*/
/**
 * Taken from https://github.com/wix/angular-tree-control and modified
 * TODO: Refactoring needed.
 */
/**
         * @param cssClass - the css class
         * @param addClassProperty - should we wrap the class name with class=""
         */
/* Branch node is not selectable, expand*/
/* Leaf node is not selectable*/
/* tree template*/
/* find all nodes visible on the tree and the scope $id of the scopes including them*/
/* iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes*/
/* if found, add the mapping $id -> node into newExpandedNodesMap*/
/* if not found, add the mapping num -> node into newExpandedNodesMap*/
/* Rendering template for a root node*/
/* save the transclude function from compile (which is not bound to a scope as apposed to the one from link)*/
/* we can fix this to work with the link transclude function with angular 1.2.6. as for angular 1.2.0 we need*/
/* to keep using the compile function*/
/* Rendering template for the current node*/
/* create a scope for the transclusion, whos parent is the parent of the tree control*//* tslint:disable:ban-types */
/**
 * @ngdoc type
 * @name AcceptableValueEditorOptions
 * @module angularjs-value-editor.acceptable
 *
 * @template VALUE
 *
 * @property {VALUE[]} acceptableValues Array of predefined values.
 * @property {boolean} multiselectable If true, value editor will accept multiple values and init model as empty array if not.
 * @property {string} optionsTemplate Angular template for displaying options. Current option is accessible via `$item` variable name.
 * @property {Injectable<Function>} equalityComparator
 * ```
 * function(...args: any[]) => boolean
 * ```
 * Custom equality comparator as angularjs injectable function.
 *
 * | Injectable&nbsp;argument&nbsp;name | Description  |
 * | ------------------------ | ---------------------- |
 * | `$element1`  | Element 1                          |
 * | `$element2`  | Element 2                          |
 *
 * @property {boolean} searchable If true, select component will have search input. Applicable only for select mode.
 * @property {boolean} reorderable If true, multi-select component will have capability for manual ordering selected items. Applicable only for multiple select mode.
 * @property {Injectable<Function>} sortComparator
 * ```
 * function(...args: any[]) => number
 * ```
 *
 * If defined, options will be sorted using this comparator function.
 * Angularjs injectable function.
 *
 * | Injectable&nbsp;argument&nbsp;name | Description  |
 * | ------------------------ | ---------------------- |
 * | `$element1`  | Element 1                          |
 * | `$element2`  | Element 2                          |
 *
 * @property {boolean} sortModel It true, model will be sorted using `comparator`. Applicable only for multiselectable mode.
 * @property {number} switchToInlineModeThreshold If count of options is bigger than threshold, value editor switches into inline mode. If threshold is `0`, value editor never switch to inline mode.
 * @property {number} showFirstCount If count of options is bigger than this value, value editor shows only given count checkboxes and rest of options is hidden. Applicable only for multiselectable, checkbox mode.
 * @property {boolean} selectedFirst If `true`, selected options will be moved on top of options. Applicable only for multiselectable, checkbox mode.
 * @property {boolean} modelAsArray If `true`, model will be array also if `multiple = false`. In this case array will contain only one element.
 * @property {boolean} allowSelectNull If `true`, single selectable editors will allow select null option or deselect selected.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link acceptableValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name acceptableValueEditorDefaultOptions
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * For description see {@link AcceptableValueEditorOptions}
 *
 * ```javascript
 *  {
 *      acceptableValues: [],
 *      multiselectable: false,
 *      searchable: true,
 *      optionsTemplate: '{{$item}}',
 *      equalityComparator: \/*@ngInject*\/ ($element1, $element2) => angular.equals($element1, $element2),
 *      reorderable: false,
 *      showFirstCount: 0,
 *      selectedFirst: false,
 *      sortComparator: undefined,
 *      sortModel: false,
 *      switchToInlineModeThreshold: 13,
 *      modelAsArray: false,
 *      allowSelectNull: false
 *  }
 * ```
 */
/*@ngInject*/
/**
 * @ngdoc provider
 * @name acceptableValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.acceptable
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationServiceProvider}
 *
 * Default options: {@link acceptableValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name acceptableValueEditorConfigurationService
 * @module angularjs-value-editor.acceptable
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationServiceProvider}
 *
 * Default options: {@link acceptableValueEditorDefaultOptions}
 *//**
 * @ngdoc provider
 * @name acceptableValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * See {@link acceptableValueEditorLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name acceptableValueEditorLocalizationsService
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name AcceptableValueEditorLocalizations
 * @module angularjs-value-editor.acceptable
 *
 * @property {string} allSelected
 * @property {string} more
 * @property {string} less
 * @property {string} selectAll
 * @property {string} deselectAll
 *
 * @description
 * Default localizations: {@link acceptableValueEditorDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name acceptableValueEditorDefaultLocalizations
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * ```
 * {
 *     allSelected: 'All selected',
 *     more: 'More',
 *     less: 'Less',
 *     selectAll: 'Select all',
 *     deselectAll: 'Deselect all'
 * }
 * ```
 *//* -1 because validation helper also pass selector test*/
/* tslint:disable-next-line:no-conditional-assignment*/
/*@ngInject*/
/*@ngInject*/
/* + 1 for null selection*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/* 4 because selected options disappears from list*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/* set classNameFilter*/
/*@ngInject*/
/*@ngInject*/
/* tslint:disable-next-line:variable-name*/
/*@ngInject*/
/* enable bug workaround*/
/* noinspection JSUnusedAssignment*/
/* items should be visible*/
/* close select*/
/* disable bug workaround*/
/* items should be hidden -> buggy behaviour*//*@ngInject*/
/**
     * For block single selectable
     * @param {VALUE} item
     * @returns {boolean}
     */
/* trigger model sort by calling its setter and setting same value*/
/**
     * For checkboxes
     * @param {VALUE} item
     * @returns {boolean}
     * @private
     */
/**
 * @ngdoc component
 * @name acceptableValueEditor
 * @module angularjs-value-editor.acceptable
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `any`
 *
 * This component is for selecting value from predefined values.
 * It has two basic modes - single selectable and multi selectable - which are controlled by `multiselectable` option.
 * Multi selectable mode has two visual sub-modes: select-based and checkbox-based which are controlled by `switchToCheckboxesThreshold` option.
 *
 * Supported options: {@link type:AcceptableValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="acceptableValueEditorExample" module="acceptableValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="demoController as $ctrl">
 *              <kp-value-editor type="'acceptable'" ng-model="model" options="{
 *                  acceptableValues: $ctrl.acceptableValues,
 *                  multiselectable: $ctrl.multiselectable,
 *                  optionsTemplate: $ctrl.optionsTemplate,
 *                  searchable: $ctrl.searchable,
 *                  reorderable: $ctrl.reorderable,
 *                  showFirstCount: $ctrl.showFirstCount,
 *                  selectedFirst: $ctrl.selectedFirst,
 *                  sortModel: $ctrl.sortModel,
 *                  sortComparator: $ctrl.sortComparator,
 *                  equalityComparator: $ctrl.equalityComparator,
 *                  modelAsArray: $ctrl.modelAsArray,
 *                  switchToBlockModeThreshold: $ctrl.switchToBlockModeThreshold
 *              }" placeholder="'Select...'">
 *              </kp-value-editor>
 *              <div>Model: {{model}}</div>
 *              <hr>
 *              Options:
 *              <div>{{$ctrl.acceptableValues}}</div>
 *              Settings:
 *              <div>multiselectable: <input type="checkbox" ng-model="$ctrl.multiselectable"></div>
 *              <div>optionsTemplate: <input type="text" ng-model="$ctrl.optionsTemplate"></div>
 *              <div>searchable: <input type="checkbox" ng-model="$ctrl.searchable"></div>
 *              <div>reorderable: <input type="checkbox" ng-model="$ctrl.reorderable"></div>
 *              <div>showFirstCount: <input type="number" ng-model="$ctrl.showFirstCount"></div>
 *              <div>selectedFirst: <input type="checkbox" ng-model="$ctrl.selectedFirst"></div>
 *              <div>sortModel: <input type="checkbox" ng-model="$ctrl.sortModel"></div>
 *              <div>switchToBlockModeThreshold: <input type="number" ng-model="$ctrl.switchToBlockModeThreshold"></div>
 *              <div>sortComparator: <input type="text" ng-model="$ctrl.sortComparatorString" ng-change="$ctrl.evalComparators()"></div>
 *              <div>equalityComparator: <input type="text" ng-model="$ctrl.equalityComparatorString" ng-change="$ctrl.evalComparators()"></div>
 *              <div>modelAsArray: <input type="checkbox" ng-model="$ctrl.modelAsArray"></div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('acceptableValueEditorExample', ['angularjs-value-editor'])
 *          .controller('demoController', ['acceptableValueEditorDefaultOptions', class {
 *              multiselectable;
 *              optionsTemplate;
 *              searchable;
 *              reorderable;
 *              showFirstCount;
 *              selectedFirst;
 *              sortModel;
 *              switchToBlockModeThreshold;
 *              modelAsArray;
 *              sortComparatorString = `(e1, e2) => ((e1 || {x: ''}).x || '').localeCompare((e2 || {x: ''}).x) * -1`;
 *              equalityComparatorString = '(e1, e2) => e1.x === e2.x';
 *
 *              constructor(acceptableValueEditorDefaultOptions) {
 *                  angular.merge(this, acceptableValueEditorDefaultOptions);
 *                  this.acceptableValues = [{x: 'a'}, {x: 'b'}, {x: 'c'}, {x: 'd'}, {x: 'e'}, {x: 'f'}, {x: 'g'}, {x: 'h'}];
 *                  this.evalComparators();
 *              }
 *
 *              evalComparators() {
 *                  let sortComparator = undefined;
 *                  let equalityComparator = undefined;
 *
 *                  try {
 *                      sortComparator = eval(this.sortComparatorString);
 *                      equalityComparator = eval(this.equalityComparatorString);
 *                  } catch (e) {
 *                      console.error('Invalid syntax');
 *                  }
 *
 *                  this.sortComparator = sortComparator;
 *                  this.equalityComparator = equalityComparator;
 *              }
 *          }]);
 *     </file>
 * </example>
 *//*@ngInject*//**
 * @ngdoc module
 * @name angularjs-value-editor.acceptable
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * Acceptable value editor module.
 *//**
 * @ngdoc directive
 * @name checkboxesValidations
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * Validation helper for acceptable value editor.
 *
 * It adds right version of required validation to acceptable value editor - checkboxes mode.
 *//**
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
/*@ngInject*//**
 * @ngdoc service
 * @name uiSelectDecorator
 * @module angularjs-value-editor.acceptable
 *
 * @description
 * This decorator modifies placeholder behaviour in multiselectable ui-select. In original, placeholder disappears if some values is selected,
 * but empty space under items is confusing, so in terms of UX, it is better to leave placeholder visible always.
 * If all items are selected, it shows `allSelected` localization from {@link AcceptableValueEditorLocalizations}
 */
/*@ngInject*//**
 * @ngdoc type
 * @name AutocompleteValueEditorOptions
 * @module angularjs-value-editor.autocomplete
 *
 * @template PARAMS
 *
 * @property {function(AutocompleteRequestParams): PromiseLike<string[]>} dataSource
 * ```
 * function($query?: string, $staticParams?: PARAMS, ...args): PromiseLike<string[]>
 * ```
 * Function, which makes request and returns string array of values for autocomplete.
 *
 * Function is invoked via [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) with following locals:
 *
 *  - `$model`: `string` - Actual model value
 *  - `$staticParams`: `{}` - Params passed from options
 *
 * @property {object} staticParams Any static params, which are passed to `dataSource` function.
 * @property {string} minLength Pull down popup input string length threshold.
 *
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link autocompleteValueEditorDefaultOptions}
 */
/* tslint:disable-next-line:ban-types*/
/**
 * @ngdoc constant
 * @name autocompleteValueEditorDefaultOptions
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 * For description see {@link AutocompleteValueEditorOptions}
 *
 * ```javascript
 * {
 *     minLength: 1,
 *     dataSource: () => Promise.resolve([]),
 *     staticParams: {}
 * }
 * ```
 */
/* istanbul ignore next */
/**
 * @ngdoc provider
 * @name autocompleteValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link autocompleteValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name autocompleteValueEditorConfigurationService
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link autocompleteValueEditorDefaultOptions}
 *//**
 * @ngdoc type
 * @name AutocompleteRequestParams
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 * ```javascript
 * interface AutocompleteRequestParams {
 *       query: string;
 * }
 * ```
 */
/*@ngInject*/
/* istanbul ignore next */
/**
 * @ngdoc component
 * @name autocompleteValueEditor
 * @module angularjs-value-editor.autocomplete
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `string`
 *
 * Value editor for autocompletion input.
 *
 * Supported options: {@link type:AutocompleteValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="autocompleteValueEditorExample" module="autocompleteValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="demoController as dc">
 *              <kp-value-editor type="'autocomplete'" ng-model="model" options="{dataSource: dc.dataSource}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('autocompleteValueEditorExample', ['angularjs-value-editor'])
 *         .controller('demoController', ['$timeout', class {
 *
 *         constructor($timeout) {
 *             this.$timeout = $timeout;
 *         }
 *
 *         items = [
 *                'one',
 *                'two',
 *                'three',
 *                'four'
 *            ];
 *
 *            dataSource = () => new Promise((resolve) => this.$timeout(resolve(this.items), 1000));
 *         }]);
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.autocomplete
 * @module angularjs-value-editor.autocomplete
 *
 * @description
 *
 *//*@ngInject*//**
 * @ngdoc type
 * @name TBooleanValueEditorType
 * @module
 *
 * @description
 * Possible values are: `'checkbox' | 'switch'`.
 */
/* | 'switch'; // TODO: Implement switch option*/
/**
 * @ngdoc type
 * @name BooleanValueEditorOptions
 * @module angularjs-value-editor.boolean
 *
 * @property {string} [type=checkbox] Type of display: `'checkbox'` or `'switch'`.
 * @property [trueValue=undefined] Custom value if editor is `true`. If undefined, `true` is used.
 * @property [falseValue=undefined] Custom value if editor is `false`. If undefined, `false` is used.
 * @property {boolean} [nullAsIndeterminate=false] If true, `null` model value is displayed as indeterminate state.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link booleanValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name booleanValueEditorDefaultOptions
 * @module angularjs-value-editor.boolean
 *
 * @description
 * For description see {@link BooleanValueEditorOptions}
 *
 * ```javascript
 *  {
 *      type: 'checkbox',
 *      trueValue: undefined,
 *      falseValue: undefined,
 *      nullAsIndeterminate: false
 *  }
 * ```
 */
/**
 * @ngdoc provider
 * @name booleanValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.boolean
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link booleanValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name booleanValueEditorConfigurationService
 * @module angularjs-value-editor.boolean
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link booleanValueEditorDefaultOptions}
 *//*@ngInject*/
/* @ts-ignore - $$element is not typed, because it's internal API*/
/**
 * @ngdoc component
 * @name booleanValueEditor
 * @module angularjs-value-editor.boolean
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `boolean`
 *
 * Value editor for boolean input.
 *
 * Supported options: {@link type:BooleanValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * This value editor supports custom model value substitution via options parameters `trueValue` and `falseValue`.
 *
 * @example
 * <example name="booleanValueEditorExample" module="booleanValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'boolean'" ng-model="model"></kp-value-editor>
 *              <div>{{model | json}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('booleanValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.boolean
 * @module angularjs-value-editor.boolean
 *
 * @description
 *
 *//*@ngInject*/
/*@ngInject*//**
 * @ngdoc type
 * @name TDateValueEditorGranularity
 * @module angularjs-value-editor.date
 *
 * @description
 * Date picker maximum granularity.
 *
 * Possible values are: `'minute' | 'hour' | 'day' | 'month' | 'year'`.
 */
/**
 * @ngdoc type
 * @name DateValueEditorOptions
 * @module angularjs-value-editor.date
 *
 * @property {TDateValueEditorGranularity=} maximumGranularity Set maximum date resolution.
 * @property {string=} viewFormat How to format date in input.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link dateValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name dateValueEditorDefaultOptions
 * @module angularjs-value-editor.date
 *
 * @description
 * For description see {@link DateValueEditorOptions}
 *
 * ```javascript
 *  {
 *      maximumGranularity: 'day',
 *      viewFormat: 'd.L.y',
 *      onlyDate: false
 *  }
 * ```
 */
/**
 * @ngdoc provider
 * @name dateValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.date
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link dateValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name dateValueEditorConfigurationService
 * @module angularjs-value-editor.date
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link dateValueEditorDefaultOptions}
 *//*@ngInject*/
/**
 * @ngdoc component
 * @name dateValueEditor
 * @module angularjs-value-editor.date
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `string`
 *
 * Value editor for date input.
 *
 * Supported options: {@link type:DateValueEditorOptions}
 *
 * Supported validations: {@link type:DateValueEditorValidations}
 *
 * @example
 * <example name="dateValueEditorExample" module="dateValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'date'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('dateValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
/**
 * @ngdoc type
 * @name DateValueEditorValidations
 * @module angularjs-value-editor.date
 *
 * @property {string=} minDate Minimum date in ISO format.
 * @property {string=} maxDate Maximum date in ISO format.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.date
 * @module angularjs-value-editor.date
 *
 * @description
 *
 *//* tslint:disable:variable-name */
/* TODO: Write some more test, for example: Test for some settings options and for min/max validations.*/
/*@ngInject*//**
 * @ngdoc component
 * @name hiddenValueEditor
 * @module angularjs-value-editor.hidden
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `any`
 *
 * Value editor for store any value.
 *
 * Supported options: {@link type:ValueEditorOptions}
 *
 * Supported validations: None
 *
 * @example
 * <example name="hiddenValueEditorExample" module="hiddenValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'hidden'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('hiddenValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.hidden
 * @module angularjs-value-editor.hidden
 *
 * @description
 *
 *//*@ngInject*//**
 * @ngdoc type
 * @name HtmlValueEditorOptions
 * @module angularjs-value-editor.html-editor
 *
 * @property editorOptions <a href="https://alex-d.github.io/Trumbowyg/documentation/#basic-options">Trumbowyg options</a>
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link htmlValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name htmlValueEditorDefaultOptions
 * @module angularjs-value-editor.html-editor
 *
 * @description
 * For description see {@link HtmlValueEditorOptions}
 *
 * Default value:
 *
 * ```javascript
 * {
 *      editorOptions: {
 *          btns: [
 *              ['formatting'],
 *              ['bold', 'italic', 'underline', 'del', 'removeformat'],
 *              ['superscript', 'subscript'],
 *              ['foreColor', 'backColor'],
 *              ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
 *              ['unorderedList', 'orderedList'],
 *              ['table'],
 *              ['link', 'insertImage'],
 *              ['fullscreen', 'viewHTML']
 *          ]
 *      }
 *  }
 * ```
 */
/**
 * @ngdoc provider
 * @name htmlValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.html-editor
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link htmlValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name htmlValueEditorConfigurationService
 * @module angularjs-value-editor.html-editor
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link htmlValueEditorDefaultOptions}
 *//*@ngInject*/
/* IE does not support closest function on DOM*/
/**
 * @ngdoc component
 * @name htmlValueEditor
 * @module angularjs-value-editor.html-editor
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 * @requires http://jquery.com/ jQuery
 * @requires https://alex-d.github.io/Trumbowyg/documentation/#installation Trumbowyg dependencies and plugins.
 *
 * @description
 * Model type: `string`
 *
 * Value editor for formatted text input.
 *
 * Component uses <a href="https://alex-d.github.io/Trumbowyg/documentation/#basic-options">Trumbowyg editor</a>,
 * because it is lightweight, (almost) libraries agnostic with possibility to be, in near future, jQuery less.
 *
 * It is required to attach also table and colors plugins - more info how to do it can be find in Trumbowyg site.
 * For attaching SVGs via webpack use this configuration:
 * ```javascript
 *      $.trumbowyg.svgPath = require('trumbowyg/dist/ui/icons.svg');
 * ```
 *
 * Supported options: {@link type:HtmlValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="htmlValueEditorExample" module="htmlValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/ui/trumbowyg.min.css">
 *         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/colors/ui/trumbowyg.colors.min.css">
 *         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/table/ui/trumbowyg.table.min.css">
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/trumbowyg.min.js"></script>
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/colors/trumbowyg.colors.min.js"></script>
 *         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/table/trumbowyg.table.min.js"></script>
 *         <main>
 *             <em>Example probably doesn't work, because jQuery is need to be load before angular. You can use >>Edit in Plunker<< button and prepend jQuery script tag before angular.</em>
 *             <em>Hmmm... It isn't all yet. You must load SVG icons, but plunker doesn't allow CORS requests. No help...</em>
 *              <kp-value-editor type="'html'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('htmlValueEditorExample', ['angularjs-value-editor']);
 *         $(document).ready(() => {
 *             $.trumbowyg.svgPath = 'https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/ui/icons.svg';
 *         });
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.html-editor
 * @module angularjs-value-editor.html-editor
 *
 * @description
 *
 *//*@ngInject*//* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* tslint:disable-next-line:no-namespace*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*/
/* noinspection JSUnusedLocalSymbols*//**
 * @ngdoc directive
 * @name numberRangeValidations
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 */
/*@ngInject*//**
 * @ngdoc type
 * @name NumberRangeValueEditorOptions
 * @module angularjs-value-editor.number-range
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link numberRangeValueEditorDefaultOptions}
 */
/* tslint:disable-next-line:no-empty-interface*/
/**
 * @ngdoc constant
 * @name numberRangeValueEditorDefaultOptions
 * @module angularjs-value-editor.number-range
 *
 * @description
 * For description see {@link NumberRangeValueEditorOptions}
 *
 * ```javascript
 * {
 *      customEmptyAsNullCheck: ($value: NumberRangeValueEditorModel) => $value === undefined || $value === null || customEquals($value, {}) || customEquals($value, EMPTY_MODEL)
 * }
 * ```
 */
/*@ngInject*/
/**
 * @ngdoc provider
 * @name numberRangeValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberRangeValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name numberRangeValueEditorConfigurationService
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberRangeValueEditorDefaultOptions}
 *//**
 * @ngdoc provider
 * @name numberRangeValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.number-range
 *
 * @description
 * See {@link NumberRangeValueEditorLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name NumberRangeValueEditorLocalizationsService
 * @module angularjs-value-editor.number-range
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name NumberRangeValueEditorLocalizations
 * @module angularjs-value-editor.number-range
 *
 * @property {string} from
 * @property {string} to
 *
 * @description
 * Default localizations: {@link numberRangeValueEditorDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name numberRangeValueEditorDefaultLocalizations
 * @module angularjs-value-editor.number-range
 *
 * @description
 * ```
 * {
 *      from: 'from',
 *      to: 'to'
 * }
 * ```
 *//**
 * @ngdoc type
 * @name NumberRangeValueEditorModel
 * @module angularjs-value-editor.number-range
 *
 * @description
 * Model of number-range-value-editor
 *
 * ```js
 *  {
 *      from: number,
 *      to: number
 *  }
 * ```
 */
/*@ngInject*/
/**
 * @ngdoc component
 * @name numberRangeValueEditor
 * @module angularjs-value-editor.number-range
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: {@link NumberRangeValueEditorModel}
 *
 * Value editor for integer number range input.
 *
 * Supported options: {@link type:NumberRangeValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="numberRangeValueEditorExample" module="numberRangeValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'number-range'" ng-model="model" options="{canDoAction: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('numberRangeValueEditorExample', ['angularjs-value-editor'])
 *          .config((numberRangeValueEditorConfigurationServiceProvider) => numberRangeValueEditorConfigurationServiceProvider.setConfiguration({
 *              dataSource: () => Promise.resolve(['one', 'two', 'three'])
 *          }));
 *     </file>
 * </example>
 */
/**
 * @ngdoc type
 * @name NumberRangeValueEditorValidations
 * @module angularjs-value-editor.number-range
 *
 * @property {number} min Min number for both inputs.
 * @property {number} max Max number for both inputs.
 * @property {boolean} fromBiggerThanTo From has to be bigger then to.
 * @property {boolean} toBiggerThanFrom To has to be bigger then from.
 *
 * @description
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.number-range
 * @module angularjs-value-editor.number-range
 *
 * @description
 *
 *//*@ngInject*/
/* allow insert invalid number*//**
 * @ngdoc type
 * @name NumberValueEditorOptions
 * @module angularjs-value-editor.number
 *
 * @property {boolean=} decimal Allow to input decimal numbers.
 * @property {number=} step Step
 * @property {boolean=} hideSpinners If true, number input hide spinner buttons.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link numberValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name numberValueEditorDefaultOptions
 * @module angularjs-value-editor.number
 *
 * @description
 * For description see {@link NumberValueEditorOptions}
 *
 * Default value:
 * ```javascript
 *  {
 *      decimal: false,
 *      step: 1,
 *      hideSpinners: false
 *  }
 * ```
 */
/**
 * @ngdoc provider
 * @name numberValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name numberValueEditorConfigurationService
 * @module angularjs-value-editor.number
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link numberValueEditorDefaultOptions}
 *//*@ngInject*/
/**
 * @ngdoc component
 * @name numberValueEditor
 * @module angularjs-value-editor.number
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `number`
 *
 * Value editor for number input.
 *
 * Supported options: {@link type:NumberValueEditorOptions}
 *
 * Supported validations: {@link type:NumberValueEditorValidations}
 *
 * @example
 * <example name="numberValueEditorExample" module="numberValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'number'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('numberValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
/**
 * @ngdoc type
 * @name NumberValueEditorValidations
 * @module angularjs-value-editor.number
 *
 * @property {number=} minlength Min length.
 * @property {number=} maxlength Max length.
 * @property {number=} min Minimum value.
 * @property {number=} max Maximum value.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.number
 * @module angularjs-value-editor.number
 *
 * @description
 *
 *//*@ngInject*/
/* working only in Firefox*//**
 * @ngdoc directive
 * @name kpModelEquals
 * @module angularjs-value-editor.password
 *
 * @restrict A
 *
 * @param {string} kpModelEquals Comparing value.
 *
 * @description
 * Directive add equals validator. If input value is not equal to model value, it will fails.
 *//**
 * @ngdoc type
 * @name PasswordValueEditorOptions
 * @module angularjs-value-editor.password
 *
 * @property {boolean} withConfirmation If `true`, it renders two inputs - main and confirmation. If models don't match, it shows implicit equals validation.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link passwordValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name passwordValueEditorDefaultOptions
 * @module angularjs-value-editor.password
 *
 * @description
 * For description see {@link PasswordValueEditorOptions}
 *
 * ```javascript
 * {
 *      withConfirmation: false
 * }
 * ```
 */
/**
 * @ngdoc provider
 * @name passwordValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.password
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link passwordValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name passwordValueEditorConfigurationService
 * @module angularjs-value-editor.password
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link passwordValueEditorDefaultOptions}
 *//**
 * @ngdoc provider
 * @name passwordValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.password
 *
 * @description
 * See {@link passwordValueEditorLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name passwordValueEditorLocalizationsService
 * @module angularjs-value-editor.password
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name PasswordValueEditorLocalizations
 * @module angularjs-value-editor.password
 *
 * @property {string} patternDescription Password pattern description showing in tooltip.
 * @property {string} confirmPassword Label above confirmation input.
 * @property {string} noChangeIfEmpty Text next to password pattern, informing about possibility to leave both inputs blank.
 *
 * @description
 * Default localizations: {@link passwordValueEditorDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name passwordValueEditorDefaultLocalizations
 * @module angularjs-value-editor.password
 *
 * @description
 * ```
 * {
 *      patternDescription: '',
 *      confirmPassword: 'Confirm password',
 *      noChangeIfEmpty: 'If You don\'t want to change password, leave blank.'
 * }
 * ```
 *//*@ngInject*/
/**
 * @ngdoc component
 * @name passwordValueEditor
 * @module angularjs-value-editor.password
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `string`
 *
 * Value editor for password input.
 *
 * Supported options: {@link type:PasswordValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="passwordValueEditorExample" module="passwordValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'password'" ng-model="model" options="{withConfirmation: true}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('passwordValueEditorExample', ['angularjs-value-editor'])
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.password
 * @module angularjs-value-editor.password
 *
 * @description
 *
 *//*@ngInject*//* istanbul ignore file */
/* uncomment after write some test for component*/
/**
 * @ngdoc directive
 * @name sliderModelTransformer
 * @module angularjs-value-editor.range
 *
 * @restrict A
 * @element td-slider
 *
 * @requires ngModel
 * @requires tdSlider
 *
 * @param {boolean} sliderModelTransformer If true, transform selected extremes as `null`.
 *
 * @description
 * Directive transforms ngModel from object `{from: XXX, to: YYY}` to array `[XXX, YYY]`
 * If selected values are minimum and maximum values from slider and `sliderModelTransformer` param is `true`, then model will be transformed to `null`.
 */
/*@ngInject*/
/*SliderComponentController*//**
 * @ngdoc type
 * @name RangeValueEditorOptions
 * @module angularjs-value-editor.range
 *
 * @property {boolean} extremesAsNull If `true`, extremes will be transformed to `null`.
 * @property {number} min Minimum value
 * @property {number} max Maximum value
 * @property {boolean} snap If `true` handlers will snap to defined `snapPoints`.
 * @property {number[]} snapPoints Definition of snap points.
 * @property {number[]} pitPoints Definition where to be placed pits.
 * @property {string} currentValueTemplate Template for displaying current value of slider model above slider.
 *
 * | Template&nbsp;variable | Description                         |
 * |------------------------|-------------------------------------|
 * | `$from`                | From value                          |
 * | `$to`                  | To value                            |
 * | `$options`             | Options                             |
 * | `$setFrom(value)`      | Function for setting **from** value |
 * | `$setTo(value)`        | Function for setting **to** value   |
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link rangeValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name rangeValueEditorDefaultOptions
 * @module angularjs-value-editor.range
 *
 * @description
 * For description see {@link RangeValueEditorOptions}
 *
 * ```javascript
 * {
 *     extremesAsNull: true,
 *     min: 0,
 *     max: 100,
 *     snap: false,
 *     snapPoints: undefined,
 *     pitPoints: undefined,
 *     currentValueTemplate: '{{$from}} - {{$to}}'
 * }
 * ```
 */
/**
 * @ngdoc provider
 * @name rangeValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link rangeValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name rangeValueEditorConfigurationService
 * @module angularjs-value-editor.range
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link rangeValueEditorDefaultOptions}
 *//* istanbul ignore file */
/* neni moc co testovat... viz. testy*/
/**
 * @ngdoc type
 * @name RangeValueEditorModel
 * @module angularjs-value-editor.range
 *
 * @description
 * ```
 *  interface RangeValueEditorModel {
 *      from: number;
 *      to: number;
 *  }
 * ```
 */
/*@ngInject*/
/**
 * @ngdoc component
 * @name rangeValueEditor
 * @module angularjs-value-editor.range
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: {@link RangeValueEditorModel}
 *
 * Value editor for range input.
 *
 * Supported options: {@link type:RangeValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="rangeValueEditorExample" module="rangeValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main ng-controller="controller as $ctrl">
 *              <kp-value-editor type="'range'" ng-model="model" options="$ctrl.options"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('rangeValueEditorExample', ['angularjs-value-editor'])
 *          .controller('controller', class {
 *              options = {
 *                  currentValueTemplate: `
 *                      <input type="number" ng-model="$from" ng-change="$setFrom($from)" min="{{$options.min}}" max="{{$options.max}}">
 *                      -
 *                      <input type="number" ng-model="$to" ng-change="$setTo($to)" min="{{$options.min}}" max="{{$options.max}}">
 *                  `
 *              };
 *          });
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.range
 * @module angularjs-value-editor.range
 *
 * @description
 *
 *//*@ngInject*/
/* nothing to require*/
/* component td-slider does not support disabling for this time*//* istanbul ignore file */
/**
 * @ngdoc type
 * @name SearchableValueEditorOptions
 * @module angularjs-value-editor.searchable
 *
 * @property {string} modelTemplate Template for displaying model
 * @property {{}} additionalParameters Additional parameters passed to `searchModelFunction` and `editModelFunction`
 * @property {Injectable<Function>} searchModelFunction
 * ```
 * function(...args: any[]) => Promise<MODEL>
 * ```
 * Searching angularjs injectable function. Returns model value in promise.
 *
 * | Injectable&nbsp;argument&nbsp;name | Description                        |
 * | ------------------------ | ---------------------------------- |
 * | `$model`                 | Current model                      |
 * | `$additionalParameters`  | Additional parameters from options |
 *
 * @property {Injectable<Function>} editModelFunction
 * ```
 * function(...args: any[]) => Promise<MODEL>
 * ```
 * Function that calls edit value. Returns new model in promise.
 *
 * | Injectable&nbsp;argument&nbsp;name | Description                        |
 * | ------------------------ | ---------------------------------- |
 * | `$model`                 | Current model                      |
 * | `$additionalParameters`  | Additional parameters from options |
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link searchableValueEditorDefaultOptions}
 */
/* tslint:disable-next-line:ban-types*/
/* tslint:disable-next-line:ban-types*/
/**
 * @ngdoc constant
 * @name searchableValueEditorDefaultOptions
 * @module angularjs-value-editor.searchable
 *
 * @description
 * For description see {@link SearchableValueEditorOptions}
 *
 * ```javascript
 * {
 *      modelTemplate: '{{$model}}',
 *      additionalParameters: undefined,
 *      searchModelFunction: async () => {throw new Error('searchModelFunction is not set')},
 *      editModelFunction: undefined
 * }
 * ```
 */
/**
 * @ngdoc provider
 * @name searchableValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.searchable
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link searchableValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name searchableValueEditorConfigurationService
 * @module angularjs-value-editor.searchable
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link searchableValueEditorDefaultOptions}
 *//**
 * @ngdoc provider
 * @name searchableValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.searchable
 *
 * @description
 * See {@link searchableValueEditorLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name searchableValueEditorLocalizationsService
 * @module angularjs-value-editor.searchable
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name SearchableValueEditorLocalizations
 * @module angularjs-value-editor.searchable
 *
 * @property {string} search
 * @property {string} searchOther
 * @property {string} editValue
 * @property {string} createNew
 *
 * @description
 * Default localizations: {@link searchableValueEditorDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name searchableValueEditorDefaultLocalizations
 * @module angularjs-value-editor.searchable
 *
 * @description
 * ```
 * {
 *      search: 'Search',
 *      searchOther: 'Search other',
 *      editValue: 'Edit value',
 *      createNew: 'Create new'
 * }
 * ```
 *//*@ngInject*/
/* istanbul ignore next */
/**
 * @ngdoc component
 * @name searchableValueEditor
 * @module angularjs-value-editor.searchable
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `any`
 *
 * Value editor for searchable input.
 *
 * Supported options: {@link type:SearchableValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="searchableValueEditorExample" module="searchableValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'searchable'" ng-model="model" placeholder="Search some value..."></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('searchableValueEditorExample', ['angularjs-value-editor'])
 *         .config(['searchableValueEditorConfigurationServiceProvider', (searchableValueEditorConfigurationServiceProvider) =>
 *              searchableValueEditorConfigurationServiceProvider.setConfiguration({
 *                  searchModelFunction: ['$timeout', ($timeout) => new Promise((resolve => $timeout(() => resolve('Some result'), 1500)))]
 *              })
 *         ]);
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.searchable
 * @module angularjs-value-editor.searchable
 *
 * @description
 *
 *//* tslint:disable-next-line:variable-name*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*//**
 * @ngdoc directive
 * @name prefixSuffixModelAdder
 * @module angularjs-value-editor.text
 *
 * @description
 * This directive adds prefix and suffix to model if they are set together with `includePrefixAndSuffixToModel`.
 *//**
 * @ngdoc directive
 * @name prefixedMaxlength
 * @module angularjs-value-editor.text
 *
 * @param {number} prefixedMaxlength Length
 *
 * @description
 * Prefix and suffix aware maxlength validation.
 */
/*@ngInject*//**
 * @ngdoc directive
 * @name prefixedMinlength
 * @module angularjs-value-editor.text
 *
 * @param {number} prefixedMinlength Length
 *
 * @description
 * Prefix and suffix aware minlength validation.
 */
/*@ngInject*//**
 * @ngdoc directive
 * @name textValidations
 * @module angularjs-value-editor.text
 *
 * @description
 *
 *//**
 * @ngdoc type
 * @name TTextValueEditorType
 * @module angularjs-value-editor.text
 *
 * @description
 * This type defines type of text editor.
 *
 * - `text`: Classic HTML input element.
 * - `textarea`: Classic HTML textarea element.
 * - `rich-textarea`: ACE editor with some syntax highlight.
 *
 * Possible values are: `'text' | 'textarea' | 'rich-textarea' | 'email'`.
 *
 */
/**
 * @ngdoc type
 * @name TextValueEditorOptions
 * @module angularjs-value-editor.text
 *
 * @property {TTextValueEditorType} type Input type. Possible values are `text`, `textarea`, `rich-textarea`.
 * @property {object} aceOptions Options for ACE editor. Applicable only if `type` is `'rich-textarea'`.
 * @property {string} prefix Non-editable prefix before input element.
 * @property {string} suffix Non-editable prefix after input element.
 * @property {boolean} includePrefixAndSuffixToModel If `true`, prefix and suffix will be appended to the model.
 * @property {boolean} trim If true, model will be trimmed.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Defaults: {@link textValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name textValueEditorDefaultOptions
 * @module angularjs-value-editor.text
 *
 * @description
 * For description see {@link TextValueEditorOptions}
 *
 * ```javascript
 *  {
 *      type: 'text',
 *      aceOptions: {
 *             useWrapMode: false,
 *             showGutter: true
 *         },
 *      prefix: undefined,
 *      suffix: undefined,
 *      includePrefixAndSuffixToModel: false,
 *      trim: false
 *  }
 * ```
 */
/**
 * @ngdoc provider
 * @name textValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.text
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link textValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name textValueEditorConfigurationService
 * @module angularjs-value-editor.text
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link textValueEditorDefaultOptions}
 *//**
 * @ngdoc provider
 * @name textValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.text
 *
 * @description
 * See {@link textValueEditorLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name textValueEditorLocalizationsService
 * @module angularjs-value-editor.text
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name TextValueEditorLocalizations
 * @module angularjs-value-editor.text
 *
 * @property {string} patternDescription Pattern description showing in tooltip.
 *
 * @description
 * Default localizations: {@link textValueEditorDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name textValueEditorDefaultLocalizations
 * @module angularjs-value-editor.text
 *
 * @description
 * ```
 * {
 *      patternDescription: ''
 * }
 * ```
 *//*@ngInject*/
/**
     * Get number of rows between nim and max range.
     */
/**
     * Try to count rows in string. if string is without `\n`, it tries to estimate number of rows. Always return value greater then 0.
     */
/* Original directive doesn't sets model to touched if ACE editor is blurred. This fixes it.*/
/* Propagate disabled -> set Ace to readonly*/
/**
 * @ngdoc component
 * @name textValueEditor
 * @module angularjs-value-editor.text
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `string`
 *
 * Value editor for text input.
 * Depending on type are four versions:
 * - `text`
 *
 *      Common text input.
 *
 * - `textarea`
 *
 *      Textarea value editor.
 *
 * - `rich-textarea`.
 *
 *      [ACE editor](https://ace.c9.io).
 *
 * - `email`
 *
 *      Email input. If pattern validation is not given, default is used.
 *
 * - `tel`
 *
 *      Telephone number input.
 *
 * - `url`
 *
 *      URL input.
 *
 * Supported options: {@link type:TextValueEditorOptions}
 *
 * Supported validations: {@link type:TextValueEditorValidations}
 *
 * @example
 * <example name="textValueEditorExample" module="textValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'text'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('textValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
/**
 * @ngdoc type
 * @name TextValueEditorValidations
 * @module angularjs-value-editor.text
 *
 * @property {number=} minlength Min length.
 * @property {number=} maxlength Max length.
 * @property {string=} pattern Regexp pattern.
 * @property {boolean=} notBlank Not blank (only whitespace) validation
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 */
/* Only for localizations*//**
 * @ngdoc module
 * @name angularjs-value-editor.text
 * @module angularjs-value-editor.text
 *
 * @description
 *
 */
/**
 * @ngdoc constant
 * @name emailRegex
 * @module angularjs-value-editor.text
 *
 * @description
 * Regex for email validation.
 *
 * ```
 *  (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
 * ```
 *//*@ngInject*//*@ngInject*//* import VelocityTemplateValueEditorComponent from './velocity-template.value-editor.component';*/
/**
 * @ngdoc module
 * @name angularjs-value-editor.velocity-template
 * @module angularjs-value-editor.velocity-template
 *
 * @description
 * `velocity-template` value editor is only {@link kpValueEditorAliasesService alias} for {@link textValueEditor text-value-editor} with default {@link TextValueEditorOptions options}:
 * ```
 *  {
 *      type: 'rich-textarea'
 *  }
 * ```
 */
/* .component(VelocityTemplateValueEditorComponent.componentName, VelocityTemplateValueEditorComponent)*//*@ngInject*//**
 * @ngdoc directive
 * @name yearParser
 * @module angularjs-value-editor.year
 *
 * @requires ngModel
 *
 * @restrict A
 * @priority 100
 *
 * @description
 * Directive transforms text value to number.
 *//**
 * @ngdoc component
 * @name dateValueEditor
 * @module angularjs-value-editor.date
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `string`
 *
 * Value editor for date input.
 *
 * Supported options: {@link type:DateValueEditorOptions}
 *
 * Supported validations: {@link type:DateValueEditorValidations}
 *
 * @example
 * <example name="dateValueEditorExample" module="dateValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'date'" ng-model="model"></kp-value-editor>
 *              <div>{{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('dateValueEditorExample', ['angularjs-value-editor']);
 *     </file>
 * </example>
 */
/**
 * @ngdoc type
 * @name YearValueEditorValidations
 * @module angularjs-value-editor.year
 *
 * @property {number=} minDate Min year.
 * @property {number=} maxDate Max year.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.year
 * @module angularjs-value-editor.year
 *
 * @description
 *
 *//*@ngInject*//**
 * @ngdoc provider
 * @name valueEditorErrorMessagesLocalizationsServiceProvider
 * @module angularjs-value-editor.error-messages
 *
 * @description
 * See {@link valueEditorErrorMessagesLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name valueEditorErrorMessagesLocalizationsService
 * @module angularjs-value-editor.error-messages
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name ValueEditorErrorMessagesLocalizations
 * @module angularjs-value-editor.error-messages
 *
 * @property {string} required
 * @property {string} minlength
 * @property {string} maxlength
 * @property {string} pattern
 * @property {string} number
 * @property {string} min
 * @property {string} max
 * @property {string} fromBiggerThanTo
 * @property {string} toBiggerThanFrom
 * @property {string} minDate
 * @property {string} maxDate
 * @property {string} 'list-required'
 * @property {string} 'max-count'
 * @property {string} 'passwords-equals'
 * @property {string}  email
 * @property {string}  url
 * @property {string}  notBlank
 *
 * @description
 * Default localizations: {@link valueEditorErrorMessagesDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name valueEditorErrorMessagesDefaultLocalizations
 * @module angularjs-value-editor.error-messages
 *
 * @description
 * ```
 * {
 *  required: 'This field is required',
 *  async: 'Error',
 *  minlength: 'Too short',
 *  maxlength: 'Too long',
 *  pattern: 'Input does not match pattern',
 *  number: 'Value is not a number',
 *  min: 'Too low',
 *  max: 'Too high',
 *  fromBiggerThanTo: 'From is higher than to',
 *  toBiggerThanFrom: 'To is higher than from',
 *  minDate: 'Date is too in past',
 *  maxDate: 'Date is too in future',
 *  'list-required': 'List cannot be empty',
 *  'max-count': 'Too many items',
 *  'passwords-equals': 'Passwords do not match',
 *  email: 'Not a valid e-mail address',
 *  url: 'Not a valid URL',
 *  notBlank: 'Input can not have only blank characters'
 * }
 * ```
 *//**
 * @ngdoc directive
 * @name errorMessages
 * @module angularjs-value-editor.error-messages
 *
 * @priority 1
 *
 * @restrict A
 *
 * @requires valueEditorErrorMessagesLocalizationsServiceProvider
 * @requires ngModel
 *
 * @param {string} errorMessagesCustomClass Custom CSS class to add to error message element.
 *
 * @description
 * Directive manages showing / hiding errors. Directive is being placed to main input element or element with validations.
 * It will listen to validation status change and shows/hides localized validation messages.
 *
 * If value-editor's parent has not `position: relative`, this directive adds wrapper with styled `position: relative`.
 * This is done, because displaying error messages without relative positioned parent element caused wrong positioning of message.
 * {@link kpValueEditorConfigurationServiceProvider kpValueEditor} has option `disableAutoWrapping` which controls this behaviour.
 */
/*@ngInject*/
/*@ngInject*//**
 * @ngdoc module
 * @name angularjs-value-editor.error-messages
 * @module angularjs-value-editor.error-messages
 *
 * @description
 *
 *//* tslint:disable:variable-name */
/*@ngInject*//* tslint:disable-next-line:variable-name*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/* @ts-ignore*/
/*@ngInject*/
/*@ngInject*/
/* @ts-ignore*/
/*@ngInject*/
/*@ngInject*/
/* @ts-ignore*//**
 * @ngdoc directive
 * @name kpAsyncValidation
 * @module angularjs-value-editor.async-validation
 *
 * @restrict A
 *
 * @requires ngModel
 * @requires KpValueEditorComponent
 * @requires ErrorMessagesDirective
 *
 * @params {KpAsyncValidationOptions} kpAsyncValidation Validation options.
 *
 * @description
 * This directive adds async validation to value-editors. It works like this:
 *  - User specifies validation using validation definition object {@KpAsyncValidationOptions} in validations section via `async` key (validation name).
 *  - User sets async validation function via {@link kpAsyncValidationServiceProvider}`.setValidationFunction`.
 *  - When validation is triggered, it will make function call with injected arguments and expects `Promise` with result.
 *  - If promise is fulfilled, nothing happens, but if not, directive expects in error reason `string` with error message to display.
 *
 * @example
 * <example name="KpAsyncValidationDirectiveExample" module="KpAsyncValidationDirectiveExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *             <kp-value-editor type="'text'" ng-model="model" validations="{async: {additionalParameters: 'Some additional params'}}"></kp-value-editor>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('KpAsyncValidationDirectiveExample', ['angularjs-value-editor'])
 *          .config(['kpAsyncValidationServiceProvider', function(kpAsyncValidationServiceProvider) {
 *              kpAsyncValidationServiceProvider.setValidationFunction(['$model', '$additionalParameters', '$timeout', function($model, $additionalParameters, $timeout) {
 *                  return new Promise((resolve, reject) => {
 *                      const delay = (Math.round(Math.random() * 1000) + 500);
 *                      const yesNo = Math.round(Math.random() * 100) % 2 === 0;
 *
 *                      const result = yesNo ? resolve : reject.bind(null, `Sybila said that ${($model || '').length !== 0 ? $model : '<empty>'} is invalid...`);
 *
 *                      $timeout(result, delay);
 *                  });
 *              }]);
 *          }]);
 *     </file>
 * </example>
 */
/*@ngInject*/
/**
     * If validation fired, current model contains old currentProperty value, because
     * validation is fired BEFORE model update.
     * So I must update validating property current value by myself...
     */
/**
 * @ngdoc type
 * @name KpAsyncValidationOptions
 * @module angularjs-value-editor.async-validation
 *
 * @property {boolean} sendWholeForm If `true` into validation function will be injectable whole wrapping form as `$formModel` argument.
 * @property {any} additionalParameters Any values passed into validation function as injectable `$additionalParameters` argument.
 *
 * @description
 * Async validation parameters.
 */
/**
 * @ngdoc constant
 * @name ASYNC_VALIDATION_DEFAULT_OPTIONS
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * Default async validation parameters value.
 *
 * ```
 *  {
 *      additionalParameters: undefined,
 *      sendWholeForm: false
 *  }
 * ```
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.async-validation
 * @module angularjs-value-editor.async-validation
 *
 * @description
 *
 *//**
 * @ngdoc type
 * @name ValidationFunction
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * ```
 * type ValidationFunction = Injectable<((...args: any[]) => IPromise<any>)>;
 * ```
 */
/* tslint:disable-next-line:ban-types*/
/**
 * @ngdoc service
 * @name kpAsyncValidationService
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * Service for async validations.
 */
/**
     * @ngdoc method
     * @name kpAsyncValidationService#getValidationsFunction
     *
     * @returns {ValidationFunction} Custom validation function.
     *
     * @description
     * Method returns user-specified async validation function.
     */
/**
 * @ngdoc provider
 * @name kpAsyncValidationServiceProvider
 * @module angularjs-value-editor.async-validation
 *
 * @description
 * Provider for async validations.
 */
/**
     * @ngdoc method
     * @name kpAsyncValidationServiceProvider#setValidationFunction
     *
     * @param {ValidationFunction} validationFunction User-specified validation function.
     *
     * @description
     * Setter for validation function. Validation function is called every time when async validation is triggered.
     * Function returns Promise depending on validation result. If validation failed, promise will be rejected.
     * Rejection reason should be `string` which will be displayed as validation error message.
     *
     * If validation succeeds, promise will be resolved.
     *
     * Validation function is called using `Injector.invoke()` function, so it accepts some injectable parameters.
     *
     * | Injectable&nbsp;argument&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description                                                                           |
     * | ------------------------ | ----------------------------------------------------------------------------------------------- |
     * | `$propertyName`          | Property name passed from `editorName` attribute of kpValueEditor component                     |
     * | `$model`                 | Current model                                                                                   |
     * | `$formModel`             | If `sendWholeForm` {@link type:KpAsyncValidationOptions option} is true, it contains form model |
     * | `$additionalParameters`  | Current model                                                                                   |
     *//**
 * @ngdoc type
 * @name KpUniversalFormSettings
 * @module angularjs-value-editor
 *
 * @property {ObjectValueEditorField[]} fields Fields definition.
 * @property {string=} header Form header
 * @property {string=} footer Form footer
 *
 * @description
 *
 */
/*@ngInject*/
/**
 * @ngdoc component
 * @name kpUniversalForm
 * @module angularjs-value-editor
 *
 * @param {KpUniversalFormSettings} formSettings Definition of form content.
 * @param {string=} name Name of the form. Due to internal reason, it must be in accordance with `^[a-zA-Z0-9._]*$` regexp.
 * @param {function(IFormController)=} formController Connecting to controller.
 * @param {function(IFormController)=} formController.$formController Exposed form controller.
 * @param {function(Event)=} onSubmit Function called on submit form.
 * @param {Event=} onSubmit.$event Submit event.
 * @param {ObjectValueEditorLabelsWidth=} labelsWidth See {@link ObjectValueEditorOptions}. Default value is `2`.
 * @param {boolean=} forceShowErrors If `true` it displays all validation error messages.
 * @param {KpUniversalFormComponentOptions=} options Specific options for universal form.
 * @param {{}=} asyncValidationsModel Specify model for async validations. If defined, all async validations with set `wholeForm = true` use this model.
 *
 * @description
 * Component for generating forms by definition passed via `formSettings` attribute.
 *
 * @example
 * <example name="universalFormExample" module="universalFormExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main class="container" ng-controller="controller as $ctrl">
 *              <kp-universal-form ng-model="model" name="myForm" form-settings="$ctrl.formSettings" form-controller="formController = $formController"></kp-universal-form>
 *              <div>Model:</div>
 *              <pre ng-bind="model | json"></pre>
 *              <div>Form controller:</div>
 *              <pre ng-bind="formController | json"></pre>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('universalFormExample', ['angularjs-value-editor'])
 *          .controller('controller', class {
 *              formSettings = {
 *                  header: '<h3>Header</h3>',
 *                  footer: '<hr><h4>Footer</h4>',
 *                  fields: [
 *                      {
 *                          label: 'Text',
 *                          fieldName: 'text',
 *                          editor: {
 *                              type: 'text',
 *                              editorName: 'text',
 *                              validations: {
 *                                  required: true
 *                              }
 *                          }
 *                      },
 *                      {
 *                          label: 'Number',
 *                          fieldName: 'number',
 *                          editor: {
 *                              type: 'number',
 *                              editorName: 'number'
 *                          }
 *                      },
 *                      {
 *                          label: 'Data',
 *                          fieldName: 'date',
 *                          editor: {
 *                              type: 'list',
 *                              editorName: 'dates',
 *                              options: {
 *                                  subEditorType: 'date',
 *                                  newItemPrototype: '',
 *                                  subEditorValidations: {
 *                                      required: true
 *                                  }
 *                              },
 *                              validations: {
 *                                  required: true
 *                              }
 *                          }
 *                      }
 *                  ]
 *              };
 *          });
 *     </file>
 * </example>
 */
/**
 * @ngdoc type
 * @name KpUniversalFormComponentOptions
 * @module angularjs-value-editor
 *
 * @property {boolean} preciseWatchForOptionsChanges {@link kpValueEditorConfigurationServiceProvider}
 *
 * @description
 * Options for {@link kpUniversalForm}
 *
 *//* tslint:disable:prefer-const */
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*//*@ngInject*/
/**
 * @ngdoc component
 * @name kpValueEditorForceSetting
 * @module angularjs-value-editor.force-settings
 *
 * @template OPTIONS
 * @template VALIDATIONS
 *
 * @requires component:kpValueEditorForceSettings
 *
 * @param {CustomValueEditorType=} type Type of value editor. If `type` is not specified, options will be passed to all editors.
 * @param {OPTIONS=} options Options
 * @param {VALIDATIONS=} validations Validations (not implemented yet)
 * @param {KpValueEditorForceSettingsMergeStrategy=} strategy If some option is object, this param specifies merge strategy.
 *
 * @description
 * This component is used for override options and validations for specified type of value editor. It requires {@link component:kpValueEditorForceSettings}
 */
/**
 * @ngdoc type
 * @name KpValueEditorForceSettingsMergeStrategy
 * @module angularjs-value-editor.force-settings
 *
 * @description
 * ```
 *  type KpValueEditorForceSettingsMergeStrategy = 'overwrite' | 'merge';
 * ```
 *
 * Default value: {@link DEFAULT_MERGE_STRATEGY}.
 */
/**
 * @ngdoc constant
 * @name DEFAULT_MERGE_STRATEGY
 * @module angularjs-value-editor.force-settings
 *
 * @description
 * Default value for {@link KpValueEditorForceSettingsMergeStrategy}
 *
 * ```
 *  const DEFAULT_MERGE_STRATEGY: KpValueEditorForceSettingsMergeStrategy = 'overwrite';
 * ```
 *//**
 * @ngdoc component
 * @name kpValueEditorForceSettings
 * @module angularjs-value-editor.force-settings
 *
 * @description
 *  This component allows to force settings of value-editor.
 *
 * @example
 * <example name="valueEditorForceSettingsExample" module="valueEditorForceSettingsExample" frame-no-resize="true">
 *   <file name="index.html">
 *       <main>
 *            <kp-value-editor-force-settings>
 *                <kp-value-editor-force-setting type="text" options="{type: 'textarea'}"></kp-value-editor-force-setting>
 *
 *                <kp-value-editor type="'text'" ng-model="model" options="{type: 'text'}"></kp-value-editor>
 *            </kp-value-editor-force-settings>
 *            <div>{{model}}</div>
 *       </main>
 *   </file>
 *   <file name="script.js">
 *       angular.module('valueEditorForceSettingsExample', ['angularjs-value-editor']);
 *   </file>
 * </example>
 */
/* tslint:disable-next-line:max-classes-per-file*//**
 * @ngdoc module
 * @name angularjs-value-editor.force-settings
 * @module angularjs-value-editor.force-settings
 *
 * @description
 *
 *//* tslint:disable-next-line:variable-name*/
/*@ngInject*/
/* @ts-ignore*/
/*@ngInject*/
/* @ts-ignore*/
/*@ngInject*/
/* @ts-ignore*/
/*@ngInject*/
/* @ts-ignore*/
/*@ngInject*//**
 * @ngdoc provider
 * @name kpValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor
 *
 * @description
 * Provider for {@link kpValueEditorConfigurationService}
 */
/**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDebugMode
     *
     * @param {boolean} isEnabled
     *
     * @description
     * Enable / disable debug mode. It show / hide information section below value editor.
     */
/**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDebugMode
     *
     * @param {boolean} preciseWatchForOptionsChanges
     *
     * @description
     * It enables deep watching for changes in value editors options.
     * If watching for changes is not needed, it's recommended set it to `false` due to high system requirements.
     * (It makes deep equal of options in each digest cycle).
     */
/**
     * @ngdoc method
     * @name kpValueEditorConfigurationServiceProvider#setDisableAutoWrapping
     *
     * @param {boolean} disableAutoWrapping
     *
     * @description
     * If `true`, {@link errorMessages} directive will not wrap value editor, if its parent element isn't relatively positioned.
     */
/**
 * @ngdoc service
 * @name kpValueEditorConfigurationService
 * @module angularjs-value-editor
 *
 * @property {boolean} debugMode Show debug information
 * @property {boolean} preciseWatchForOptionsChanges
 *
 * @description
 *
 * Default options:
 * ```
 *  {
 *      debugMode: false,
 *      preciseWatchForOptionsChanges: false
 *  }
 * ```
 *//*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*//**
 * @ngdoc provider
 * @name kpValueEditorRegistrationServiceProvider
 * @module angularjs-value-editor
 *
 * @description
 * This provider is user for registering new value editor types.
 */
/**
     * Map<type, selector>
     */
/**
     * @ngdoc method
     * @name kpValueEditorRegistrationServiceProvider#registerEditor
     *
     * @param {CustomValueEditorType} type New value editor type.
     * @param {string} selector Value editor component element selector.
     *
     * @description
     * Registers new value editor component.
     *
     * `type` and `selector` must be unique.
     */
/*@ngInject*/
/**
 * @ngdoc service
 * @name kpValueEditorRegistrationService
 * @module angularjs-value-editor
 *
 * @description
 *
 */
/**
     * @ngdoc method
     * @name kpValueEditorRegistrationService#getSelectorForType
     *
     * @param {CustomValueEditorType} type Value editor type. Aliases are supported.
     *
     * @returns {string} Value editor component selector.
     *
     * @description
     * Returns registered value editor component selector for dynamic create HTML tag as editor template.
     *
     * If no selector for type is found, it throws error.
     *//* Bindings */
/* settings for specific value editor sub-component*/
/* required component controllers*/
/* settings for common kp-value-editor wrapper component*/
/* Internal */
/*@ngInject*/
/* initialization in $onInit section*/
/**
     * Manually check options update. $onChanges is not applicable, because we need deep equals, which $onChanges does not perform.
     */
/* initialization in $onInit section*/
/**
 * @ngdoc component
 * @name kpValueEditor
 * @module angularjs-value-editor
 *
 * @requires ng.type.ngModel.NgModelController
 *
 * @param {string} editorId Input id. <.
 * @param {string} editorName Input name. <.
 * @param {string} placeholder Placeholder. <.
 * @param {string} type ValueEditor type. <.
 * @param {boolean} isDisabled If input is disabled. <.
 * @param {boolean} isVisible If input is visible. <.
 * @param {ValueEditorValidations} validations ValueEditor validations. <.
 * @param {ValueEditorOptions} options ValueEditor options. Type depends on ValueEditor type. <.
 * @param {ValueEditorLocalizations} localizations Custom localizations overriding default ones.
 * @description
 * Generic value editor depends on type:
 *
 * - `text`: {@link textValueEditor}
 * - `number`: {@link numberValueEditor}
 */
/**
 * @ngdoc type
 * @name ValueEditorValidations
 * @module angularjs-value-editor
 *
 * @property {boolean} required Optional required validation.
 * @property {KpAsyncValidationOptions} async Boolean or definition for remote validation.
 */
/**
 * @ngdoc type
 * @name ValueEditorOptions
 * @module angularjs-value-editor
 *
 * @property {boolean} forceShowErrors Force show validations error messages.
 * @property {boolean} emptyAsNull If `true`, empty value will be passed as `null` to model.
 * @property {function} customEmptyAsNullCheck Custom check of empty value. If returns `true` it sign empty value.
 *  ```
 *  function ($value, ...args): boolean;
 *  ```
 * Function is invoked via [$injector.invoke](https://docs.angularjs.org/api/auto/service/$injector#invoke) with following locals:
 *
 * | Injectable&nbsp;argument&nbsp;name | Description                |
 * | ---------------------------------- | -------------------------- |
 * | `$value`: `MODEL`                  | Current value-editor model |
 */
/* tslint:disable-next-line:ban-types*/
/**
 * @ngdoc type
 * @name ValueEditorBindings
 * @module angularjs-value-editor
 *
 * @property {string} editorId Input id.
 * @property {string} editorName Input name.
 * @property {string} placeholder Placeholder.
 * @property {string} type ValueEditor type.
 * @property {boolean} disabled If input is disabled.
 * @property {boolean} visible If input is visible.
 * @property {ValueEditorValidations} validations ValueEditor validations.
 * @property {ValueEditorOptions} options ValueEditor options. Type depends on ValueEditor type.
 * @property {ValueEditorLocalizations} localizations Custom localizations overriding default ones.
 *
 * @description
 * {@link kpValueEditor} attributes definition.
 *//**
 * @ngdoc type
 * @name ListValueEditorOptions
 * @module angularjs-value-editor.list
 *
 * @template MODEL
 * @template OPTIONS
 * @template VALIDATIONS
 *
 * @property {CustomValueEditorType} subEditorType
 * @property {MODEL} newItemPrototype
 * @property {OPTIONS=} subEditorOptions
 * @property {VALIDATIONS=} subEditorValidations
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link listValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name listValueEditorDefaultOptions
 * @module angularjs-value-editor.list
 *
 * @description
 * For description see {@link ListValueEditorOptions}
 *
 * ```javascript
 * {
 *      subEditorType: 'text',
 *      newItemPrototype: '',
 *      subEditorOptions: undefined,
 *      subEditorValidations: undefined
 * }
 * ```
 */
/**
 * @ngdoc provider
 * @name listValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.list
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link listValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name listValueEditorConfigurationService
 * @module angularjs-value-editor.list
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link listValueEditorDefaultOptions}
 *//**
 * @ngdoc provider
 * @name listValueEditorLocalizationsServiceProvider
 * @module angularjs-value-editor.list
 *
 * @description
 * See {@link listValueEditorLocalizationsService}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name listValueEditorLocalizationsService
 * @module angularjs-value-editor.list
 *
 * @description
 * See {@link AbstractValueEditorLocalizationService}
 */
/**
 * @ngdoc type
 * @name ListValueEditorLocalizations
 * @module angularjs-value-editor.list
 *
 * @property {string} add
 * @property {string} remove
 *
 * @description
 * Default localizations: {@link listValueEditorDefaultLocalizations}
 */
/**
 * @ngdoc constant
 * @name listValueEditorDefaultLocalizations
 * @module angularjs-value-editor.list
 *
 * @description
 * ```
 * {
 *     add: 'Add',
 *     remove: 'Remove'
 * }
 * ```
 *//**
 * @ngdoc component
 * @name listValueEditorValidations
 * @module angularjs-value-editor.list
 *
 * @requires ^^kpValueEditor
 *
 * @description
 * Helper for required validation for {@link component:ListValueEditorComponent list value editor}
 *//*@ngInject*/
/**
 * @ngdoc component
 * @name listValueEditor
 * @module angularjs-value-editor.list
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `[]`
 *
 * Value editor for list input.
 *
 * Supported options: {@link type:ListValueEditorOptions}
 *
 * Supported validations: {@link type:ListValueEditorValidations}
 *
 * @example
 * <example name="listValueEditorExample" module="listValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'list'" ng-model="model" validations="{maxCount: 3}"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         angular.module('listValueEditorExample', ['angularjs-value-editor'])
 *     </file>
 * </example>
 */
/**
 * @ngdoc type
 * @name ListValueEditorValidations
 * @module angularjs-value-editor.list
 *
 * @property {number} maxCount Maximum count of items.
 *
 * @description
 * Extends {@link type:ValueEditorValidations}
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.list
 * @module angularjs-value-editor.list
 *
 * @description
 *
 *//**
     * Simulates click on add button
     * @returns {HTMLElement}
     */
/* add input*/
/* select last added input*/
/**
     * Simulates click on remove button
     * @param {number} index
     */
/*@ngInject*/
/* expect(() => removeItemOnIndex(0)).toThrow();*//**
 * @ngdoc type
 * @name ObjectValueEditorField
 * @module angularjs-value-editor.object
 *
 * @requires ValueEditorBindings
 *
 * @property {string} label Field label.
 * @property {string} fieldName Name of field in model.
 * @property {ValueEditorBindings} editor Value editor definition.
 *
 * @description
 * Definition of {@link objectValueEditor} fields.
 *
 */
/**
 * @ngdoc type
 * @name ObjectValueEditorLabelsWidth
 * @module angularjs-value-editor.object
 *
 * @description
 * Possible values of width of labels of {@link objectValueEditor}.
 *
 * ```
 *      type ObjectValueEditorLabelsWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
 * ```
 *
 */
/**
 * @ngdoc type
 * @name ObjectValueEditorOptions
 * @module angularjs-value-editor.object
 *
 * @property {ObjectValueEditorField} fields Definition of editor fields
 * @property {function(ValueEditorBindings): ValueEditorBindings} attributesTransformation Function that transforms ValueEditorBindings.
 * It is useful for situation when You have `name` from backend and You want to have `id` of value editor to be same as `name`.
 *
 * Example:
 * ```
 *      function(attrs) { attrs.editorId = attrs.editorName; return attrs;}
 * ```
 *
 * @property {ObjectValueEditorLabelsWidth} labelsWidth Width of labels of {@link objectValueEditor} in [Bootstrap](https://getbootstrap.com/docs/3.4/css/#grid-options) `col`s.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link objectValueEditorDefaultOptions}
 */
/**
 * @ngdoc constant
 * @name objectValueEditorDefaultOptions
 * @module angularjs-value-editor.object
 *
 * @description
 * For description see {@link ObjectValueEditorOptions}
 *
 * ```javascript
 * {
 *      fields: [],
 *      attributesTransformation: undefined,
 *      labelsWidth: 2
 * }
 * ```
 */
/**
 * @ngdoc provider
 * @name objectValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.object
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link objectValueEditorDefaultOptions}
 */
/*@ngInject*/
/**
 * @ngdoc service
 * @name objectValueEditorConfigurationService
 * @module angularjs-value-editor.object
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link objectValueEditorDefaultOptions}
 */
/* if true, it does not render ng-form around nested fields. This functionality use kp-universal-form.*//*@ngInject*/
/* @ts-ignore Init form with anything*/
/* Empty object value editor does not give a sense.*/
/* TODO: Compose empty model by editor configuration*/
/**
 * @ngdoc component
 * @name objectValueEditor
 * @module angularjs-value-editor.object
 *
 * @requires ng.type.ngModel.NgModelController
 * @requires component:kpValueEditor
 *
 * @description
 * Model type: `{}`
 *
 * Value editor for object input.
 *
 * Supported options: {@link type:ObjectValueEditorOptions}
 *
 * Supported validations: {@link type:ValueEditorValidations}
 *
 * @example
 * <example name="objectValueEditorExample" module="objectValueEditorExample" frame-no-resize="true">
 *     <file name="index.html">
 *         <main>
 *              <kp-value-editor type="'object'" ng-model="model"></kp-value-editor>
 *              <div>Model: {{model}}</div>
 *         </main>
 *     </file>
 *     <file name="script.js">
 *         luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
 *         angular.module('objectValueEditorExample', ['angularjs-value-editor'])
 *          .config(['objectValueEditorConfigurationServiceProvider', function(objectValueEditorConfigurationServiceProvider) {
 *              objectValueEditorConfigurationServiceProvider.setConfiguration({
 *                  fields: [
 *                      {
 *                          label: 'Text',
 *                          fieldName: 'text',
 *                          editor: {
 *                              type: 'text',
 *                              editorName: 'texttext'
 *                          }
 *                      },
 *                      {
 *                          label: 'Number',
 *                          fieldName: 'number',
 *                          editor: {
 *                              type: 'number',
 *                          }
 *                      },
 *                      {
 *                          label: 'Data',
 *                          fieldName: 'dates',
 *                          editor: {
 *                              type: 'list',
 *                              editorName: 'dates',
 *                              options: {
 *                                  subEditorType: 'date',
 *                                  newItemPrototype: ''
 *                              }
 *                          }
 *                      }
 *                  ]
 *              });
 *          }]);
 *     </file>
 * </example>
 *//**
 * @ngdoc module
 * @name angularjs-value-editor.object
 * @module angularjs-value-editor.object
 *
 * @description
 *
 *//*@ngInject*//**
 * @ngdoc type
 * @name TMetaValueEditor
 * @module angularjs-value-editor
 *
 * @description
 * Meta-value editor types.
 *
 * ```
 * type TValueEditorTypeAliases =
 *  'list' |
 *  'object';
 * ```
 */
/**
 * @ngdoc type
 * @name TValueEditorTypeAliases
 * @module angularjs-value-editor
 *
 * @description
 * Aliased value editor types.
 *
 * ```
 * type TValueEditorTypeAliases =
 *   'single-acceptable' |
 *   'multiple-acceptable' |
 *  'multiple-acceptable-root' |
 *  'velocity-template';
 * ```
 */
/**
 * @ngdoc type
 * @name TValueEditorType
 * @module angularjs-value-editor
 *
 * @requires TValueEditorTypeAliases
 *
 * @description
 * Value editor types.
 *
 * ```js
 * type TValueEditorType =
 *      TValueEditorTypeAliases |
 *      'text' |
 *      'number' |
 *      'boolean' |
 *      'hidden' |
 *      'html' |
 *      'date' |
 *      'acceptable' |
 *      'year' |
 *      'autocomplete' |
 *      'password' |
 *      'number-range' |
 *      'acceptable-root' |
 *      'searchable' |
 *      'range';
 * ```
 */
/**
 * Make all properties required except properties of ValueEditorOptions
 *//* istanbul ignore file */
/* tested by angular team ツ*/
/**
 * Taken from original angular.js file.
 */
/* console.log(value);*/
/* NaN === NaN*/
/**
 * Modified `angular.equals` function for support function check also.
 *
 * TODO: Refactor this
 *
 * @param {any} o1
 * @param {any} o2
 *
 * @returns {boolean}
 */
/* istanbul ignore next */
/* eslint-disable-next-line no-self-compare*/
/* NaN === NaN*/
/* tslint:disable-next-line:no-conditional-assignment*/
/*else if (isRegExp(o1)) {
            if (!isRegExp(o2)) return false;
            return o1.toString() === o2.toString();
        } */
/* || isRegExp(o2)*/
/* || angular.isFunction(o1[key])*/
/* &&
                    !angular.isFunction(o2[key])*/
/* tslint:disable-next-line:no-unused-expression*/
/* tslint:disable-next-line:no-unused-expression*//* tslint:disable:no-empty *//* function should be last element*//**
 * Connects outer required ngModel with inner ngModel
 *//**
 * Generates random pseudo-UUID.
 */
/* tslint:disable-next-line*//*@ngInject*/
/* Core editors*/
/* Meta editors*//* EDITORS*/
/* META EDITORS*/
/* OTHER COMPONENTS*/
/* DIRECTIVES*/
/* COMMON SERVICES AND PROVIDERS*/
/* CONFIG*/
/**
 * @ngdoc constant
 * @name loadingSpinnerTemplateUrl
 * @module angularjs-value-editor
 *
 * @description
 * AngularJS template url with SVG spinner.
 *
 * It can be used for waiting for async operations, etc...
 */
/* tslint:disable-next-line:no-var-requires*/
/**
 * @ngdoc module
 * @name angularjs-value-editor
 * @module angularjs-value-editor
 */
/**
 * @typedef ng.type.ngModel
 * @typedef ng.type.ngModel.NgModelController
 */
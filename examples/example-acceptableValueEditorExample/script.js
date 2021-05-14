(function(angular) {
  'use strict';
angular.module('acceptableValueEditorExample', ['angularjs-value-editor'])
 .controller('demoController', ['acceptableValueEditorDefaultOptions', class {
     multiselectable;
     optionsTemplate;
     searchable;
     reorderable;
     showFirstCount;
     selectedFirst;
     sortModel;
     switchToInlineModeThreshold;
     modelAsArray;
     sortComparatorString = `($element1, $element2) => (($element1 || {x: ''}).x || '').localeCompare(($element2 || {x: ''}).x) * -1`;
     equalityComparatorString = '($element1, $element2) => $element1 && $element2 && $element1.x === $element2.x';

     constructor(acceptableValueEditorDefaultOptions) {
         angular.merge(this, acceptableValueEditorDefaultOptions);
         this.acceptableValues = [{x: 'a'}, {x: 'b'}, {x: 'c'}, {x: 'd'}, {x: 'e'}, {x: 'f'}, {x: 'g'}, {x: 'h'}];
         this.optionsTemplate = '{{$item.x}}';
         this.evalComparators();
     }

     evalComparators() {
         let sortComparator = undefined;
         let equalityComparator = undefined;

         try {
             sortComparator = eval(this.sortComparatorString);
             equalityComparator = eval(this.equalityComparatorString);
         } catch (e) {
             console.error('Invalid syntax');
         }

         this.sortComparator = sortComparator;
         this.equalityComparator = equalityComparator;
     }
 }]);
})(window.angular);
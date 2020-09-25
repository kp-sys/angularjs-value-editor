(function(angular) {
  'use strict';
luxon.Settings.defaultLocale = luxon.DateTime.local().resolvedLocaleOpts().locale;
angular.module('yearValueEditorExample', ['angularjs-value-editor']);
})(window.angular);
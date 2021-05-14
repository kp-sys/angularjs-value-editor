(function(angular) {
  'use strict';
angular.module('htmlValueEditorExample', ['angularjs-value-editor'])
     .config(['kpValueEditorConfigurationServiceProvider', (kpValueEditorConfigurationServiceProvider) => {
         kpValueEditorConfigurationServiceProvider.addValueEditorPreInitHook('html', () => new Promise((resolve) => {
             jQl.loadjQ('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', () => {

                 window.$ = $.noConflict();

                 function loadScript(url) {
                     return new Promise((resolve) => {
                           const element = document.createElement('script');
                           element.onload = resolve;
                           element.src = url;
                           element.type = 'text/javascript';
                           document.head.append(element);
                     });
                 }

                 return Promise.all([
                     loadScript('https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/trumbowyg.min.js'),
                     loadScript('https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/colors/trumbowyg.colors.min.js'),
                     loadScript('https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/plugins/table/trumbowyg.table.min.js')
                 ])
                 .then(() => $.trumbowyg.svgPath = 'https://cdnjs.cloudflare.com/ajax/libs/Trumbowyg/2.14.0/ui/icons.svg')
                 .then(resolve);
             });
         }));
     }]);
})(window.angular);
declare global {
    interface Window {
        jQuery: JQueryStatic;
        $: JQueryStatic;
        luxon: any;
    }
}

import * as jQuery from 'jquery';
import 'angular';
import './required-vendors';
import register from '@kpsys/angularjs-register';
import valueEditorModule from '../dist/angularjs-value-editor';
import '../dist/angularjs-value-editor.css';
import DemoController from './demo.controller';

window.$ = window.jQuery = jQuery;

register('app', [valueEditorModule])
    .controller('demoController', DemoController);

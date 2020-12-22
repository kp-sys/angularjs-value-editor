import * as jQuery from 'jquery';
import 'angular';
import './required-vendors';
import '@kpsys/angular-ui-bootstrap';
import register from '@kpsys/angularjs-register';
import valueEditorModule from '../dist/angularjs-value-editor';
import '../dist/angularjs-value-editor.css';
import DemoController from './full-demo/demo.controller';
import config from './app.config';
import * as ngAnimateModule from 'angular-animate';
import LabController from './lab/lab.controller';
import ModalComponent from './modal/modal.component';

declare global {
    interface Window {
        jQuery: JQueryStatic;
        $: JQueryStatic;
        luxon: any;
    }
}

window.$ = window.jQuery = jQuery;

register('app', [valueEditorModule, ngAnimateModule, 'ui.bootstrap'])
    .config(config)
    .component(ModalComponent.componentName, ModalComponent)
    .controller(DemoController.controllerName, DemoController)
    .controller(LabController.controllerName, LabController);

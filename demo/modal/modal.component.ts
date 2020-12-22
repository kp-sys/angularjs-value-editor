import {Component} from '@kpsys/angularjs-register';
import {IOnInit} from 'angular';

export abstract class ModalComponentController implements ModalComponentBindings, IOnInit {
    private model: { opt: number };
    public resolve: { model: { opt: number } };

    public $onInit(): void {
        this.model = this.resolve.model;
    }

    public abstract close(locals: { $value: {} });

    public abstract dismiss();

    public select(what: { opt: number }) {
        this.model = what;
    }
}

/**
 * @ngdoc component
 * @name modal
 * @module app
 *
 * @description
 *
 */
export default class ModalComponent implements Component<ModalComponentBindings> {
    public static componentName = 'modal';

    public templateUrl = require('./modal.tpl.pug');

    public bindings = {
        resolve: '<',
        close: '&',
        dismiss: '&'
    } as const;

    public controller = ModalComponentController;
}

interface ModalComponentBindings {
    resolve: { model: { opt: number } };

    close(locals: { $value: {} });

    dismiss();
}

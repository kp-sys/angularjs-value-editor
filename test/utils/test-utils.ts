import * as angular from 'angular';

export function patchAngularElementToReturnInjector($injector: angular.auto.IInjectorService) {
    spyOn(angular.element.prototype, 'injector').and.callFake(() => {
        return $injector;
    });
}

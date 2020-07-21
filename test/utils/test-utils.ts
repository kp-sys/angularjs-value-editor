import IInjectorService = angular.auto.IInjectorService;
import * as angular from 'angular';

export function patchAngularElementToReturnInjector($injector: IInjectorService) {
    spyOn(angular.element.prototype, 'injector').and.callFake(() => {
        return $injector;
    });
}

/* tslint:disable:no-empty */
import isInjectable from './injectables';

describe('utils/injectables', () => {

    it('should return true if testing value is injectable', () => {

        const functionWithoutArguments = () => {};
        const functionWithTwoArguments = (a, b) => {};
        functionWithTwoArguments.$inject = ['$injector', '$timeout'];

        const arrayWithOnlyFunctionWithZeroArguments = [() => {}];
        const arrayWithDependenciesAndFunction = ['$injector', '$timeout', (a, b) => {}];

        expect(isInjectable(functionWithoutArguments)).toBeTrue();
        expect(isInjectable(functionWithTwoArguments)).toBeTrue();
        expect(isInjectable(arrayWithOnlyFunctionWithZeroArguments)).toBeTrue();
        expect(isInjectable(arrayWithDependenciesAndFunction)).toBeTrue();
    });

    it('should return false if testing value is not injectable', () => {
        const functionWithTwoArgumentsWithout$inject = (a, b) => {};
        const functionWithTwoArgumentsWithNonComplete$inject = (a, b) => {};
        functionWithTwoArgumentsWithNonComplete$inject.$inject = ['$injector'];

        const arrayWithoutFunction = ['$injector'];
        const arrayWithOnlyFunctionWithOneArgument = [(a) => {}];
        const arrayWithWrongCountOfDependenciesAndFunction1 = ['$injector', (a, b) => {}];
        const arrayWithWrongCountOfDependenciesAndFunction2 = ['$injector', '$timeout', (a) => {}];

        expect(isInjectable(functionWithTwoArgumentsWithout$inject)).toBeFalse();
        expect(isInjectable(functionWithTwoArgumentsWithNonComplete$inject)).toBeFalse();
        expect(isInjectable(arrayWithoutFunction)).toBeFalse();
        expect(isInjectable(arrayWithOnlyFunctionWithOneArgument)).toBeFalse();
        expect(isInjectable(arrayWithWrongCountOfDependenciesAndFunction1)).toBeFalse();
        expect(isInjectable(arrayWithWrongCountOfDependenciesAndFunction2)).toBeFalse();
    });
});

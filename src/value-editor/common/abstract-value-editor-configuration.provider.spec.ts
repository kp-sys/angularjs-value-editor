import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from './abstract-value-editor-configuration.provider';
import register from '@kpsys/angularjs-register';
import aliasesModule from '../aliases/aliases.module';
import {DefaultOptions} from '../typings';
import * as angular from 'angular';
import {AliasesServiceProvider} from '../aliases/aliases.service';
import objectContaining = jasmine.objectContaining;

interface TestingOptions {
    opt1: string;
    opt2: number;
    opt3: {
        opt3opt1: string;
    }
}

const TESTING_OPTIONS: DefaultOptions<TestingOptions> = Object.freeze({
    opt1: 'opt1',
    opt2: 2,
    opt3: {
        opt3opt1: 'opt3opt1'
    }
});

class TestingProvider extends AbstractValueEditorConfigurationProvider<TestingOptions> {
    public static readonly providerName = 'testingService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, testingOptions: TestingOptions) {
        super(aliasesServiceProvider, testingOptions);
    }
}

interface TestingService extends AbstractValueEditorConfigurationService<TestingOptions> {
}

const testingModule = register('configurations-module', [aliasesModule])
    .constant('testingOptions', TESTING_OPTIONS)
    .provider(TestingProvider.providerName, TestingProvider)
    .name();


describe('abstract-value-editor-configuration-provider', () => {

    it('should return default options', () => {
        let testService: TestingService;

        angular.mock.module(testingModule);

        inject(/*@ngInject*/ (testingService: TestingService) => {
            testService = testingService;
        });

        // try to change options via reference
        testService.getDefaults().opt3.opt3opt1 = 'blablabla';
        testService.getConfiguration().opt3.opt3opt1 = 'blablabla';

        expect(testService.getDefaults()).toEqual(TESTING_OPTIONS);
        expect(testService.getConfiguration()).toEqual(TESTING_OPTIONS);
    });

    it('should return custom options', () => {
        let testService: TestingService;
        const CUSTOM_NUMBER = 395;

        angular.mock.module(testingModule, /*@ngInject*/(testingServiceProvider: TestingProvider) => {
            testingServiceProvider.setConfiguration({
                opt2: CUSTOM_NUMBER
            });
        });

        inject(/*@ngInject*/ (testingService: TestingService) => {
            testService = testingService;
        });

        expect(testService.getDefaults()).toEqual(TESTING_OPTIONS);
        expect(testService.getConfiguration()).toEqual({
            opt1: TESTING_OPTIONS.opt1,
            opt2: CUSTOM_NUMBER,
            opt3: TESTING_OPTIONS.opt3
        });
    });

    it('should return custom options and change options by service', () => {
        let testService: TestingService;
        const CUSTOM_NUMBER = 395;
        const CUSTOM_OPT1 = 'blablabla';

        angular.mock.module(testingModule, /*@ngInject*/(testingServiceProvider: TestingProvider) => {
            testingServiceProvider.setConfiguration({
                opt2: CUSTOM_NUMBER
            });
        });

        inject(/*@ngInject*/ (testingService: TestingService) => {
            testService = testingService;
        });

        testService.setConfiguration({opt1: CUSTOM_OPT1});

        expect(testService.getDefaults()).toEqual(TESTING_OPTIONS);
        expect(testService.getConfiguration()).toEqual({
            opt1: CUSTOM_OPT1,
            opt2: CUSTOM_NUMBER,
            opt3: TESTING_OPTIONS.opt3
        });
    });

    it('should have working alias configuration', () => {
        let testService: TestingService;
        const ALIAS = 'custom-test';

        angular.mock.module(testingModule, /*@ngInject*/(testingServiceProvider: TestingProvider, aliasesServiceProvider: AliasesServiceProvider) => {
            aliasesServiceProvider.addAlias(ALIAS, 'test');

            testingServiceProvider
                .forAlias(ALIAS)
                .setConfiguration({opt1: 'blablabla'});
        });

        inject(/*@ngInject*/ (testingService: TestingService) => {
            testService = testingService;
        });

        expect(testService.getDefaults()).toEqual(TESTING_OPTIONS);
        expect(testService.getConfiguration()).toEqual(TESTING_OPTIONS);

        expect(testService.forAlias(ALIAS).getConfiguration()).toEqual(objectContaining({opt1: 'blablabla'}));
    });
});

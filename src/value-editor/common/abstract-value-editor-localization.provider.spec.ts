import AbstractValueEditorLocalizationProvider, {
    AbstractValueEditorLocalizationService,
    ValueEditorLocalizations
} from './abstract-value-editor-localization.provider';
import register from '@kpsys/angularjs-register';
import * as angular from 'angular';

interface TestingLocalizations extends ValueEditorLocalizations {
    loc1;
    loc2;
}

const TESTING_LOCALIZATIONS: TestingLocalizations = Object.freeze({
    loc1: 'loc1',
    loc2: 'loc2'
});

class TestingProvider extends AbstractValueEditorLocalizationProvider<TestingLocalizations> {
    public static readonly providerName = 'testingService';

    /*@ngInject*/
    constructor(testingLocalizations: TestingLocalizations) {
        super(testingLocalizations);
    }
}

interface TestingService extends AbstractValueEditorLocalizationService<TestingLocalizations> {
}

const testingModule = register('localizations-module')
    .constant('testingLocalizations', TESTING_LOCALIZATIONS)
    .provider(TestingProvider.providerName, TestingProvider)
    .name();

describe('abstract-value-editor-localizations-provider', () => {

    it('should return default localizations', () => {
        let testService: TestingService;

        angular.mock.module(testingModule);

        inject(/*@ngInject*/ (testingService: TestingService) => {
            testService = testingService;
        });

        testService.getAll().loc1 = 'blablabla';

        expect(testService.getLocalization('loc1')).toBe(TESTING_LOCALIZATIONS.loc1);
        expect(testService.getAll()).toEqual(TESTING_LOCALIZATIONS);
    });

    it('should return custom options', () => {
        let testService: TestingService;
        const CUSTOM_LOC = 'custom';

        angular.mock.module(testingModule, /*@ngInject*/ (testingServiceProvider: TestingProvider) => {
            testingServiceProvider.setLocalization('loc1', CUSTOM_LOC);
        });

        inject(/*@ngInject*/ (testingService: TestingService) => {
            testService = testingService;
        });

        expect(testService.getLocalization('loc1')).toBe(CUSTOM_LOC);
        expect(testService.getAll()).toEqual({
            loc1: CUSTOM_LOC,
            loc2: TESTING_LOCALIZATIONS.loc2
        });
    });

    it('should return custom options', () => {
        let testService: TestingService;
        const CUSTOM_ALL_LOC_ORIGINAL: TestingLocalizations = Object.freeze({
            loc1: 'cloc1',
            loc2: 'cloc2'
        });

        const CUSTOM_ALL_LOC = Object.assign({}, CUSTOM_ALL_LOC_ORIGINAL);

        angular.mock.module(testingModule, /*@ngInject*/ (testingServiceProvider: TestingProvider) => {
            testingServiceProvider.setAll(CUSTOM_ALL_LOC);
        });

        inject(/*@ngInject*/ (testingService: TestingService) => {
            testService = testingService;
        });

        CUSTOM_ALL_LOC.loc1 = 'blablabla';

        expect(testService.getAll()).toEqual(CUSTOM_ALL_LOC_ORIGINAL);
    });

});

import * as angular from 'angular';
import aliasesModule from '../aliases/aliases.module';
import AliasesService, {AliasesServiceProvider} from './aliases.service';
import {ValueEditorOptions} from '../kp-value-editor/kp-value-editor.component';

const ALIAS_NAME = 'some-editor';

interface SomeEditorOptions extends ValueEditorOptions {
    some: string;
}

describe('aliases service', () => {

    it('should add new alias', () => {
        let _aliasesService: AliasesService;

        angular.mock.module(aliasesModule, /*@ngInject*/(aliasesServiceProvider: AliasesServiceProvider) => {
            aliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');
        });

        inject(/*@ngInject*/ (aliasesService) => {
            _aliasesService = aliasesService;
        })

        expect(_aliasesService.isAlias(ALIAS_NAME)).toBe(true);
        expect(_aliasesService.getAlias(ALIAS_NAME)).toBe('editor');
    });

    it('should throw error if alias exist', () => {
        angular.mock.module(aliasesModule, /*@ngInject*/(aliasesServiceProvider: AliasesServiceProvider) => {
            aliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');

            expect(() => aliasesServiceProvider.addAlias(ALIAS_NAME, 'editor')).toThrow();
        });
    });

    it('should remove alias', () => {
        angular.mock.module(aliasesModule, /*@ngInject*/(aliasesServiceProvider: AliasesServiceProvider) => {
            aliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');

            expect(() => aliasesServiceProvider.addAlias(ALIAS_NAME, 'editor')).toThrow();

            aliasesServiceProvider.removeAlias(ALIAS_NAME);

            expect(() => aliasesServiceProvider.addAlias(ALIAS_NAME, 'editor')).not.toThrow();
        });
    });

    it('should throw error if alias does not exist', () => {
        let _aliasesService: AliasesService;

        angular.mock.module(aliasesModule, /*@ngInject*/(aliasesServiceProvider: AliasesServiceProvider) => {
            aliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');
        });

        inject(/*@ngInject*/ (aliasesService) => {
            _aliasesService = aliasesService;
        })

        expect(_aliasesService.isAlias('sjkkdbcsj')).toBe(false);
        expect(() => _aliasesService.getAlias('dnwkejbfrj')).toThrow();
    });
});

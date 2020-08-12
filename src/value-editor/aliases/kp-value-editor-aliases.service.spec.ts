import * as angular from 'angular';
import aliasesModule from '../aliases/kp-value-editor-aliases.module';
import KpValueEditorAliasesService, {KpValueEditorAliasesServiceProvider} from './kp-value-editor-aliases.service';
import {ValueEditorOptions} from '../kp-value-editor/kp-value-editor.component';

const ALIAS_NAME = 'some-editor';

interface SomeEditorOptions extends ValueEditorOptions {
    some: string;
}

describe('aliases service', () => {

    it('should add new alias', () => {
        let _kpValueEditorAliasesService: KpValueEditorAliasesService;

        angular.mock.module(aliasesModule, /*@ngInject*/(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider) => {
            kpValueEditorAliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');
        });

        inject(/*@ngInject*/ (kpValueEditorAliasesService) => {
            _kpValueEditorAliasesService = kpValueEditorAliasesService;
        })

        expect(_kpValueEditorAliasesService.isAlias(ALIAS_NAME)).toBe(true);
        expect(_kpValueEditorAliasesService.getAlias(ALIAS_NAME)).toBe('editor');
    });

    it('should throw error if alias exist', () => {
        angular.mock.module(aliasesModule, /*@ngInject*/(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider) => {
            kpValueEditorAliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');

            expect(() => kpValueEditorAliasesServiceProvider.addAlias(ALIAS_NAME, 'editor')).toThrow();
        });
    });

    it('should remove alias', () => {
        angular.mock.module(aliasesModule, /*@ngInject*/(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider) => {
            kpValueEditorAliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');

            expect(() => kpValueEditorAliasesServiceProvider.addAlias(ALIAS_NAME, 'editor')).toThrow();

            kpValueEditorAliasesServiceProvider.removeAlias(ALIAS_NAME);

            expect(() => kpValueEditorAliasesServiceProvider.addAlias(ALIAS_NAME, 'editor')).not.toThrow();
        });
    });

    it('should throw error if alias does not exist', () => {
        let _kpValueEditorAliasesService: KpValueEditorAliasesService;

        angular.mock.module(aliasesModule, /*@ngInject*/(kpValueEditorAliasesServiceProvider: KpValueEditorAliasesServiceProvider) => {
            kpValueEditorAliasesServiceProvider.addAlias(ALIAS_NAME, 'editor');
        });

        inject(/*@ngInject*/ (kpValueEditorAliasesService) => {
            _kpValueEditorAliasesService = kpValueEditorAliasesService;
        })

        expect(_kpValueEditorAliasesService.isAlias('sjkkdbcsj')).toBe(false);
        expect(() => _kpValueEditorAliasesService.getAlias('dnwkejbfrj')).toThrow();
    });
});

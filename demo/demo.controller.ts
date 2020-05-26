import {ObjectValueEditorFieldSettings} from '../src/value-editor/meta-editors/object/object-value-editor-configuration.provider';
import {TextValueEditorOptions} from '../src/value-editor/editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../src/value-editor/editors/text/text.value-editor.component';
import {AcceptableValueEditorOptions} from '../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';
import {IndexSelectionValueEditorOptions} from '../src/value-editor/editors/index-selection/index-selection-value-editor-configuration.provider';
import {PasswordValueEditorOptions} from '../src/value-editor/editors/password/password-value-editor-configuration.provider';
import {SignatureValueEditorOptions} from '../src/value-editor/editors/signature/signature-value-editor-configuration.provider';
import {AccessNumberValueEditorOptions} from '../src/value-editor/editors/access-number/access-number-value-editor-configuration.provider';
import {AcceptableRootValueEditorOptions} from '../src/value-editor/editors/acceptable-root/acceptable-root-value-editor-configuration.provider';
import {SearchableValueEditorOptions} from '../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';
import {ITimeoutService} from 'angular';

export default class DemoController {

    public model = {};
    public showErrors: boolean;

    public fields: ObjectValueEditorFieldSettings[] = [
        {
            label: 'text:text',
            type: 'text',
            editorName: 'text-text',
            validations: {
                required: true,
                pattern: 'abc',
                minlength: 5
            } as TextValueEditorValidations
        },
        {
            label: 'text:textarea',
            type: 'text',
            editorName: 'textarea',
            options: {
                type: 'textarea'
            } as TextValueEditorOptions,
            validations: {
                required: true
            }
        },
        {
            label: 'text:rich-textarea',
            type: 'text',
            editorName: 'richtextarea',
            options: {
                type: 'rich-textarea'
            } as TextValueEditorOptions,
            validations: {
                required: true
            }
        },
        {
            label: 'number',
            type: 'number',
            editorName: 'number',
            validations: {
                required: true
            }
        },
        {
            label: 'boolean',
            type: 'boolean',
            editorName: 'boolean',
            validations: {
                required: true
            }
        },
        {
            label: 'html',
            type: 'html',
            editorName: 'html',
            validations: {
                required: true
            }
        },
        {
            label: 'date',
            type: 'date',
            editorName: 'date',
            validations: {
                required: true
            }
        },
        {
            label: 'acceptable:select',
            type: 'acceptable',
            editorName: 'acceptable-select',
            validations: {
                required: true
            },
            options: {
                acceptableValues: [
                    'one',
                    'two',
                    'three'
                ]
            } as AcceptableValueEditorOptions<string>
        },
        {
            label: 'acceptable:checkboxes',
            type: 'acceptable',
            editorName: 'acceptableCheckboxes',
            validations: {
                required: true
            },
            options: {
                acceptableValues: [
                    'one',
                    'two',
                    'three'
                ],
                switchToCheckboxesThreshold: 1,
                multiselectable: true,
                showFirstCount: 2
            } as AcceptableValueEditorOptions<string>
        },
        {
            label: 'year',
            type: 'year',
            editorName: 'year',
            validations: {
                required: true
            }
        },
        {
            label: 'card-number',
            type: 'card-number',
            editorName: 'card-number',
            validations: {
                required: true
            }
        },
        {
            label: 'index-selection',
            type: 'index-selection',
            editorName: 'index-selection',
            options: {
                items: [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }
                ]
            } as IndexSelectionValueEditorOptions<number>,
            validations: {
                required: true
            }
        },
        {
            label: 'autocomplete',
            type: 'autocomplete',
            editorName: 'autocomplete',
            validations: {
                required: true
            }
        },
        {
            label: 'password',
            type: 'password',
            editorName: 'password',
            validations: {
                required: true
            }
        },
        {
            label: 'password:confirmation',
            type: 'password',
            editorName: 'password:confirmation',
            validations: {
                required: true
            },
            options: {
                withConfirmation: true
            } as PasswordValueEditorOptions
        },
        {
            label: 'signature',
            type: 'signature',
            editorName: 'signature',
            validations: {
                required: true
            },
            options: {
                dataSource: () => Promise.resolve(['one', 'two', 'three']),
                canDoAction: true
            } as SignatureValueEditorOptions
        },
        {
            label: 'access-number',
            type: 'access-number',
            editorName: 'access-number',
            validations: {
                required: true
            },
            options: {
                dataSource: () => Promise.resolve(['one', 'two', 'three']),
                canDoAction: true
            } as AccessNumberValueEditorOptions
        },
        {
            label: 'number-range',
            type: 'number-range',
            editorName: 'number-range',
            validations: {
                required: true
            }
        },
        {
            label: 'acceptable-root',
            type: 'acceptable-root',
            editorName: 'acceptable-root',
            validations: {
                required: true
            },
            options: {
                optionsTemplate: '{{$node.text}}',
                acceptableValue: {
                    text: '0',
                    children: [
                        {
                            text: '1-1'
                        },
                        {
                            text: '1-2'
                        }
                    ]
                }
            } as AcceptableRootValueEditorOptions<any>
        },
        {
            label: 'multiple-acceptable-root',
            type: 'multiple-acceptable-root',
            editorName: 'multiple-acceptable-root',
            validations: {
                required: true
            },
            options: {
                optionsTemplate: '{{$node.text}}',
                acceptableValue: {
                    text: '0',
                    children: [
                        {
                            text: '1-1'
                        },
                        {
                            text: '1-2'
                        }
                    ]
                }
            } as AcceptableRootValueEditorOptions<any>
        },
        {
            label: 'search-text',
            type: 'search-text',
            editorName: 'search-text',
            validations: {
                required: true
            }
        },
        {
            label: 'searchable',
            type: 'searchable',
            editorName: 'searchable',
            validations: {
                required: true
            },
            options: {
                searchModelFunction: /*@ngInject*/ ($timeout: ITimeoutService) => new Promise<string>((resolve) => $timeout(() => resolve('value'), 1000))
            } as SearchableValueEditorOptions<string>
        },
        {
            label: 'range',
            type: 'range',
            editorName: 'range',
            validations: {
                required: true
            }
        },
        {
            label: 'exemplar-bar-code',
            type: 'exemplar-bar-code',
            editorName: 'exemplar-bar-code',
            validations: {
                required: true
            }
        }
    ];

    public forceShowErrors() {
        this.showErrors = !this.showErrors;
    }
}

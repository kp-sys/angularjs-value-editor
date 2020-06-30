import {ObjectValueEditorField} from '../src/value-editor/meta-editors/object/object-value-editor-configuration.provider';
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
import {PasswordValueEditorLocalizations} from '../src/value-editor/editors/password/password-value-editor-localization.provider';
import {TextValueEditorLocalizations} from '../src/value-editor/editors/text/text-value-editor-localization.provider';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../src/value-editor/common-directives/disable-ngAnimate.directive';

export default class DemoController {

    public model = {};
    public showErrors: boolean;

    public fields: ObjectValueEditorField[] = [
        {
            label: 'text:text',
            fieldName: 'text-text',
            editor: {
                type: 'text',
                editorName: 'text-text',

                validations: {
                    required: true,
                    pattern: 'abc',
                    minlength: 5
                } as TextValueEditorValidations,
                localizations: {
                    patternDescription: 'pattern'
                } as TextValueEditorLocalizations
            }
        },
        {
            label: 'text:textarea',
            fieldName: 'textarea',
            editor: {
                type: 'text',
                editorName: 'textarea',

                options: {
                    type: 'textarea'
                } as TextValueEditorOptions,
                validations: {
                    required: true
                }
            }
        },
        {
            label: 'text:rich-textarea',
            fieldName: 'richtextarea',
            editor: {
                type: 'text',
                editorName: 'richtextarea',

                options: {
                    type: 'rich-textarea'
                } as TextValueEditorOptions,
                validations: {
                    required: true
                }
            }
        },
        {
            label: 'number',
            fieldName: 'number',
            editor: {
                type: 'number',
                editorName: 'number',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'boolean',
            fieldName: 'boolean',
            editor: {
                type: 'boolean',
                editorName: 'boolean',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'html',
            fieldName: 'html',
            editor: {
                type: 'html',
                editorName: 'html',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'date',
            fieldName: 'date',
            editor: {
                type: 'date',
                editorName: 'date',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'acceptable:select',
            fieldName: 'acceptable-select',
            editor: {
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
                    ],
                    __forceDisableNgAnimate: true
                } as AcceptableValueEditorOptions<string> & UndocumentedDisableNgAnimateValueEditorInternalOption
            }
        },
        {
            label: 'acceptable:checkboxes',
            fieldName: 'acceptableCheckboxes',
            editor: {
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
            }
        },
        {
            label: 'year',
            fieldName: 'year',
            editor: {
                type: 'year',
                editorName: 'year',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'card-number',
            fieldName: 'card-number',
            editor: {
                type: 'card-number',
                editorName: 'card-number',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'index-selection',
            fieldName: 'index-selection',
            editor: {
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
            }
        },
        {
            label: 'autocomplete',
            fieldName: 'autocomplete',
            editor: {
                type: 'autocomplete',
                editorName: 'autocomplete',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'password',
            fieldName: 'password',
            editor: {
                type: 'password',
                editorName: 'password',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'password:confirmation',
            fieldName: 'password:confirmation',
            editor: {
                type: 'password',
                editorName: 'password:confirmation',

                validations: {
                    required: true
                },
                options: {
                    withConfirmation: true
                } as PasswordValueEditorOptions,
                localizations: {
                    patternDescription: 'Patern description'
                } as PasswordValueEditorLocalizations
            }
        },
        {
            label: 'signature',
            fieldName: 'signature',
            editor: {
                type: 'signature',
                editorName: 'signature',

                validations: {
                    required: true
                },
                options: {
                    dataSource: () => Promise.resolve(['one', 'two', 'three']),
                    canDoAction: true
                } as SignatureValueEditorOptions
            }
        },
        {
            label: 'access-number',
            fieldName: 'access-number',
            editor: {
                type: 'access-number',
                editorName: 'access-number',

                validations: {
                    required: true
                },
                options: {
                    dataSource: () => Promise.resolve(['one', 'two', 'three']),
                    canDoAction: true
                } as AccessNumberValueEditorOptions
            }
        },
        {
            label: 'number-range',
            fieldName: 'number-range',
            editor: {
                type: 'number-range',
                editorName: 'number-range',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'acceptable-root',
            fieldName: 'acceptable-root',
            editor: {
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
            }
        },
        {
            label: 'multiple-acceptable-root',
            fieldName: 'multiple-acceptable-root',
            editor: {
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
            }
        },
        {
            label: 'search-text',
            fieldName: 'search-text',
            editor: {
                type: 'search-text',
                editorName: 'search-text',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'searchable',
            fieldName: 'searchable',
            editor: {
                type: 'searchable',
                editorName: 'searchable',

                validations: {
                    required: true
                },
                options: {
                    searchModelFunction: /*@ngInject*/ ($timeout: ITimeoutService) => new Promise<string>((resolve) => $timeout(() => resolve('value'), 1000))
                } as SearchableValueEditorOptions<string>
            }
        },
        {
            label: 'range',
            fieldName: 'range',
            editor: {
                type: 'range',
                editorName: 'range',

                validations: {
                    required: true
                }
            }
        },
        {
            label: 'exemplar-bar-code',
            fieldName: 'exemplar-bar-code',
            editor: {
                type: 'exemplar-bar-code',
                editorName: 'exemplar-bar-code',

                validations: {
                    required: true
                }
            }
        }
    ];

    public forceShowErrors() {
        this.showErrors = !this.showErrors;
    }
}

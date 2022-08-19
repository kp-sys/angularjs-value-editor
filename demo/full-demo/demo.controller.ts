import {ObjectValueEditorField} from '../../src/value-editor/meta-editors/object/object-value-editor-configuration.provider';
import {TextValueEditorOptions} from '../../src/value-editor/editors/text/text-value-editor-configuration.provider';
import {TextValueEditorValidations} from '../../src/value-editor/editors/text/text.value-editor.component';
import {AcceptableValueEditorOptions} from '../../src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';
import {PasswordValueEditorOptions} from '../../src/value-editor/editors/password/password-value-editor-configuration.provider';
import {AcceptableRootValueEditorOptions} from '../../src/value-editor/editors/acceptable-root/acceptable-root-value-editor-configuration.provider';
import {SearchableValueEditorOptions} from '../../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';
import {ITimeoutService} from 'angular';
import {PasswordValueEditorLocalizations} from '../../src/value-editor/editors/password/password-value-editor-localization.provider';
import {TextValueEditorLocalizations} from '../../src/value-editor/editors/text/text-value-editor-localization.provider';
import {UndocumentedDisableNgAnimateValueEditorInternalOption} from '../../src/value-editor/common/directives/disable-ngAnimate.directive';
import { DateValueEditorOptions } from 'src/value-editor/editors/date/date-value-editor-configuration.provider';

export default class DemoController {
    public static readonly controllerName = 'demoController';

    public model = {};
    public showErrors: boolean;

    public fields: ObjectValueEditorField[] = [
        {
            label: 'text:text',
            fieldName: 'text-text',
            hint: 'super truper hint',
            editor: {
                type: 'text',
                editorName: 'text-text',

                validations: {
                    required: true,
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
            label: 'text:prefixed-text',
            fieldName: 'prefixedText',
            editor: {
                type: 'text',
                editorName: 'prefixedText',

                options: {
                    prefix: 'Prefix',
                    postfix: 'Postfix',
                    includePrefixAndPostfixToModel: true
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
                options: {
                    // maximumGranularity: 'hour',
                    // viewFormat: 'd.L.y HH:mm',
                    // onlyDate: true,

                } as DateValueEditorOptions,
                validations: {
                    required: true
                }
            }
        },
        {
            label: 'acceptable:inline:single',
            fieldName: 'acceptable-inline-single',
            editor: {
                type: 'single-acceptable',
                editorName: 'acceptable-inline-single',
                validations: {
                    required: true
                },
                options: {
                    acceptableValues: [
                        'one',
                        'two',
                        'three'
                    ],
                    switchToInlineModeThreshold: 1,
                    __forceDisableNgAnimate: true
                } as AcceptableValueEditorOptions<string> & UndocumentedDisableNgAnimateValueEditorInternalOption
            }
        },
        {
            label: 'acceptable:block:single',
            fieldName: 'acceptable-block-single',
            editor: {
                type: 'single-acceptable',
                editorName: 'acceptable-block-single',
                validations: {
                    required: true
                },
                options: {
                    acceptableValues: [
                        'one',
                        'two',
                        'three'
                    ],
                    switchToInlineModeThreshold: 0,
                    allowSelectNull: false,
                    __forceDisableNgAnimate: true
                } as AcceptableValueEditorOptions<string> & UndocumentedDisableNgAnimateValueEditorInternalOption
            }
        },
        {
            label: 'acceptable:inline:multiple',
            fieldName: 'acceptable-inline-multiple',
            editor: {
                type: 'acceptable',
                editorName: 'acceptable-inline-multiple',

                validations: {
                    required: true
                },
                options: {
                    optionsTemplate: '{{$item}}',
                    acceptableValues: [
                        'one',
                        'two',
                        'three'
                    ],
                    multiselectable: true,
                    __forceDisableNgAnimate: true
                } as AcceptableValueEditorOptions<string> & UndocumentedDisableNgAnimateValueEditorInternalOption
            }
        },
        {
            label: 'acceptable:block:multiple',
            fieldName: 'acceptable-block-multiple',
            editor: {
                type: 'multiple-acceptable',
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
                    switchToInlineModeThreshold: 1,
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
            label: 'searchable',
            fieldName: 'searchable',
            editor: {
                type: 'searchable',
                editorName: 'searchable',

                validations: {
                    required: true
                },
                options: {
                    searchModelFunction: ($timeout: ITimeoutService) =>
                        new Promise<string>((resolve) => $timeout(() => resolve('value'), 1000))
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
        }
    ];

    public settings = {fields: this.fields};
    public forceShowErrors() {
        this.showErrors = !this.showErrors;
    }
}

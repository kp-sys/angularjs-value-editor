import {KpUniversalFormSettings} from '../../src/value-editor/kp-universal-form/kp-universal-form.component';
import {SearchableValueEditorOptions} from '../../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';
import { TextValueEditorValidations } from 'src/value-editor/editors/text/text.value-editor.component';
import { TextValueEditorOptions } from 'src/value-editor/editors/text/text-value-editor-configuration.provider';
import { ObjectValueEditorOptions } from 'src/value-editor/meta-editors/object/object-value-editor-configuration.provider';
import { UndocumentedDisableNgAnimateValueEditorInternalOption } from 'src/value-editor/common/directives/disable-ngAnimate.directive';
import { AcceptableValueEditorOptions } from 'src/value-editor/editors/acceptable/acceptable-value-editor-configuration.provider';
import { AcceptableRootValueEditorOptions } from 'src/value-editor/editors/acceptable-root/acceptable-root-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = {
        textFieldName: 'ahoj',
        someList: null,
        'acceptable-single': 'two',
        'acceptable-multiple': ['four', 'six']
    };

    public change() {
        console.log('change now');
        console.log(this.model);
    }

    public test() {
        this.model['textFieldName'] = 'some new text';
    }

    private validations: TextValueEditorValidations = {
        minlength: 3,
        required: true,
        // async: {sendWholeForm: true},
        notBlank: true
    }

    private options: TextValueEditorOptions = {
        trim: true,
        emptyAsNull: true,
    }

    // private objectOptions: ObjectValueEditorOptions = {
    //     fields: [
    //         {
    //             fieldName: 'textFieldName1',
    //             label: 'text label 1',
    //             editor: {
    //                 editorName: 'textEditorName1',
    //                 type: 'text',
    //                 validations: {...this.validations}
    //             }
    //         },
    //         {
    //             fieldName: 'textFieldName2',
    //             label: 'text label 2',
    //             editor: {
    //                 editorName: 'textEditorName2',
    //                 type: 'text',
    //                 validations: {...this.validations},
    //                 isVisible: true
    //             }
    //         },
    //     ]

    // }

    public formSettings = {
        fields: [
            {
                fieldName: 'searchable',
                label: 'searchable',
                editor: {
                    type: 'searchable',
                    options: {
                        allowToDeleteValue: true
                    } as SearchableValueEditorOptions<any>,

                }
            },
            {
                fieldName: 'textFieldName1',
                label: 'text label trimmed',
                editor: {
                    type: 'text',
                    options: {
                        trim: true,
                        emptyAsNull: true,},
                    validations: {...this.validations}
                }
            },
            {
                fieldName: 'textFieldName2',
                label: 'text label not triimed',
                editor: {
                    type: 'text',
                    options: {
                        trim: false,
                        emptyAsNull: true,
                    },
                    validations: {...this.validations}
                }
            },
            {
                label: 'text:prefixed-text',
                fieldName: 'prefixedTextFieldName',
                editor: {
                    type: 'text',
    
                    options: {
                        prefix: 'Prefix',
                        suffix: 'Postfix',
                        includePrefixAndSuffixToModel: true,
                        trim: false,
                        emptyAsNull: true,
                    } as TextValueEditorOptions,
                    validations: {
                        // required: true,
                        minlength: 15
                    }
                }
            },{
                label: 'text:prefixed-text trimmed',
                fieldName: 'prefixedTextFieldNameTrimmed',
                editor: {
                    type: 'text',
    
                    options: {
                        prefix: 'Prefix',
                        suffix: 'Postfix',
                        includePrefixAndSuffixToModel: true,
                        trim: true,
                        emptyAsNull: true,
                    } as TextValueEditorOptions,
                    validations: {
                        // required: true,
                        minlength: 15
                    }
                }
            },
            {
                fieldName: 'someList',
                label: 'LIST i',
                editor: {
                    editorName: 'someList',
                    type: 'list',
                    validations: {required: true, maxCount: 3},
                    options: {
                        onAddItem: () => {
                            return new Promise((resolve) => setTimeout(() => resolve(''), 30_000))
                        },
                        subEditor: {
                            validations: {
                                required: true,
                                minlength: 3,
                                maxlength: 8
                            }
                        }
                    }
                }
            },
            {
                label: 'acceptable:single',
                fieldName: 'acceptable-single',
                editor: {
                    type: 'single-acceptable',
                    validations: {
                        required: true
                    },
                    options: {
                        switchToInlineModeThreshold: 3,
                        disabledItemsResolver: /*@ngInject*/($item) => $item === 'two',
                        reorderable: true,
                        acceptableValues: [
                            'one',
                            'two',
                            'three',
                            'four',
                            'five',
                            'six',
                            'seven',
                            'eight',
                            'nine',
                            'ten',
                            'eleven',
                            'tvelfe',
                            'thirteen',
                            'fourteen',
                            'fifteen'
                        ],
                        __forceDisableNgAnimate: true
                    } as AcceptableValueEditorOptions<string> & UndocumentedDisableNgAnimateValueEditorInternalOption
                }
            },
            {
                label: 'acceptable:multiple',
                fieldName: 'acceptable-multiple',
                editor: {
                    type: 'multiple-acceptable',
                    validations: {
                        required: true
                    },
                    options: {
                        switchToInlineModeThreshold: 3,
                        disabledItemsResolver: /*@ngInject*/($item) => $item === 'four',
                        reorderable: true,
                        acceptableValues: [
                            'one',
                            'two',
                            'three',
                            'four',
                            'five',
                            'six',
                            'seven',
                            'eight',
                            'nine',
                            'ten',
                            'eleven',
                            'tvelfe',
                            'thirteen',
                            'fourteen',
                            'fifteen'
                        ],
                        // allowSelectNull: true,
                        __forceDisableNgAnimate: true
                    } as AcceptableValueEditorOptions<string> & UndocumentedDisableNgAnimateValueEditorInternalOption
                }
            },
            {
                label: 'acceptable-root',
                fieldName: 'acceptable-root',
                editor: {
                    type: 'multiple-acceptable-root',
                    isDisabled: true,
                    validations: {
                        required: true
                    },
                    options: {
                        optionsTemplate: '{{$node.text}}',
                        disabledItems: [
                            {
                                text: '1-1-2'
                            },
                            {
                                text: '1-2',
                                children: [
                                    {
                                        text: '1-2-1'
                                    },
                                    {
                                        text: '1-2-2'
                                    }
                                ]
                            }
                        ],
                        acceptableValue: {
                            text: '0',
                            children: [
                                {
                                    text: '1-1',
                                    children: [
                                        {
                                            text: '1-1-1'
                                        },
                                        {
                                            text: '1-1-2'
                                        }
                                    ]
                                },
                                {
                                    text: '1-2',
                                    children: [
                                        {
                                            text: '1-2-1'
                                        },
                                        {
                                            text: '1-2-2'
                                        }
                                    ]
                                }
                            ]
                        },
                        // disabledItems: [{
                        //     text: '1-1',
                        //     children: [
                        //         {
                        //             text: '1-1-1'
                        //         },
                        //         {
                        //             text: '1-1-2'
                        //         }
                        //     ]
                        // }]
                    } as AcceptableRootValueEditorOptions<any>
                }
            },
            // {
            //     fieldName: 'objectEditorWtf',
            //     label: 'object label',
            //     editor: {
            //         editorName: 'objectValueEditorWtf21',
            //         type: 'object',
            //         options: {...this.objectOptions},
            //         isVisible: true
            //     }
            // },
        ]
    } as KpUniversalFormSettings;
};

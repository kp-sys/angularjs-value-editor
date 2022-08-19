import {KpUniversalFormSettings} from '../../src/value-editor/kp-universal-form/kp-universal-form.component';
import {SearchableValueEditorOptions} from '../../src/value-editor/editors/searchable/searchable-value-editor-configuration.provider';
import { TextValueEditorValidations } from 'src/value-editor/editors/text/text.value-editor.component';
import { TextValueEditorOptions } from 'src/value-editor/editors/text/text-value-editor-configuration.provider';
import { ObjectValueEditorOptions } from 'src/value-editor/meta-editors/object/object-value-editor-configuration.provider';

export default class LabController {
    public static readonly controllerName = 'labController';

    public model = {
        textFieldName: 'ahoj',
        someList: null
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
            }
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

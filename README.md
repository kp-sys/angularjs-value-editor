![Build Master](https://github.com/kp-sys/angularjs-value-editor/workflows/Build%20Master/badge.svg?branch=master)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/kp-sys/angularjs-value-editor?label=version)        
![David](https://img.shields.io/david/peer/kp-sys/angularjs-value-editor)
![David](https://img.shields.io/david/dev/kp-sys/angularjs-value-editor)
![GitHub](https://img.shields.io/github/license/kp-sys/angularjs-value-editor)


# angularjs-value-editor
Dynamically created form / inputs from JS definition / JSON.
- Zero configuration.
- Supporting aliases (pre-configured inputs).
- Extensible of Your own editors (inputs)

![form](https://user-images.githubusercontent.com/5617576/114096458-054c6400-98bf-11eb-8004-237bc8010a8d.png)

```html 
<kp-universal-form ng-model="model" form-settings="$ctrl.formSettings"></kp-universal-form>
```
```typescript
class Controller {
  public formSettings: KpUniversalFormSettings = {
    header: 'Login',
    fields: [
      {
        label: 'Username',
        fieldName: 'username',
        editor: {
          type: 'text',
          validations: {
              required: true
          }
        }
      },
      {
        label: 'Password',
        fieldName: 'password',
        editor: {
          type: 'password',
          options: {
            withConfirmation: true
          },
          validations: {
            required: true
          },
          localizations: {
              confirmPassword: 'Confirm password'
          }
        }
      }
    ]
  }  
}
```

## [API Documentation](https://kp-sys.github.io/angularjs-value-editor/#/api/angularjs-value-editor)
 - With live examples
 - With huge Demo
 - With guide for creating own editor

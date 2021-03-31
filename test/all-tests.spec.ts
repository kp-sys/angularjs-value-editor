/**
 * This file is workaround for this bug: https://github.com/webpack/webpack/issues/2134
 */

import '@babel/runtime/regenerator/index';
import '@kpsys/angular-ui-bootstrap';

const context = require.context('./../src/value-editor', true, /\.spec\.ts$/);
context.keys().forEach(context);

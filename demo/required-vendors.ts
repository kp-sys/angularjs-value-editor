import '@babel/runtime/regenerator/index';
import 'ace-builds';
import 'trumbowyg/dist/trumbowyg.min';
import 'trumbowyg/dist/ui/trumbowyg.css';
import 'trumbowyg/dist/plugins/table/trumbowyg.table.min';
import 'trumbowyg/dist/plugins/colors/trumbowyg.colors.min';
import 'trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.min.css';
import 'trumbowyg/dist/plugins/table/ui/trumbowyg.table.min.css';
import {DateTime, Settings} from 'luxon';
import '@kpsys/angularjs-bootstrap-datetimepicker/dist/angularjs-bootstrap-datetimepicker.min.css';
import 'ui-select/dist/select.css';
import '@kpsys/angularjs-histogram-slider/dist/slider.min.css';

// tslint:disable-next-line:no-var-requires
$.trumbowyg.svgPath = require('trumbowyg/dist/ui/icons.svg');
Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;

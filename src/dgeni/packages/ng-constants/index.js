var Package = require('dgeni').Package;
var path = require('path');

/**
 * @dgPackage ngdoc-ext
 * @description Extensions for the dgeni-packages/ngdoc
 */
module.exports = new Package('ngdoc-constants', [require('dgeni-packages/ngdoc')])

// add more templates location
	.config(function (templateFinder) {
		templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
	})

	// add filters
	.config(function(computePathsProcessor, computeIdsProcessor, createDocMessage, getAliases) {
		computeIdsProcessor.idTemplates.push({
            docTypes: ['constant'],
            idTemplate: 'module:${module}.${docType}:${name}',
            getAliases: getAliases
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['constant'],
            pathTemplate: '${area}/${module}/${docType}/${name}',
            outputPathTemplate: 'partials/${area}/${module}/${docType}/${name}.html'
        });
	})
;
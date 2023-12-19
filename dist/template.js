(function () {
	const Handlebars = require('handlebars');
	var template = Handlebars.template,
		templates = (Handlebars.templates = Handlebars.templates || {});
	templates['index'] = template({
		compiler: [8, '>= 4.3.0'],
		main: function (container, depth0, helpers, partials, data) {
			return '<style>\r\n    .container {\r\n        width: 100%;\r\n        background-color: red;\r\n        display: flex;\r\n        justify-content: center;\r\n    }\r\n</style>\r\n\r\n<main>\r\n    <div class="container">\r\n        <h1>Você está na main!</h1>\r\n    </div>\r\n</main>\r\n';
		},
		useData: true,
	});
	templates['layouts/main'] = template({
		compiler: [8, '>= 4.3.0'],
		main: function (container, depth0, helpers, partials, data) {
			var stack1,
				helper,
				lookupProperty =
					container.lookupProperty ||
					function (parent, propertyName) {
						if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
							return parent[propertyName];
						}
						return undefined;
					};

			return (
				'<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n    <meta charset="UTF-8">\r\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n    <title>Teste de build HBS</title>\r\n    <link rel="stylesheet" href="/css/main.css">\r\n</head>\r\n<body>\r\n    \r\n    ' +
				((stack1 =
					((helper =
						(helper =
							lookupProperty(helpers, 'body') ||
							(depth0 != null ? lookupProperty(depth0, 'body') : depth0)) != null
							? helper
							: container.hooks.helperMissing),
					typeof helper === 'function'
						? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
								name: 'body',
								hash: {},
								data: data,
								loc: { start: { line: 12, column: 4 }, end: { line: 12, column: 16 } },
						  })
						: helper)) != null
					? stack1
					: '') +
				'\r\n\r\n</body>\r\n</html>'
			);
		},
		useData: true,
	});
})();

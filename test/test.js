const utils = require ("daveutils");
const folderToJson = require ("foldertojson");

folderToJson.getJson ("node_modules", function (err, jsontext) {
	if (err) {
		console.log (err.message);
		}
	else {
		console.log (jsontext);
		}
	});

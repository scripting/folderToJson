var myVersion = "0.4.0", myProductName = "foldertojson";

const fs = require ("fs");
const utils = require ("daveutils");
const filesystem = require ("davefilesystem");

const folderpath = "node_modules/";

function folderVisiter (folderpath, fileCallback, inlevelCallback, outlevelCallback, includeFileCallback, completionCallback) {
	function doFolder (folderpath, callback) {
		if (!utils.endsWith (folderpath, "/")) {
			folderpath += "/";
			}
		fs.readdir (folderpath, function (err, list) {
			if (err) {
				callback (err);
				}
			else {
				function doListItem (ix) {
					if (ix < list.length) {
						var fname = list [ix];
						if (includeFileCallback (fname)) {
							var f = folderpath + fname;
							fs.stat (f, function (err, stats) {
								if (err) {
									doListItem (ix + 1);
									}
								else {
									if (stats.isDirectory ()) { //dive into the directory
										inlevelCallback (fname);
										doFolder (f, function (err) {
											if (err) {
												callback (err);
												}
											else {
												outlevelCallback ();
												doListItem (ix + 1);
												}
											});
										}
									else {
										if (fileCallback !== undefined) {
											fileCallback (f);
											doListItem (ix + 1);
											}
										}
									}
								});
							}
						else {
							doListItem (ix + 1);
							}
						}
					else {
						callback (undefined);
						}
					}
				doListItem (0);
				}
			});
		}
	doFolder (folderpath, function (err) {
		completionCallback (err);
		});
	}

var jstruct = new Object (), stack = new Array ();
function completionCallback (err) {
	if (err) {
		console.log (err.message);
		}
	else {
		console.log (utils.jsonStringify (jstruct));
		}
	}
function inlevelCallback (foldername) {
	jstruct [foldername] = new Object ();
	stack.push (jstruct);
	jstruct = jstruct [foldername];
	}
function outlevelCallback () {
	jstruct = stack.pop ();
	}
function fileCallback (f) {
	var fname = utils.stringLastField (f, "/");
	jstruct [fname] = new Object ();
	}
function includeFileCallback (fname) {
	if (utils.beginsWith (fname, ".")) {
		return (false);
		}
	return (true);
	}

folderVisiter (folderpath, fileCallback, inlevelCallback, outlevelCallback, includeFileCallback, completionCallback);

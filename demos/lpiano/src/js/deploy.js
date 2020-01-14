// TODO: Discuss reconciling this with the docpad and fluid-sandbox approaches and generalising for reuse.
/* eslint-env node */
"use strict";
var fluid = require("infusion");
fluid.setLogging(true);

require("../../index.js");

var lpiano = fluid.registerNamespace("lpiano");

var path = require("path");

var copy = require("recursive-copy");
var fs = require("fs");
var rimraf = require("rimraf");
var mkdirp = require("mkdirp");

fluid.registerNamespace("lpiano.generator");

lpiano.generator.makeBundle = function (that) {
    var resolvedBasePath = fluid.module.resolvePath(that.options.baseDir);
    var promises = [];

    if (fs.existsSync(that.options.targetDir)) {
        promises.push(function () {
            var existingDirCleanPromise = fluid.promise();
            rimraf(that.options.targetDir, function (error) {
                if (error) {
                    existingDirCleanPromise.reject(error);
                }
                else {
                    existingDirCleanPromise.resolve();
                }
            });

            return existingDirCleanPromise;
        });
    }

    promises.push(function () {
        var dirCreationPromise = fluid.promise();
        mkdirp(that.options.targetDir, function (error) {
            if (error) {
                dirCreationPromise.reject(error);
            }
            else {
                dirCreationPromise.resolve();
            }
        });
        return dirCreationPromise;
    });

    fluid.each(fluid.makeArray(that.options.bundle), function (singleItemPath) {
        var itemSrcPath = path.resolve(resolvedBasePath, singleItemPath);
        var itemDestPath = path.resolve(that.options.targetDir, singleItemPath);

        // Return a promise-returning function so that only one call will be in flight at a time.
        promises.push(function () {
            return copy(itemSrcPath, itemDestPath);
        });
    });

    var sequence = fluid.promise.sequence(promises);

    sequence.then(
        function () { fluid.log("Finished, output saved to '", that.options.targetDir, "'..."); },
        fluid.fail
    );

    return sequence;
};

fluid.defaults("lpiano.generator", {
    gradeNames: ["fluid.component"],
    baseDir: "%lpiano",
    targetDir: "/Users/duhrer/Source/projects/duhrer.github.io/demos/lpiano",
    bundle: [
        "./index.html",
        "./src",
        "./tests",
        "./node_modules/ace-builds/src-noconflict/ace.js",
        "./node_modules/d3/d3.js",
        "./node_modules/flocking/dist/flocking-all.js",
        "./node_modules/flocking/src/ui/midi/message-view/js/message-view.js",
        "./node_modules/flocking/src/ui/midi/midi-connector/js/midi-connector.js",
        "./node_modules/flocking/src/ui/midi/midi-port-selector/js/midi-port-selector.js",
        "./node_modules/flocking/src/ui/selectbox/js/selectbox.js",
        "./node_modules/foundation-sites/dist/foundation.css",
        "./node_modules/foundation-sites/dist/foundation.js",
        "./node_modules/handlebars/dist/handlebars.js",
        "./node_modules/infusion/dist/infusion-all.js",
        "./node_modules/vexflow/releases/vexflow-debug.js"
    ],
    listeners: {
        "onCreate.createBundle": {
            funcName: "lpiano.generator.makeBundle",
            args:     ["{that}"]
        }
    }
});

lpiano.generator();

// TODO: Discuss reconciling this with the docpad and fluid-sandbox approaches and generalising for reuse.
/* eslint-env node */
"use strict";
var fluid = require("infusion");

var osk = fluid.registerNamespace("osk");

var copy = require("recursive-copy");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require("path");
var rimraf = require("rimraf");

require("../../");

fluid.registerNamespace("osk.generator");

osk.generator.makeBundle = function (that) {
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
        var mkdirpPromise = mkdirp(that.options.targetDir);
        mkdirpPromise.then(dirCreationPromise.resolve, dirCreationPromise.reject);
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

fluid.defaults("osk.generator", {
    gradeNames: ["fluid.component"],
    baseDir: "%fluid-osk",
    targetDir: "/Users/duhrer/Source/projects/duhrer.github.io/demos/fluid-osk",
    bundle: [
        "./examples",
        "./src/css",
        "./src/js",
        "./node_modules/infusion/dist/infusion-all.js"
    ],
    listeners: {
        "onCreate.createBundle": {
            funcName: "osk.generator.makeBundle",
            args:     ["{that}"]
        }
    }
});

osk.generator();

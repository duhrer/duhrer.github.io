// TODO: Discuss reconciling this with the docpad and fluid-sandbox approaches and generalising for reuse.
/* eslint-env node */
"use strict";
var fluid = require("infusion");
fluid.setLogging(true);

require("../../index.js");

var flock = fluid.registerNamespace("flock");

var path = require("path");

var copy = require("recursive-copy");
var fs = require("fs");
var rimraf = require("rimraf");
var mkdirp = require("mkdirp");

fluid.registerNamespace("flock.mmt.generator");

flock.mmt.generator.makeBundle = function (that) {
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

fluid.defaults("flock.mmt.generator", {
    gradeNames: ["fluid.component"],
    baseDir: "%flocking-midi-microtoner",
    targetDir: "/Users/duhrer/Source/projects/duhrer.github.io/demos/flocking-midi-microtoner",
    bundle: [
        "./index.html",
        "./src",
        "./dist",
        "./node_modules/flocking-midi-select-ng/src/js/auto-midi-connector.js",
        "./node_modules/flocking-midi-select-ng/src/js/auto-midi-port-selector.js",
        "./node_modules/flocking-midi-select-ng/src/js/auto-midi-system.js",
        "./node_modules/flocking-midi-select-ng/src/js/select-box.js",
        "./node_modules/flocking/dist/flocking-all.js",
        "./node_modules/flocking/src/ui/midi/midi-connector/js/midi-connector.js",
        "./node_modules/flocking/src/ui/midi/midi-port-selector/js/midi-port-selector.js",
        "./node_modules/flocking/src/ui/selectbox/js/selectbox.js",
        "./node_modules/infusion/dist/infusion-all.js"
    ],
    listeners: {
        "onCreate.createBundle": {
            funcName: "flock.mmt.generator.makeBundle",
            args:     ["{that}"]
        }
    }
});

flock.mmt.generator();

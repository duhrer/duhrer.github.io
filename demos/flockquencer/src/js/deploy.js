// TODO: Discuss reconciling this with the docpad and fluid-sandbox approaches and generalising for reuse.
/* eslint-env node */
"use strict";
var fluid = require("infusion");
fluid.setLogging(true);

require("../../index.js");

var flockquencer = fluid.registerNamespace("flockquencer");

var path = require("path");

var copy = require("recursive-copy");

fluid.registerNamespace("flockquencer.generator");

flockquencer.generator.makeBundle = function (that) {
    var resolvedBasePath = fluid.module.resolvePath(that.options.baseDir);
    var promises = [];
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

fluid.defaults("flockquencer.generator", {
    gradeNames: ["fluid.component"],
    baseDir: "%flockquencer",
    targetDir: "/Users/duhrer/Source/projects/duhrer.github.io/demos/flockquencer",
    bundle: [
        "./index.html",
        "./src",
        "./node_modules/bergson/dist/bergson-only.js",
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
            funcName: "flockquencer.generator.makeBundle",
            args:     ["{that}"]
        }
    }
});

flockquencer.generator();

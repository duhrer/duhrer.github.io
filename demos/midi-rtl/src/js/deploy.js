// TODO: Discuss reconciling this with the docpad and fluid-sandbox approaches and generalising for reuse.
/* eslint-env node */
"use strict";
var fluid = require("infusion");
fluid.setLogging(true);

require("../../index.js");

var midiRtl = fluid.registerNamespace("midiRtl");

var path = require("path");

var copy = require("recursive-copy");

fluid.registerNamespace("midiRtl.generator");

midiRtl.generator.makeBundle = function (that) {
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

fluid.defaults("midiRtl.generator", {
    gradeNames: ["fluid.component"],
    baseDir: "%midi-rtl",
    targetDir: "/Users/duhrer/Source/projects/duhrer.github.io/demos/midi-rtl",
    bundle: [
        "./index.html",
        "./src",
        "./node_modules/foundation-sites/dist/css/foundation.css",
        "./node_modules/flocking/dist/flocking-all.js",
        "./node_modules/flocking/src/ui/midi/midi-connector/js/midi-connector.js",
        "./node_modules/flocking/src/ui/midi/midi-port-selector/js/midi-port-selector.js",
        "./node_modules/flocking/src/ui/selectbox/js/selectbox.js",
        "./node_modules/infusion/dist/infusion-all.js"
    ],
    listeners: {
        "onCreate.createBundle": {
            funcName: "midiRtl.generator.makeBundle",
            args:     ["{that}"]
        }
    }
});

midiRtl.generator();

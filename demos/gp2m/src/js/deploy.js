// TODO: Discuss reconciling this with the docpad and fluid-sandbox approaches and generalising for reuse.
/* eslint-env node */
"use strict";
var fluid = require("infusion");
fluid.setLogging(true);

var gp2m = fluid.registerNamespace("gp2m");

var path = require("path");

var copy = require("recursive-copy");

require("../../index.js");

fluid.registerNamespace("gp2m.generator");

gp2m.generator.makeBundle = function (that) {
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

fluid.defaults("gp2m.generator", {
    gradeNames: ["fluid.component"],
    baseDir: "%gp2m",
    targetDir: "/Users/duhrer/Source/projects/duhrer.github.io/demos/gp2m",
    bundle: [
        "./analog-stick-theremin.html",
        "./halloween.html",
        "./index.html",
        "./paddle-theremin.html",
        "./xbox-one.html",
        "./gamepad-midi-clock.html",
        "./ps4chestra.html",
        "./src",
        "./dist",
        "./node_modules/bergson/dist/bergson-only.js",
        "./node_modules/flocking/dist/flocking-all.js",
        "./node_modules/flocking/src/ui/midi/midi-connector/js/midi-connector.js",
        "./node_modules/flocking/src/ui/midi/midi-port-selector/js/midi-port-selector.js",
        "./node_modules/flocking/src/ui/selectbox/js/selectbox.js"
    ],
    listeners: {
        "onCreate.createBundle": {
            funcName: "gp2m.generator.makeBundle",
            args:     ["{that}"]
        }
    }
});

gp2m.generator();

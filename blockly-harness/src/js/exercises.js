(function (fluid) {
    /* eslint-env browser */
    "use strict";
    var fluid = require("infusion");
    var blockly = fluid.registerNamespace("blockly");

    fluid.registerNamespace("blockly.harness");

    blockly.harness.exercises = [
        {
            "title": "Sample Exercise",
            "description": "A sample exercise to sanity-check the harness.",
            "harnessOptions": {
                "maxBlocks": 5
            }
        }
    ];
})(fluid);


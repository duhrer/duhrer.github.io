/* globals Blockly, BlocklyStorage */
(function (fluid, Blockly, BlocklyStorage) {
    "use strict";
    var blockly = fluid.registerNamespace("blockly");
    fluid.registerNamespace("blockly.harness");

    blockly.harness.initialiseBlockly = function (that) {
        var expandedBlocklyOptions = fluid.filterKeys(that.options.blocklyOptions, ["toolbox", "startBlocks"], true);

        if (that.options.blocklyOptions.toolbox) {
            expandedBlocklyOptions.toolbox= blockly.harness.jsonToXml(that.options.blocklyOptions.toolbox);
        }

        that.workspace = Blockly.inject(that.options.blocklyContainer, expandedBlocklyOptions);
        if (that.options.blocklyOptions.startBlocks) {
            var startBlocksAsXml = blockly.harness.jsonToXml(that.options.blocklyOptions.startBlocks);
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(startBlocksAsXml), that.workspace);
        }

        // Save progress to browser's LocalStorage.
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
        BlocklyStorage.backupOnUnload();

        // Check our progress against the exercise goals when things change.
        that.workspace.addChangeListener(that.checkProgress);

        // TODO: Convert this to use a viewComponent?
        var runButton = document.getElementById("run-code");
        runButton.onclick = that.runCode;
    };

    blockly.harness.runCode = function (that, event) {
        // Infinite loop trapping taken from Blockly demos.
        window.LoopTrap = 1000;
        Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
        var code = Blockly.JavaScript.workspaceToCode(that.workspace);
        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        if (that.options.returnValues) {
            code += "var returnValue = {";
            var variableDefs = fluid.transform(that.options.returnValues, function (fieldName) {
                code += fieldName + ":" + fieldName
            });
            code += variableDefs;
            code += "};\nreturnValue;\n";
        }

        try {
            var returnValue = eval(code)
        } catch (e) {
            alert(e);
        }
    };

    blockly.harness.checkProgress = function (that, event) {
        if (that.options.displayXmlOnChange) {
            console.log(Blockly.Xml.workspaceToDom(that.workspace));
        }
        /*

            Filter by change type?

            Execute the current code as Javascript and inspect the results.

            https://developers.google.com/blockly/guides/configure/web/code-generators

            TODO: How to trap console, etc. and display onscreen?  where does "print" output go?

            TODO: How to represent success conditions and check that.

            TODO: Move on to parent page or exercise on completion.
         */
    };

    fluid.defaults("blockly.harness", {
        gradeNames: ["fluid.component"],
        blocklyContainer: "blocklyDiv",
        blocklyOptions: {
            media: "./node_modules/blockly/media/",
            toolbox: blockly.harness.toolboxDefaults
        },
        displayXmlOnChange: false,
        members: {
            workspace: {}
        },
        listeners: {
            "onCreate.initialiseBlockly": {
                funcName: "blockly.harness.initialiseBlockly",
                args:     ["{that}"]
            }
        },
        invokers: {
            checkProgress: {
                funcName: "blockly.harness.checkProgress",
                args:     ["{that}", "{arguments}.0"] // event
            },
            runCode: {
                funcName: "blockly.harness.runCode",
                args: ["{that}", "{arguments}.0"]
            }
        }
    })
})(fluid, Blockly, BlocklyStorage);

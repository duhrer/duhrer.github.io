(function (fluid) {
    "use strict";
    if (typeof require !== "undefined") {
        fluid = require("infusion")
    }

    var blockly = fluid.registerNamespace("blockly");
    fluid.registerNamespace("blockly.harness");

    blockly.harness.collectionKeywords = {
        blocks:     "block",
        categories: "category",
        fields:     "field",
        mutations:  "mutation",
        statements: "statement",
        values:     "value"
    };

    blockly.harness.reservedKeys = ["categories", "blocks", "values", "mutations", "fields", "statements", ""];

    blockly.harness.jsonToXml = function (json) {
        return blockly.harness.expandOneEntry(json, "xml");
    };

    blockly.harness.expandArray = function (array, elementName) {
        var arrayXmlString = "";
        fluid.each(array, function (entry){
            arrayXmlString += blockly.harness.expandOneEntry(entry, elementName);
        });
        return arrayXmlString;
    };

    blockly.harness.expandOneEntry = function (levelDef, elementName) {
        var levelXmlString = "<" + elementName;
        var attributes = fluid.filterKeys(levelDef, blockly.harness.reservedKeys, true);
        fluid.each(attributes, function (value, key) {
            levelXmlString += " " + key + "=\"" + value + "\"";
        });
        levelXmlString+=">";
        if (levelDef[""] !== undefined) {
            levelXmlString += levelDef[""];
        }
        else {
            var nestedElements = fluid.filterKeys(levelDef, blockly.harness.reservedKeys);
            fluid.each(nestedElements, function (value, key) {
                var elementName = blockly.harness.collectionKeywords[key];
                levelXmlString += blockly.harness.expandArray(value, elementName);
            });
        }
        levelXmlString += "</" + elementName + ">\n";
        return levelXmlString;
    };
})(fluid);

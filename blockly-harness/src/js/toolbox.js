(function (fluid) {
    "use strict";
    if (typeof require !== "undefined") {
        fluid = require("infusion")
    }

    var blockly = fluid.registerNamespace("blockly");
    fluid.registerNamespace("blockly.harness");
    blockly.harness.toolboxDefaults = {
        "categories": [
            {
                "name":"Logic",
                "blocks": [
                    { "type": "controls_if" },
                    {
                        "type": "controls_if",
                        "mutations": [{ "else": 1}]
                    },
                    {
                        "type": "controls_if",
                        "mutations": [{ "else": 1, "elseif": 1 }]
                    },
                    { "type": "logic_compare" },
                    { "type": "logic_operation" },
                    { "type": "logic_negate" },
                    { "type": "logic_boolean" },
                    { "type": "logic_null" },
                    { "type": "logic_ternary" }
                ]
            },
            {
                "name": "Loops",
                "blocks": [
                    {
                        "type": "controls_repeat_ext",
                        "values": [{
                            "name": "TIMES",
                            "blocks": [{
                                "type": "math_number",
                                "fields": [
                                    {
                                        "name": "NUM",
                                        "": 10
                                    }
                                ]
                            }]
                        }]
                    },
                    { "type": "controls_whileUntil" },
                    {
                        "type": "controls_for",
                        "fields": [{
                            "name": "VAR",
                            "": "i"
                        }],
                        "values": [
                            {
                                "name": "FROM",
                                "blocks": [{
                                    "type": "math_number",
                                    "fields": [{ "name": "NUM", "": 1 }]
                                }]
                            },
                            {
                                "name": "TO",
                                "blocks": [{
                                    "type": "math_number",
                                    "fields": [{ "name": "NUM", "": 10 }]
                                }]
                            },
                            {
                                "name": "BY",
                                "blocks": [{
                                    "type": "math_number",
                                    "fields": [{ "name": "NUM", "": 1 }]
                                }]
                            }
                        ]
                    },
                    { "type": "controls_forEach" },
                    { "type": "controls_flow_statements" }
                ]
            },
            {
                "name": "Math",
                "blocks": [
                    { "type": "math_number" },
                    { "type": "math_arithmetic" },
                    { "type": "math_single" },
                    { "type": "math_trig" },
                    { "type": "math_constant" },
                    { "type": "math_number_property" },
                    { "type": "math_round" },
                    { "type": "math_on_list" },
                    { "type": "math_modulo" },
                    {
                        "type" : "math_constrain",
                        "values": [
                            {
                                "name": "LOW",
                                "blocks": [{
                                    "type": "math_number",
                                    "fields": [{ "name": "NUM", "": 1 }]
                                }]
                            },
                            {
                                "name": "HIGH",
                                "blocks": [{
                                    "type": "math_number",
                                    "fields": [{ "name": "NUM", "": 100 }]
                                }]
                            }
                        ]
                    },
                    {
                        "type": "math_random_int",
                        "values": [
                            {
                                "name": "FROM",
                                "blocks": [{
                                    "type": "math_number",
                                    "fields":[{ "name": "NUM", "": 1 }]
                                }]
                            },
                            {
                                "name": "TO",
                                "blocks": [{
                                    "type": "math_number",
                                    "fields":[{ "name": "NUM", "": 100 }]
                                }]
                            }
                        ]
                    },
                    { "type": "math_random_float" }
                ]
            },
            {
                "name": "Lists",
                "blocks": [
                    { "type": "lists_create_empty" },
                    { "type": "lists_create_with" },
                    {
                        "type": "lists_repeat",
                        "values": [{
                            "name": "NUM",
                            "blocks": [{
                                "type": "math_number",
                                "fields": [{ "name": "NUM", "": 5 }]
                            }]
                        }]
                    },
                    { "type": "lists_length" },
                    { "type": "lists_isEmpty" },
                    { "type": "lists_indexOf" },
                    { "type": "lists_getIndex" },
                    { "type": "lists_setIndex" }
                ]
            },
            { "name": "Variables",  "custom": "VARIABLE" },
            { "name": "Functions", "custom": "PROCEDURE" }
        ]
    };

    blockly.harness.collectionKeywords = {
        categories: "category",
        blocks:     "block",
        values:     "value",
        mutations:  "mutation",
        fields:     "field"
    };

    blockly.harness.reservedKeys = ["categories", "blocks", "values", "mutations", "fields", ""];

    /**
     *
     * @param {Object} toolboxDef - The toolbox definition.
     * @return {String} - The toolbox definition, represented as XML.
     *
     */
    blockly.harness.expandToolboxDefinition = function (toolboxDef) {
        var xmlString = "<xml id=\"toolbox\" style=\"display: none\">";
        xmlString += blockly.harness.expandArray(toolboxDef.categories, "category");
        xmlString += "</xml>\n";
        return xmlString;
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

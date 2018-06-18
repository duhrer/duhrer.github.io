(function (fluid) {
    "use strict";
    if (typeof require !== "undefined") {
        fluid = require("infusion")
    }

    var blockly = fluid.registerNamespace("blockly");
    fluid.registerNamespace("blockly.harness");
    blockly.harness.toolboxDefaults = {
        "id": "toolbox",
        "style": "display: none",
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
                    { "type": "controls_repeat"},
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
                    { "type": "math_arithmetic" },
                    { "type": "math_change"},
                    { "type": "math_constant" },
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
                    { "type": "math_modulo" },
                    { "type": "math_number" },
                    { "type": "math_number_property" },
                    { "type": "math_on_list" },
                    { "type": "math_random_float" },
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
                    { "type": "math_round" },
                    { "type": "math_single" },
                    { "type": "math_trig" }
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
                    { "type": "lists_getSublist"},
                    { "type": "lists_setIndex" },
                    { "type": "lists_split"},
                    { "type": "lists_sort"},
                    { "type": "lists_repeat"}
                ]
            },
            {
                "name": "Text",
                "blocks": [
                    { "type": "text" },
                    { "type": "text_append"},
                    { "type": "text_changeCase" },
                    { "type": "text_charAt"},
                    { "type": "text_getSubstring" },
                    { "type": "text_indexOf"},
                    { "type": "text_isEmpty"},
                    { "type": "text_join" },
                    { "type": "text_length"},
                    { "type": "text_print" },
                    { "type": "text_prompt_ext"},
                    { "type": "text_prompt"},
                    { "type": "text_trim"}
                ]
            },
            {
                "name": "Color",
                "blocks": [
                    { "type": "colour_picker"},
                    { "type": "colour_random"},
                    { "type": "colour_rgb"},
                    { "type": "colour_blend"}
                ]
            },
            { "name": "Variables",  "custom": "VARIABLE" },
            { "name": "Functions", "custom": "PROCEDURE" }
        ]
    };
})(fluid);

/*global require, jQuery*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    fluid.defaults("flock.auto.ui.midiPortSelector", {
        gradeNames: ["flock.ui.midiPortSelector"],

        implicitPorts: [{ id: 999, name: "None" }],

        components: {
            selectBox: {
                type: "flock.auto.ui.selectBox",
                options: {
                    "preferredDevice": "{midiPortSelector}.options.preferredDevice"
                }
            },

            midiSystem: {
                type: "flock.auto.midi.system"
            }
        },

        listeners: {
            "onPortsAvailable.updatePortsModel": {
                funcName: "flock.auto.ui.midiPortSelector.updatePortsModel",
                args: ["{that}", "{arguments}.0", ]
            }
        }
    });

    flock.auto.ui.midiPortSelector.updatePortsModel = function (that, ports) {
        var portType = that.options.portType + "s";
        var portsForType = fluid.copy(that.options.implicitPorts).concat(ports[portType]);

        var transaction = that.applier.initiate();
        transaction.fireChangeRequest({ path: "ports", type: "DELETE" });
        transaction.fireChangeRequest({ path: "ports", value: portsForType });

        transaction.commit();
    };
}());

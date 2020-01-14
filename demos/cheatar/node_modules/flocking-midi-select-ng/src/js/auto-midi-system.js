(function (fluid) {
    var flock = fluid.registerNamespace("flock");

    fluid.registerNamespace("flock.auto.midi.system");

    flock.auto.midi.system.listenForChanges = function (that, access) {
        if (access) {
            access.onstatechange = that.refreshPorts;
        }
    };

    // modelise the ports ourselves until the underlying component does it for us:
    // https://github.com/colinbdclark/Flocking/blob/dd6a9c405658ab11b5b177e2f252a3039c84aece/src/web/midi.js#L340
    flock.auto.midi.system.modelisePorts = function (that) {
        var transaction = that.applier.initiate();
        transaction.fireChangeRequest({ path: "ports", type: "DELETE" });
        transaction.fireChangeRequest({ path: "ports", value: that.ports });

        transaction.commit();
    };

    fluid.defaults("flock.auto.midi.system", {
        gradeNames: ["flock.midi.system", "fluid.modelComponent"],
        model: {
            ports: {}
        },
        listeners: {
            "onAccessGranted.bindAutoRefresh": {
                priority: "after:refreshPorts",
                funcName: "flock.auto.midi.system.listenForChanges",
                args:     ["{that}", "{arguments}.0"] // accessObject
            },
            "onPortsAvailable.modelisePorts": {
                funcName: "flock.auto.midi.system.modelisePorts",
                args:     ["{that}"]
            }
        }
    });
})(fluid);

(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");

    fluid.registerNamespace("lpg.router.remapping");

    lpg.router.remapping.handleNote = function (that, midiMessage) {
        var destination = fluid.get(that, "output.connection");
        if (destination) {
            var note = fluid.get(midiMessage, "note");
            var offset = fluid.get(lpg.offsets, note);
            if (note !== undefined && offset !== undefined) {
                var offsetMidiMessage = fluid.merge({}, midiMessage, { note: note + offset + (12 * that.model.octaveOffset) + that.model.capoOffset });
                destination.send(offsetMidiMessage);
            }
            else {
                destination.send(midiMessage);
            }
        }
    };

    lpg.router.remapping.muteNotes = function (that) {
        var destination = fluid.get(that, "output.connection");
        if (destination) {
            destination.send({
                type:    "control",
                channel: 0,
                number:  123,
                value:   0
            });
        }
    };

    fluid.defaults("lpg.router.remapping", {
        gradeNames: ["lpg.router"],
        model: {
            capoOffset: 0,
            octaveOffset: 0
        },
        modelListeners: {
            capoOffset: {
                excludeSource: "init",
                funcName:      "lpg.router.remapping.muteNotes",
                args:          ["{that}"]
            },
            octaveOffset: {
                excludeSource: "init",
                funcName:      "lpg.router.remapping.muteNotes",
                args:          ["{that}"]
            }
        },
        invokers: {
            handleNote: {
                funcName: "lpg.router.remapping.handleNote",
                args: ["{lpg.router}", "{arguments}.0"]
            }
        }
    });
})(fluid);

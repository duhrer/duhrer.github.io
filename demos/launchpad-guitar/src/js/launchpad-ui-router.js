(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");

    fluid.registerNamespace("lpg.svgUi");

    lpg.svgUi.paintItem = function (that, type, index, colour) {
        var selector = type + index;
        var element  = that.locate(selector);
        element.css("fill", colour);
    };

    lpg.svgUi.paintSvg = function (that) {
        // Paint the frame
        that.paintItem("", "frame", "#999999");

        // Paint the note buttons
        fluid.each(lpg.colours.velocityByNote, function (velocity, note) {
            var htmlColour = lpg.colours.htmlColourByVelocity[velocity];
            that.paintItem("note", note, htmlColour);
        });

        // Paint the control keys so we can actually click them.

    };

    lpg.svgUi.handleNote = function (that, midiMessage) {
        // On a NoteOff event, send a noteOn to the note in question with the right colour (velocity).
        if (midiMessage.type === "noteOff") {
            var colourForNote = fluid.get(lpg.colours.velocityByNote, midiMessage.note) || 12;
            var htmlColour    = lpg.colours.htmlColourByVelocity[colourForNote];
            that.paintItem("note", midiMessage.note, htmlColour);
        }
        // On a NoteOn event, send a noteOn to the note in question with a velocity of 12 (off).
        else {
            that.paintItem("note", midiMessage.note, "white");
        }
    };

    lpg.svgUi.handleControl = function (that, midiMessage) {
        if (midiMessage.value === 0) {
            if (midiMessage.number > 105) {
                that.paintItem("cc", midiMessage.number, "#cccccc00");
            }
        }
        else {
            switch (midiMessage.number) {
                // 104: up
                case 104:
                    if (that.model.octaveOffset < that.options.maxOctaveOffset) {
                        that.applier.change("octaveOffset", that.model.octaveOffset + 1);
                    }
                    break;
                // 105: down
                case 105:
                    if (that.model.octaveOffset > that.options.minOctaveOffset) {
                        that.applier.change("octaveOffset", that.model.octaveOffset - 1);
                    }
                    break;
                // 106: left
                case 106:
                    if (that.model.capoOffset > that.options.minCapoOffset) {
                        that.applier.change("capoOffset", that.model.capoOffset - 1);
                    }
                    else if (that.model.octaveOffset > that.options.minOctaveOffset) {
                        that.applier.change("capoOffset", 0);
                        that.applier.change("octaveOffset", that.model.octaveOffset - 1);
                    }
                    break;
                // 107: right
                case 107:
                    if (that.model.capoOffset < that.options.maxCapoOffset) {
                        that.applier.change("capoOffset", that.model.capoOffset + 1);
                    }
                    else if (that.model.octaveOffset < that.options.maxOctaveOffset) {
                        that.applier.change("capoOffset", 0);
                        that.applier.change("octaveOffset", that.model.octaveOffset + 1);
                    }
                    break;
                default:
                    that.paintItem("cc", midiMessage.number, "#ffffff66");
            }
        }
    };

    // Red = 2 in a given direction
    // Yellow = 1 in a given direction
    // "none" = not modified in a given direction.
    lpg.svgUi.paintOctaveControls = function (that) {
        var upColour   = "#cccccc00";
        var downColour = "#cccccc00";

        if (that.model.octaveOffset > 0) {
            upColour = that.model.octaveOffset === 1 ? "#ffffcc99" : "#ff000066";
        }
        else if (that.model.octaveOffset < 0) {
            downColour = that.model.octaveOffset === -1 ? "#ffffcc99" : "#ff000066";
        }

        that.paintItem("cc", 104, upColour);
        that.paintItem("cc", 105, downColour);
    };

    lpg.svgUi.handleMouseEvent = function (that, buttonType, mouseEventType, event) {
        event.preventDefault();
        var targetId = event.target.id;

        if (buttonType === "note") {
            // Skip the length of "launchpad-note-", i.e. 15 characters
            var note = parseInt(targetId.substring(15), 10);

            // Paint the UI for this note.
            var colourForNote = fluid.get(lpg.colours.velocityByNote, note) || 12;
            var htmlColour    = lpg.colours.htmlColourByVelocity[colourForNote];
            var colour        = mouseEventType === "down" ? "white" : htmlColour;
            that.paintItem("note", note, colour);

            var noteOptions = {
                channel: 0,
                type: "noteOn",
                note: note,
                velocity: mouseEventType === "down" ? 127 : 0
            };
            // TODO: Pass on an event we can use to send notes.
            that.events.note.fire(noteOptions);
        }
        else if (buttonType === "cc") {
            // Skip the length of "launchpad-cc-", i.e. 13 characters
            var ccNumber = parseInt(targetId.substring(13), 10);

            switch (ccNumber) {
                // 104: up
                case 104:
                    if (that.model.octaveOffset < that.options.maxOctaveOffset) {
                        that.applier.change("octaveOffset", that.model.octaveOffset + 1);
                    }
                    break;
                // 105: down
                case 105:
                    if (that.model.octaveOffset > that.options.minOctaveOffset) {
                        that.applier.change("octaveOffset", that.model.octaveOffset - 1);
                    }
                    break;
                // 106: left
                case 106:
                    if (that.model.capoOffset > that.options.minCapoOffset) {
                        that.applier.change("capoOffset", that.model.capoOffset - 1);
                    }
                    break;
                // 107: right
                case 107:
                    if (that.model.capoOffset < that.options.maxCapoOffset) {
                        that.applier.change("capoOffset", that.model.capoOffset + 1);
                    }
                    break;
                default:
                    console.log("not implemented.");
            }
        }
    };

    fluid.defaults("lpg.svgUi", {
        gradeNames: ["fluid.viewComponent"],
        svgPath: "images/launchpad.svg",
        events: {
            note: null
        },
        maxOctaveOffset: 2,
        minOctaveOffset: -2,
        // The "virtual capo" is only mean for adjustments of less than an octave.
        minCapoOffset: -11,
        maxCapoOffset: 11,
        selectors: {
            cc104: "#launchpad-cc-104",
            cc105: "#launchpad-cc-105",
            cc106: "#launchpad-cc-106",
            cc107: "#launchpad-cc-107",
            cc108: "#launchpad-cc-108",
            cc109: "#launchpad-cc-109",
            cc110: "#launchpad-cc-110",
            cc111: "#launchpad-cc-111",
            control: ".launchpad-control",
            frame: "#launchpad-frame",
            note: ".launchpad-note",
            note0: "#launchpad-note-0",
            note1: "#launchpad-note-1",
            note2: "#launchpad-note-2",
            note3: "#launchpad-note-3",
            note4: "#launchpad-note-4",
            note5: "#launchpad-note-5",
            note6: "#launchpad-note-6",
            note7: "#launchpad-note-7",
            note8: "#launchpad-note-8",
            note16: "#launchpad-note-16",
            note17: "#launchpad-note-17",
            note18: "#launchpad-note-18",
            note19: "#launchpad-note-19",
            note20: "#launchpad-note-20",
            note21: "#launchpad-note-21",
            note22: "#launchpad-note-22",
            note23: "#launchpad-note-23",
            note24: "#launchpad-note-24",
            note32: "#launchpad-note-32",
            note33: "#launchpad-note-33",
            note34: "#launchpad-note-34",
            note35: "#launchpad-note-35",
            note36: "#launchpad-note-36",
            note37: "#launchpad-note-37",
            note38: "#launchpad-note-38",
            note39: "#launchpad-note-39",
            note40: "#launchpad-note-40",
            note48: "#launchpad-note-48",
            note49: "#launchpad-note-49",
            note50: "#launchpad-note-50",
            note51: "#launchpad-note-51",
            note52: "#launchpad-note-52",
            note53: "#launchpad-note-53",
            note54: "#launchpad-note-54",
            note55: "#launchpad-note-55",
            note56: "#launchpad-note-56",
            note64: "#launchpad-note-64",
            note65: "#launchpad-note-65",
            note66: "#launchpad-note-66",
            note67: "#launchpad-note-67",
            note68: "#launchpad-note-68",
            note69: "#launchpad-note-69",
            note70: "#launchpad-note-70",
            note71: "#launchpad-note-71",
            note72: "#launchpad-note-72",
            note80: "#launchpad-note-80",
            note81: "#launchpad-note-81",
            note82: "#launchpad-note-82",
            note83: "#launchpad-note-83",
            note84: "#launchpad-note-84",
            note85: "#launchpad-note-85",
            note86: "#launchpad-note-86",
            note87: "#launchpad-note-87",
            note88: "#launchpad-note-88",
            note96: "#launchpad-note-96",
            note97: "#launchpad-note-97",
            note98: "#launchpad-note-98",
            note99: "#launchpad-note-99",
            note100: "#launchpad-note-100",
            note101: "#launchpad-note-101",
            note102: "#launchpad-note-102",
            note103: "#launchpad-note-103",
            note104: "#launchpad-note-104",
            note112: "#launchpad-note-112",
            note113: "#launchpad-note-113",
            note114: "#launchpad-note-114",
            note115: "#launchpad-note-115",
            note116: "#launchpad-note-116",
            note117: "#launchpad-note-117",
            note118: "#launchpad-note-118",
            note119: "#launchpad-note-119",
            note120: "#launchpad-note-120"
        },
        invokers: {
            "handleControlMouseDown": {
                funcName: "lpg.svgUi.handleMouseEvent",
                args: ["{that}", "cc", "down", "{arguments}.0"]
            },
            "handleNoteMouseDown": {
                funcName: "lpg.svgUi.handleMouseEvent",
                args: ["{that}", "note", "down", "{arguments}.0"]
            },
            "handleNoteMouseUp": {
                funcName: "lpg.svgUi.handleMouseEvent",
                args: ["{that}", "note", "up", "{arguments}.0"]
            },
            "paintItem": {
                funcName: "lpg.svgUi.paintItem",
                args: ["{that}", "{arguments}.0", "{arguments}.1", "{arguments}.2"] // type, index, colour
            }
        },
        listeners: {
            "onCreate.paintSvg": {
                funcName: "lpg.svgUi.paintSvg",
                args: ["{that}"]
            },
            "onCreate.bindNoteMouseDown": {
                "this": "{that}.dom.note",
                "method": "mousedown",
                "args": ["{that}.handleNoteMouseDown"]
            },
            "onCreate.bindNoteMouseUp": {
                "this": "{that}.dom.note",
                "method": "mouseup",
                "args": ["{that}.handleNoteMouseUp"]
            },
            "onCreate.bindControlMouseDown": {
                "this": "{that}.dom.control",
                "method": "mousedown",
                "args": ["{that}.handleControlMouseDown"]
            }
        },
        modelListeners: {
            octaveOffset: {
                excludeSource: "init",
                funcName: "lpg.svgUi.paintOctaveControls",
                args: ["{that}"]
            }
        }
    });

    fluid.registerNamespace("lpg.router.ui");

    lpg.router.ui.handleNote = function (that, midiMessage) {
        var destination = fluid.get(that, "output.connection");
        if (destination) {
            // On a NoteOff event, send a noteOn to the note in question with the right colour (velocity).
            if (midiMessage.type === "noteOff") {
                var colourForNote       = fluid.get(lpg.colours.velocityByNote, midiMessage.note) || 12;
                var colouredMidiMessage = fluid.merge({}, midiMessage, {type: "noteOn", velocity: colourForNote});
                destination.send(colouredMidiMessage);
            }
            // On a NoteOn event, send a noteOn to the note in question with a velocity of 12 (off).
            else {
                var uncolouredMidiMessage = fluid.merge({}, midiMessage, {velocity: 12});
                destination.send(uncolouredMidiMessage);
            }
        }
    };

    lpg.router.ui.paintOctaveControls = function (that) {
        var destination = fluid.get(that, "output.connection");
        if (destination) {
            var upColour   = 0;
            var downColour = 0;

            // 58: yellow, 15: red
            if (that.model.octaveOffset > 0) {
                upColour = that.model.octaveOffset === 1 ? 58 : 15;
            }
            else if (that.model.octaveOffset < 0) {
                downColour = that.model.octaveOffset === -1 ? 58 : 15;
            }

            destination.send({type: "control", channel: 0, number: 104, value: upColour});
            destination.send({type: "control", channel: 0, number: 105, value: downColour});
        }
    };

    lpg.router.ui.paintDevice = function (connection) {
        // TODO: Request the device information up front and only paint if it's a launchpad.

        /*
            There are a few control commands that you can send on channel 0 with a "number" of zero.  For example,
            Here's the command to update the display buffer.  The bits of the "value" are used to control a range of
            parameters:

            0. always 0
            1. always 1
            2. 0=don't copy from buffer to buffer, 1=do copy
            3. 0=don't flash between buffers, 1=flash between buffers,
            4. 0=write to buffer 0, 1=write to buffer 1
            5. always 0
            6. 0=display buffer 0, 1=display buffer 1

            So, writing to buffer 0 and displaying to buffer 0 with all other flags off equates to 0100000, or 0x20.

            Writing to buffer 0 and displaying buffer 1 with all other flags off equates to 0100000, or 0x21.

            See the Launchpad Manual for more details.

         */


        // X-Y Layout
        connection.send({
            type: "control",
            channel: 0,
            number: 0x00,
            value: 1
        });

        // Write to buffer 0, display buffer 1.
        connection.send({
            type: "control",
            channel: 0,
            number: 0x00,
            value: 0x21
        });

        // Paint the note buttons
        fluid.each(lpg.colours.velocityByNote, function (velocity, note) {
            connection.send({
                type: "noteOn",
                channel: 0,
                note: parseInt(note, 10),
                velocity: velocity
            });
        });

        // Display buffer 0.
        connection.send({
            type: "control",
            channel: 0,
            number: 0x00,
            value: 0x20
        });

    };

    fluid.defaults("lpg.router.ui", {
        gradeNames: ["lpg.router"],
        messagesNotToPassThrough: ["noteOn", "noteOff", "control"],
        invokers: {
            handleNote: {
                funcName: "lpg.router.ui.handleNote",
                args: ["{lpg.router}", "{arguments}.0"]
            }
        },
        model: {
            octaveOffset: 0,
            capoOffset: 0
        },
        components: {
            svg: {
                type: "lpg.svgUi",
                container: ".launchpad-svg-ui",
                options: {
                    model: {
                        octaveOffset: "{lpg.router.ui}.model.octaveOffset",
                        capoOffset: "{lpg.router.ui}.model.capoOffset"
                    },
                    listeners: {
                        "note.forwardNote": {
                            funcName: "lpg.router.ui.forwardNote",
                            args: ["{lpg.router}", "{arguments}.0"]
                        }
                    }
                }
            },
            input: {
                options: {
                    components: {
                        midiPortSelector: {
                            options: {
                                strings: {
                                    selectBoxLabel: "UI Input"
                                }
                            }
                        },
                        connection: {
                            options: {
                                listeners: {
                                    "note.paintSvg": {
                                        funcName: "lpg.svgUi.handleNote",
                                        args: ["{svg}", "{arguments}.0"] // midiMessage
                                    },
                                    control: {
                                        funcName: "lpg.svgUi.handleControl",
                                        args: ["{svg}", "{arguments}.0"] // midiMessage
                                    }
                                }
                            }
                        }
                    }
                }
            },
            output: {
                options: {
                    preferredDevice: "Launchpad",
                    components: {
                        midiPortSelector: {
                            options: {
                                strings: {
                                    selectBoxLabel: "UI Output"
                                }
                            }
                        },
                        connection: {
                            options: {
                                listeners: {
                                    "onReady.paintDevice": {
                                        funcName: "lpg.router.ui.paintDevice",
                                        args: ["{that}"]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        modelListeners: {
            octaveOffset: {
                excludeSource: "init",
                funcName: "lpg.router.ui.paintOctaveControls",
                args: ["{that}"]
            }
        }
    });
})(fluid);

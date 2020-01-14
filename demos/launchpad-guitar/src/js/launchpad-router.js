(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");
    fluid.registerNamespace("lpg.router");

    lpg.router.handleMessage = function (that, midiMessage) {
        if (that.options.messagesNotToPassThrough.indexOf(fluid.get(midiMessage, "type")) === -1) {
            var destination = fluid.get(that, "output.connection");
            if (destination) {
                destination.send(midiMessage);
            }
        }
    };

    fluid.defaults("lpg.router", {
        gradeNames: ["fluid.viewComponent"],
        messagesNotToPassThrough: ["noteOn", "noteOff"],
        selectors: {
            input:  ".midi-input",
            output: ".midi-output"
        },
        invokers: {
            handleMessage: {
                funcName: "lpg.router.handleMessage",
                args:     ["{lpg.router}", "{arguments}.0"] // component, MIDI message
            },
            handleNote: {
                funcName: "fluid.notImplemented",
                args:     ["{lpg.router}", "{arguments}.0"] // component, MIDI message
            }
        },
        components: {
            enviro: {
                type: "flock.enviro"
            },
            input: {
                type: "flock.auto.ui.midiConnector",
                container: "{that}.dom.input",
                options: {
                    preferredDevice: "Launchpad",
                    portType: "input",
                    components: {
                        midiPortSelector: {
                            options: {
                                strings: {
                                    selectBoxLabel: "Device Input"
                                }
                            }
                        },
                        connection: {
                            options: {
                                listeners: {
                                    message: {
                                        func: "{lpg.router}.handleMessage"
                                    },
                                    note: {
                                        func: "{lpg.router}.handleNote"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            output: {
                type: "flock.auto.ui.midiConnector",
                container: "{that}.dom.output",
                options: {
                    portType: "output",
                    components: {
                        midiPortSelector: {
                            options: {
                                strings: {
                                    selectBoxLabel: "Device Output"
                                }
                            }
                        }
                    }
                }
            }
        }
    });
})(fluid);

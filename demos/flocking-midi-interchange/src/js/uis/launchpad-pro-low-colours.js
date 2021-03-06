(function (fluid, flock) {
    "use strict";
    fluid.registerNamespace("flock.midi.interchange.oda.launchpadPro.uis");
    // TODO: Transition all traditional "map" approaches to use transforms instead.
    flock.midi.interchange.oda.launchpadPro.uis.lowColours = [
        // TODO: Figure out how to reuse this more cleanly.
        // Boilerplate sysex to set mode and layout, see:
        // https://customer.novationmusic.com/sites/customer/files/novation/downloads/10598/launchpad-pro-programmers-reference-guide_0.pdf
        // All sysex messages for the launchpad pro have the same header (framing byte removed)
        // 00h 20h 29h 02h 10h
        // Select "standalone" mode.
        { type: "sysex", data: [0, 0x20, 0x29, 0x02, 0x10, 33, 1] },
        // Select "programmer" layout
        { type: "sysex", data: [0, 0x20, 0x29, 0x02, 0x10, 44, 3]},

        { type: "control", channel: 0, number: 10, value:    0 },
        { type: "noteOn",  channel: 0, note:   11, velocity: 1 },
        { type: "noteOn",  channel: 0, note:   12, velocity: 2 },
        { type: "noteOn",  channel: 0, note:   13, velocity: 3 },
        { type: "noteOn",  channel: 0, note:   14, velocity: 4 },
        { type: "noteOn",  channel: 0, note:   15, velocity: 5 },
        { type: "noteOn",  channel: 0, note:   16, velocity: 6 },
        { type: "noteOn",  channel: 0, note:   17, velocity: 7 },
        { type: "noteOn",  channel: 0, note:   18, velocity: 8 },
        { type: "control", channel: 0, number: 19, value:    9 },
        { type: "control", channel: 0, number: 20, value:    10 },
        { type: "noteOn",  channel: 0, note:   21, velocity: 11 },
        { type: "noteOn",  channel: 0, note:   22, velocity: 12 },
        { type: "noteOn",  channel: 0, note:   23, velocity: 13 },
        { type: "noteOn",  channel: 0, note:   24, velocity: 14 },
        { type: "noteOn",  channel: 0, note:   25, velocity: 15 },
        { type: "noteOn",  channel: 0, note:   26, velocity: 16 },
        { type: "noteOn",  channel: 0, note:   27, velocity: 17 },
        { type: "noteOn",  channel: 0, note:   28, velocity: 18 },
        { type: "control", channel: 0, number: 29, value:    19 },
        { type: "control", channel: 0, number: 30, value:    20 },
        { type: "noteOn",  channel: 0, note:   31, velocity: 21 },
        { type: "noteOn",  channel: 0, note:   32, velocity: 22 },
        { type: "noteOn",  channel: 0, note:   33, velocity: 23 },
        { type: "noteOn",  channel: 0, note:   34, velocity: 24 },
        { type: "noteOn",  channel: 0, note:   35, velocity: 25 },
        { type: "noteOn",  channel: 0, note:   36, velocity: 26 },
        { type: "noteOn",  channel: 0, note:   37, velocity: 27 },
        { type: "noteOn",  channel: 0, note:   38, velocity: 28 },
        { type: "control", channel: 0, number: 39, value:    29 },
        { type: "control", channel: 0, number: 40, value:    30 },
        { type: "noteOn",  channel: 0, note:   41, velocity: 31 },
        { type: "noteOn",  channel: 0, note:   42, velocity: 32 },
        { type: "noteOn",  channel: 0, note:   43, velocity: 33 },
        { type: "noteOn",  channel: 0, note:   44, velocity: 34 },
        { type: "noteOn",  channel: 0, note:   45, velocity: 35 },
        { type: "noteOn",  channel: 0, note:   46, velocity: 36 },
        { type: "noteOn",  channel: 0, note:   47, velocity: 37 },
        { type: "noteOn",  channel: 0, note:   48, velocity: 38 },
        { type: "control", channel: 0, number: 49, value:    39 },
        { type: "control", channel: 0, number: 50, value:    40 },
        { type: "noteOn",  channel: 0, note:   51, velocity: 41 },
        { type: "noteOn",  channel: 0, note:   52, velocity: 42 },
        { type: "noteOn",  channel: 0, note:   53, velocity: 43 },
        { type: "noteOn",  channel: 0, note:   54, velocity: 44 },
        { type: "noteOn",  channel: 0, note:   55, velocity: 45 },
        { type: "noteOn",  channel: 0, note:   56, velocity: 46 },
        { type: "noteOn",  channel: 0, note:   57, velocity: 47 },
        { type: "noteOn",  channel: 0, note:   58, velocity: 48 },
        { type: "control", channel: 0, number: 59, value:    49 },
        { type: "control", channel: 0, number: 60, value:    50 },
        { type: "noteOn",  channel: 0, note:   61, velocity: 51 },
        { type: "noteOn",  channel: 0, note:   62, velocity: 52 },
        { type: "noteOn",  channel: 0, note:   63, velocity: 53 },
        { type: "noteOn",  channel: 0, note:   64, velocity: 54 },
        { type: "noteOn",  channel: 0, note:   65, velocity: 55 },
        { type: "noteOn",  channel: 0, note:   66, velocity: 56 },
        { type: "noteOn",  channel: 0, note:   67, velocity: 57 },
        { type: "noteOn",  channel: 0, note:   68, velocity: 58 },
        { type: "control", channel: 0, number: 69, value:    59 },
        { type: "control", channel: 0, number: 70, value:    60 },
        { type: "noteOn",  channel: 0, note:   71, velocity: 61 },
        { type: "noteOn",  channel: 0, note:   72, velocity: 62 },
        { type: "noteOn",  channel: 0, note:   73, velocity: 63 },
        { type: "noteOn",  channel: 0, note:   74, velocity: 64 },
        { type: "noteOn",  channel: 0, note:   75, velocity: 65 },
        { type: "noteOn",  channel: 0, note:   76, velocity: 66 },
        { type: "noteOn",  channel: 0, note:   77, velocity: 67 },
        { type: "noteOn",  channel: 0, note:   78, velocity: 68 },
        { type: "control", channel: 0, number: 79, value:    69 },
        { type: "control", channel: 0, number: 80, value:    70 },
        { type: "noteOn",  channel: 0, note:   81, velocity: 71 },
        { type: "noteOn",  channel: 0, note:   82, velocity: 72 },
        { type: "noteOn",  channel: 0, note:   83, velocity: 73 },
        { type: "noteOn",  channel: 0, note:   84, velocity: 74 },
        { type: "noteOn",  channel: 0, note:   85, velocity: 75 },
        { type: "noteOn",  channel: 0, note:   86, velocity: 76 },
        { type: "noteOn",  channel: 0, note:   87, velocity: 77 },
        { type: "noteOn",  channel: 0, note:   88, velocity: 78 },
        { type: "control", channel: 0, number: 89, value:    79 }
    ];
})(fluid, flock);

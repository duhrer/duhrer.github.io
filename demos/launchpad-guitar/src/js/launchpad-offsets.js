(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");
    // Pitch offsets to adjust the default "drum" tuning of the launchpad to guitar tunings.
    // The keys are the pitch of the button on the launchpad, the values are the offset from the note the launchpad
    // sends to the desired velocity.
    lpg.offsets = {
        // Start "high D" string
        0: 74,
        1: 74,
        2: 74,
        3: 74,
        4: 74,
        5: 74,
        6: 74,
        7: 74,
        8: 74,
        // Start "high A" string
        16: 53,
        17: 53,
        18: 53,
        19: 53,
        20: 53,
        21: 53,
        22: 53,
        23: 53,
        24: 53,
        // Start "high E" string
        32: 32,
        33: 32,
        34: 32,
        35: 32,
        36: 32,
        37: 32,
        38: 32,
        39: 32,
        40: 32,
        // Start "B" string
        48: 11,
        49: 11,
        50: 11,
        51: 11,
        52: 11,
        53: 11,
        54: 11,
        55: 11,
        56: 11,
        // Start "G" string
        64: -9,
        65: -9,
        66: -9,
        67: -9,
        68: -9,
        69: -9,
        70: -9,
        71: -9,
        72: -9,
        // Start "D" string
        80: -30,
        81: -30,
        82: -30,
        83: -30,
        84: -30,
        85: -30,
        86: -30,
        87: -30,
        88: -30,
        // Start "A" string
        96:  -51,
        97:  -51,
        98:  -51,
        99:  -51,
        100: -51,
        101: -51,
        102: -51,
        103: -51,
        104: -51,
        // Start "low E" string
        112: -72,
        113: -72,
        114: -72,
        115: -72,
        116: -72,
        117: -72,
        118: -72,
        119: -72,
        120: -72
    };
})(fluid);

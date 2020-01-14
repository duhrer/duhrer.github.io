(function (fluid) {
    "use strict";
    var lpg = fluid.registerNamespace("lpg");
    fluid.registerNamespace("lpg.colours");
    lpg.colours.velocityByNote = {
        // Start "high D" string
        0: 63,
        1: 63,
        2: 63,
        3: 63,
        4: 63,
        5: 15,
        6: 15,
        7: 15,
        8: 15,
        // Start "high A" string
        16: 58,
        17: 58,
        18: 58,
        19: 58,
        20: 58,
        21: 63,
        22: 63,
        23: 63,
        24: 63,
        // Start "high E" string
        32: 60,
        33: 60,
        34: 60,
        35: 60,
        36: 60,
        37: 58,
        38: 58,
        39: 58,
        40: 58,
        // Start "B" string
        48: 29,
        49: 29,
        50: 29,
        51: 29,
        52: 29,
        53: 60,
        54: 60,
        55: 60,
        56: 60,
        // Start "G" string
        64: 15,
        65: 15,
        66: 15,
        67: 15,
        68: 29,
        69: 29,
        70: 29,
        71: 29,
        72: 29,
        // Start "D" string
        80: 63,
        81: 63,
        82: 63,
        83: 63,
        84: 63,
        85: 15,
        86: 15,
        87: 15,
        88: 15,
        // Start "A" string
        96: 58,
        97: 58,
        98: 58,
        99: 58,
        100: 58,
        101: 63,
        102: 63,
        103: 63,
        104: 63,
        // Start "low E" string
        112: 60,
        113: 60,
        114: 60,
        115: 60,
        116: 60,
        117: 58,
        118: 58,
        119: 58,
        120: 58
    };

    lpg.colours.htmlColourByVelocity = {
        12: "white",
        15: "#c71a1a",
        29: "#716631",
        58: "#d9cf3a",
        60: "#32c045",
        63: "#dfb379"
    };
})(fluid);

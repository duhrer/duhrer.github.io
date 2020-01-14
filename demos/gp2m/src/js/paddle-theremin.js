/* globals fluid */
(function (fluid) {
    "use strict";

    fluid.registerNamespace("gp2m.theremin.paddle");

    /*

        TODO: Make a visual "etch-a-sketch" themed for the limitations of the 2600:

        https://en.wikipedia.org/wiki/Atari_2600_hardware

        1. Create a display space of 160x192 (or perhaps 40x192) blocky "pixels" designed for 1080p, i.e. 1920x1080.
        2. When the colour or the position changes, draw a pixel at the cursor position.
        3. Overlay scan lines, simplify to three per "pixel" rather than the full 486 in NTSC:
           https://en.wikipedia.org/wiki/NTSC

        For the scan lines, the proportions of visible colour to gap are roughly 3:1. The "gap" should transition from
        transparent to black so that there is some blurring.

        The palette should be drawn from the NTSC palette:
        https://en.wikipedia.org/wiki/List_of_video_game_console_palettes#NTSC
        http://denilson.sa.nom.br/gimp-palettes/index.html
        https://raw.githubusercontent.com/denilsonsa/gimp-palettes/master/palettes/HW-Atari-2600-NTSC.gpl

    */

    gp2m.theremin.paddle.handleAxisChange = function (that, axisValue, axisIndex, gamepadIndex) {
        var pitchBendValue = Math.round((axisValue + 1)/2 * 16383);
        // Send a pitchbend message we can use as a fine-grained control (pitch, velocity).
        that.send({
            type:    "pitchbend",
            channel: axisIndex,
            value:   pitchBendValue
        });

        // Save the current location for use in painting onscreen.
        var drawAxis = axisIndex ? "y" : "x";
        var drawScale = 127; // Standardise slightly smaller than the Atari resolution, 128 x 128;
        var scaledValue = Math.round((axisValue + 1)/2 * drawScale);
        that.applier.change(drawAxis, scaledValue);
    };


    // Change the current painting colour when a button is pressed.
    gp2m.theremin.paddle.handleButtonDown = function (that, buttonValue, buttonIndex, gamepadIndex) {
        if (buttonValue) {
            // button 0 lowers the colour, button 1 raises it.
            var increment = buttonIndex ? 1 : -1;
            var newColour = (that.model.currentColour + increment) % 127;
            that.applier.change("currentColour", newColour)
        }
    };

    // TODO: Update the border/logo if the colour has changed.

    // TODO: Redraw the cursor if the colour or the position change.

    fluid.defaults("gp2m.theremin.paddle", {
        gradeNames: ["gp2m.harness"],
        model: {
            currentColour: 33,
            x: 0,
            y: 0
        },
        colourPalette: [
            "#000000",
            "#404040",
            "#6c6c6c",
            "#909090",
            "#b0b0b0",
            "#c8c8c8",
            "#dcdcdc",
            "#ececec",
            "#444400",
            "#646410",
            "#848424",
            "#a0a034",
            "#b8b840",
            "#d0d050",
            "#e8e85c",
            "#fcfc68",
            "#702800",
            "#844414",
            "#985c28",
            "#ac783c",
            "#bc8c4c",
            "#cca05c",
            "#dcb468",
            "#ecc878",
            "#841800",
            "#983418",
            "#ac5030",
            "#c06848",
            "#d0805c",
            "#e09470",
            "#eca880",
            "#fcbc94",
            "#880000",
            "#9c2020",
            "#b03c3c",
            "#c05858",
            "#d07070",
            "#e08888",
            "#eca0a0",
            "#fcb4b4",
            "#78005c",
            "#8c2074",
            "#a03c88",
            "#b0589c",
            "#c070b0",
            "#d084c0",
            "#dc9cd0",
            "#ecb0e0",
            "#480078",
            "#602090",
            "#783ca4",
            "#8c58b8",
            "#a070cc",
            "#b484dc",
            "#c49cec",
            "#d4b0fc",
            "#140084",
            "#302098",
            "#4c3cac",
            "#6858c0",
            "#7c70d0",
            "#9488e0",
            "#a8a0ec",
            "#bcb4fc",
            "#000088",
            "#1c209c",
            "#3840b0",
            "#505cc0",
            "#6874d0",
            "#7c8ce0",
            "#90a4ec",
            "#a4b8fc",
            "#00187c",
            "#1c3890",
            "#3854a8",
            "#5070bc",
            "#6888cc",
            "#7c9cdc",
            "#90b4ec",
            "#a4c8fc",
            "#002c5c",
            "#1c4c78",
            "#386890",
            "#5084ac",
            "#689cc0",
            "#7cb4d4",
            "#90cce8",
            "#a4e0fc",
            "#003c2c",
            "#1c5c48",
            "#387c64",
            "#509c80",
            "#68b494",
            "#7cd0ac",
            "#90e4c0",
            "#a4fcd4",
            "#003c00",
            "#205c20",
            "#407c40",
            "#5c9c5c",
            "#74b474",
            "#8cd08c",
            "#a4e4a4",
            "#b8fcb8",
            "#143800",
            "#345c1c",
            "#507c38",
            "#6c9850",
            "#84b468",
            "#9ccc7c",
            "#b4e490",
            "#c8fca4",
            "#2c3000",
            "#4c501c",
            "#687034",
            "#848c4c",
            "#9ca864",
            "#b4c078",
            "#ccd488",
            "#e0ec9c",
            "#442800",
            "#644818",
            "#846830",
            "#a08444",
            "#b89c58",
            "#d0b46c",
            "#e8cc7c",
            "#fce08c"
        ],
        listeners: {
            "onAxisChange.handleAxisChange": {
                funcName: "gp2m.theremin.paddle.handleAxisChange",
                args:     ["{that}", "{arguments}.0", "@expand:parseInt({arguments}.1, 10)", "{arguments}.2"] // axisValue, axisIndex, gamepadIndex

            },
            "onButtonDown.handleButtonDown": {
                funcName: "gp2m.theremin.paddle.handleButtonDown",
                args:     ["{that}", "{arguments}.0", "@expand:parseInt({arguments}.1, 10)", "{arguments}.2"] // buttonValue, buttonIndex, gamepadIndex
            }
        }
    });
})(fluid);

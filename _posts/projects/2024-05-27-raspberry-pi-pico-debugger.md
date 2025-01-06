---
layout: post
title: Raspberry Pi Pico Debugger
date: '2024-05-27'

type: posts
tags:
- projects
- microcontrollers
---

I recently started working with the Raspberry Pi Pico, and got to the point where I wanted a debugger. If you have a spare Pi Pico and few wires, you can actually build your own debugger using this [open source firmware](https://github.com/raspberrypi/debugprobe).

As my desk has enough exposed wires and circuit boards on it already, I went with the prebuilt
[Raspberry Pi  debug probe](https://www.raspberrypi.com/products/debug-probe/), which was less than 20 euros with shipping.

[The instructions for the unit](https://www.raspberrypi.com/documentation/microcontrollers/debug-probe.html) are pretty straightforward, although:

1. They didn't provide wiring instructions for the [Pimoroni Pico Explorer Base](https://shop.pimoroni.com/products/pico-explorer-base) I use, and I couldn't find any examples online.
2. The commands to deploy compiled binaries are kind of hairy.

## Wiring the Explorer Base

There are three cables included with the debug probe. One is a three pin grey cable, which connects the right-hand port of the debugger to the debugging port on the Pi Pico.

The others are for transmitting to/from the unit you're debugging, and there are male and female variants. You'd use the female variant if you're connecting to male headers on your Pico, or something similar. For a breadboard or breakout board like I'm using, you'd use the male connectors.

The diagram in [the instructions](https://www.raspberrypi.com/documentation/microcontrollers/debug-probe.html) indicates that you should connect:

1. The yellow wire to pin 0 on the Pico
2. The orange wire to pin 1 on the Pico
3. The black wire to ground on the Pico

Looking at the [wiring diagram for the Pico](https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html), I saw that pin 0 is GP0, and pin1 is GP1. The Pico Explorer base has clearly labeled female sockets for each of those, so I plugged the wires in there. There are two ground pins available in the explorer, I just picked one.

Apparently this is not necessary to actually program the unit, you can just use the one connector. However, we need to test if debugging works that way (I doubt it will)

All that was left was to hook both the Pico and the debugger up to my USB hub.

## Programming the Pico from the Command Line

Part of my goal here was to simplify my workflow. The "learner" workflow deploys updates by:

1. Removing the USB cable from the Pico
2. Holding the "Bootsel" button while reconnecting the USB cable.
3. Copying a UF2 file on to the USB drive that appears.
4. As the drive disappears once the Pico is programmed, you end up with a warning from your computer about a USB drive that was not safely ejected.

You can program and reset the Pico in one step using a command like:

`sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "program pico_display_demo.elf verify reset exit"`

As the command is kind of complex (multiple config switches, code to evaluate on the pico), I wanted a shorter way to just launch a particular binary. I ended up writing a shell function that looks like:

```
function go2040() {
    sudo openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg -c "adapter speed 5000" -c "program $1 verify reset exit"
}
```

With that, I'm able to install a new binary using a command like:

`go2044 binary.elf`

 My next steps are:
 
  1. Debugging a test program from the command line.
  2. Connecting to the pico via the debugger, so that I can see the console output.
  3. Doing the same from VS Code.
  4. Trying debugging with Micropython.
---
layout: post
title: Running and Debugging Python on the Pi Pico
date: '2024-05-28'

type: posts
tags:
- projects
- microcontrollers
---

I'm currently refreshing my decades-old understanding of c++ before working on a new project on the Pi Pico. As that's gonna take a while, I thought I'd see how the Pi Pico is with Python. 

## CircuitPython

The  [sample code provided by PImoroni](https://github.com/pimoroni/pimoroni-pico) includes python files that are meant to be used with CircuitPython, so I wanted to try that first.

### Initial Setup

Before you can use CircuitPython, you need to install the appropriate UF2 file on your Pi Pico. As I'm using a [Pimoroni Pico Explorer Base](https://shop.pimoroni.com/products/pico-explorer-base), I needed to install [their custom UF2 file](https://github.com/pimoroni/pimoroni-pico/releases) that includes the libraries for the display, et cetera.

### Editing and Deploying Code

To actually run the examples, I tried two popular editors,  [Thonny](https://thonny.org/), and [Mu](https://codewith.mu/en).

#### Thonny

In order to get things working, I had to configure Thonny to use the right interpreter, i.e. the interpreter on my Pi Pico:

1. Using the hamburger icon in the bottom right of Thonny's window, select "Configure Interpreter".
2. Select "MicroPython (Raspberry Pi Pico)"
3. Hit "OK"
4. I then had to disconnect and reconnect the Pico before Thonny would detect it.

I was then able to load the examples onto my Pico without problems. Thonny got me excited with its debugger icon, but sadly this apparently doesn't work with MicroPython.

#### Mu Editor

The setup for Mu Editor was very straightforward, I just had to change the "mode" to "RP2040". It was then able to load the examples onto my Pico with no problems. Between the two, I like the look of and the built-in tools in Mu Editor a bit better.

### Arduino IDE

I started out with the PI 2040 because the board I was using with the Arduino IDE (an [Adafruit Neopixel Trinkey](https://www.adafruit.com/product/4870)) did not support debugging. Now that I have a probe, I wanted to see if:

1. I could build on the code I wrote for the Trinkey using the Arduino IDE
2. I could get the debugger in the Arduino IDE working with the Pico.

First, as I had been running MicroPython on the Pico earlier, I rebooted the Pico with the "Bootsel" button held.  You should only need to do this once.

I then needed to make the Arduino IDE aware of the board. [There is a library to add the Pi Pico as a "board" in the Arduino IDE](https://arduino-pico.readthedocs.io/en/latest/),  which I installed using the "Board Manager". As I have a [Raspberry Pi Debug Probe](https://www.raspberrypi.com/documentation/microcontrollers/debug-probe.html) which is also a Pico, I used "Get Board Info" under the "Tools" menu to figure out which port was the Pico + Explorer Base, and which was the probe. I selected the port for the (non probe) Pico, and changed the following settings:

1. `Debug Level` is set to `Wire`.
2. `Upload Method` is set to `Picoprobe (CMSIS-DAP)`.

With that, I was able to upload sketches to the Pico, and also to use the Arduino IDE's debugger.

### VS Code

I did briefly try [the MIcroPico extension for VS Code](https://github.com/paulober/MicroPico), which did allow me to at least run one of the pimoroni examples once.  I  was not overly impressed with the reliability, as I would often have to reset the pico to run a new file.

Lots of additional features (library management, etc) seem to depend on having wifi enabled/configured on your pico, which seems [overly involved](https://projects.raspberrypi.org/en/projects/get-started-pico-w/2) for the kinds of sketching I have in mind.
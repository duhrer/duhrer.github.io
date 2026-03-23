---
layout: post
title: Battle Mouse
date: '2026-03-21'

type: posts
tags:
- projects
- microcontrollers
---

I buy a lot of gamepads and joysticks. Most recently, I bought a fairly rare
[Gravis Mousestick II](https://wiki.preterhuman.net/Gravis_Mac_MouseStick_II),
mainly because it has adjustable tension. This is a useful accessibility
feature, so I wanted to examine how they did that and think about how I might
make something similar.

Although I haven't finished making an [ADB
](https://en.wikipedia.org/wiki/Apple_Desktop_Bus) to USB converter so I can
actually use the joystick yet, I did read up on what it was supposed to do.
There weren't joysticks for the Macintosh when the Gravis unit came out, so it
had a driver to make it act like a mouse.

I've wanted to make something like this for a while to enhance the work I've
done with the [Gamepad
Navigator](https://github.com/fluid-lab/gamepad-navigator). Instead of
simulating a mouse using browser APIs, I could actually move the pointer and
click things like a regular mouse.

This got me thinking: why not do that with a modern USB joystick or gamepad?
There are plenty of applications you can install on a computer to do this. There
are also gamepads like the original Steam Controller that do this, but only when
Steam is running. Something based on a microcontroller would work on any
platform that supports a USB mouse, and without drivers or an application.

At this point I've made a lot of TinyUSB projects, especially [MIDI
projects](https://duhrer.github.io/tags/#MIDI), and have a working familiarity
with both the device and host stack. It seemed like a good time to give it a go.

So I thought up a project. The thing is, gamepads have two sticks. I was
thinking about the old game
[Battlezone](https://en.wikipedia.org/wiki/Battlezone_(1980_video_game), which
uses two sticks to control a tank. Why not combine the two ideas and make a
"battle mouse", where:

1. Moving both sticks up moves the pointer up.
2. Moving both sticks down moves the pointer down.
3. Moving one stick up and moving the other down moves the pointer left and right.
4. Moving one stick up and leaving the other neutral moves more slowly left and right.
5. The left trigger acts as the left mouse button.
6. The right trigger acts as the right mouse button.

This is completely impractical and no one (including myself) is really going to
use it, but it's goofy enough to be fun to play with, and I can learn to:

1. Read gamepad inputs from a microcontroller's USB Host port.
2. Send mouse input to a USB Host via a microcontroller's device port.

## Round One: The Adafruit Feather RP2040 with USB Type A Host

I wrote [an initial prototype](https://github.com/duhrer/battle-mouse) for the
[Adafruit Feather RP2040 with USB Type A
Host](https://www.adafruit.com/product/5723) using the [Raspberry Pi Pico
SDK](https://github.com/raspberrypi/pico-sdk/tree/master), and then promptly got
stuck. I could read gamepad inputs from the host port, but nothing I did on the
client side resulted in the mouse pointer moving. I spent a lot of time looking
for examples, but eventually I discovered that [even the example shipped with
TinyUSB](https://github.com/hathach/tinyusb/blob/master/examples/device/hid_composite/src/main.c)
wouldn't move the mouse pointer.

This led to a bit of soul searching. The last time I hit something like this, it
was MIDI system exclusive messages, which don't work in the same way on the host
functions in TinyUSB as they do on the client side.

This seemed like another area of the code that was maybe not as heavily
exercised. I mean, there are so many keyboard projects that I'm sure they'd hear
if there were problems there, but I just didn't find very many mouse projects,
at least written in C.

What I did find were examples written in Python. Many of these use TinyUSB under
the hood, and if they work, I'd have a known good to compare my work to and
could maybe figure out a solution on the C side.

## Round Two: The Pimoroni Explorer

By happy coincidence, I have a [Pimoroni
Explorer](https://shop.pimoroni.com/products/explorer?variant=42092697845843),
which is a RP2350-based unit with a screen and a few other niceties built in.
I've never quite managed to get it working with C and the Pico SDK, but it comes
with [Micropython](https://micropython.org/) preinstalled, so it seemed like the
right tool for the job.

### Micropython

I started working with the built-in Micropython installation, and figured out
enough to install packages and run test code in the
[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). This
was helpful in understanding some of the basics (like using the display), but their
TinyUSB stack doesn't even seem to have wrappers for the host code I need.

### Circuit Python

Some of the examples I'd seen were written for [Circuit
Python](https://circuitpython.org/), which has a USB stack that includes host
support, and has definitions and examples for dual-USB boards like the ones I
tend to use. They even had a [binary for the Pimoroni
Explorer](https://circuitpython.org/board/pimoroni_explorer2350/_), which I
installed.

Immediately, I liked it a lot better. Instead of a colourful and somewhat
childish menu system, the screen is a console.  Log messages issued in your code
display on the screen. The console also displays commands and results triggered
using the remote REPL tool.

This may seem small, but logging error messages is kind of a bugbear with USB
projects. A lot of the time you end up disabling communications with the board
via the device port, which means your only way to observe log messages is with
an external debugger physically wired up to the microcontroller. It's so
refreshing just to see the error and log messages.

The other thing I love is the REPL console itself. Since it's a scripted
environment, you can improve your understand in real time. Instead of writing
test code, compiling, installing it and observing the results, you can just
write the code you'd like to use on the console and see what happens, including
seeing error messages. Not bad.

### The First Working Mouse Example

So, within a few minutes, I had my mouse example working.It runs the pointer in
a circle using `sin` and `cos` functions, which doesn't sound exciting unless
you've been trying to make it work for a while.

<video controls alt="Mouse Jiggle demo" width="500">
<source src="/assets/movies/2026-03-21-mouse-jiggle.mp4">
</video>

### Adding a USB Host Port

With that I moved on to the next challenge. Dual-USB boards supported by Circuit
Python have definitions and convenience code, but since the Pimoroni Explorer
doesn't come with a host port, you have to wire something up yourself and then
figure out the software side.

I hooked up a USB A breakout board to the breadboard built into the Explorer.
The gamepad had power immediately, which was a good sign.

I drilled down into the [board definition for the Adafruit Feather RP2040 with
USB
Host](https://github.com/adafruit/circuitpython/blob/0dbd5e0974a4bae050248251f532b63f361e5177/ports/raspberrypi/boards/adafruit_feather_rp2040_usb_host/board.c#L32),
and from that, I figured out how to manually activate the host port, which
thankfully doesn't have to be run at a particular time in the board's lifecycle,
so you don't need to manage a "boot" routine in another file.

I started out using [this
module](https://github.com/relic-se/CircuitPython_USB_Host_Gamepad/tree/main),
but it was written for particular gamepads. I could use it with a Playstation 4
controller, but what I really want to learn is how to work with a controller
of my choosing.

So, I looked at more examples until I was able to come up with a basic approach
using the core USB modules and some Adafruit helper modules. I used these
to make a quick tool to print what was being read from the gamepad. I could see
which bytes were updated when I changed things, and used that to come up with a
strategy to parse the gamepad's state.

### The Battle Mouse

With that, I was finally able to create the Circuit Python version of the Battle
Mouse.  Here's the obligatory demo:


<iframe width="500" src="https://www.youtube.com/embed/M5QjmA9hbxE?si=bnYT_mdHBWqDziw5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### Off Piste Learning Adventures

So, with the gamepad, the whole setup is borderline usable, but of course I
wanted to take it further. I specifically wanted to use it with the Xbox
Adaptive Controller, which supports using standalone joysticks for thumbstick
input.

The first bit of learning here is that the Xbox Adaptive Controller (and
apparently Xbox One controllers in general) don't act like a normal USB HID
Gamepad. There are workarounds [like this
one](https://github.com/adafruit/circuitpython/issues/1696), but thankfully I
don't need to go that far just to try it.  The excellent [OGX
Mini](https://github.com/wiredopposite/OGX-Mini/) lets you make any controller
(including the Xbox Adaptive Controller) pretend to be another controller.

Long term, I can learn from their approach to supporting Xbox controllers. Short
term, I can just use OGX Mini to make the XAC pretend to be something I can work
with.

As part of this I learned that I can "chain" the OGX Mini, i.e. connect it to
the host port of my setup, and connect another controller to the OGX Mini. So, I
hooked up the XAC and big honking joysticks via the OGX Min, and updated my code
to work with it.

It was not usable enough to make for a good demo, mostly because one of the
sticks is really muddy, it can't reach the full range of values and "jitters"
off centre when not in use. I have so many joysticks at this point that I
probably need to raise my standards a bit and offer this one to the thrift
store.

But, I did at least come up with an approach to using the XAC in Circuit Python
projects.

## What's Next

Now that I know I can get the mouse working in Circuit Python, I plan to closely
compare the USB descriptors and their use of TinyUSB to what I've done in C.
Hopefully I'll figure out a way to get the C version working.

Once I get that done, I may make a slightly more serious gamepad to mouse
adapter. I may also work on learning enough of the Web USB API to configure and
send commands to a microcontroller.

Stay tuned for whatever's next.
---
layout: post
title: Pico Launchpad
date: '2025-10-01'
type: posts
share-img: /assets/img/2025-10-01-launchpad-pico-demo.jpeg
tags:
- projects
- MIDI
---

After working on other projects using dual-USB microcontrollers, I'm back
together with my long-time muse, the Novation Launchpad.

<!--more-->

One of the first things I tried when I wrote code for [my first dual-USB
board](https://www.adafruit.com/product/5723) was hooking it up to a [Novation
Launchpad](https://novationmusic.com/launchpad). My heart sank, as it wouldn't
even power on. I set that aside for a while and created the latest version of
[the "Cheatar"](/2025-09-23-pico-cheatar/).

I decided to dive back in afterward, and step by step chipped away at the
problems, until I ended up somewhere halfway decent.

## Power and Connectivity

I started trying to figure out the power. I overthought this part of the
process, hooking up a USB power monitor and making sure the Launchpad wasn't
drawing too much power for the host port. I needn't have worried, it never even
drew enough to show up on my tester (which means it was drawing less than 50
mA).

I was scratching my head until I decided to crib from someone else's homework
for a bit. I had a board lying around with [OGX
Mini](https://github.com/wiredopposite/OGX-Mini) on it, and sure enough, the
Launchpad powered on when connected to its host port.

Looking at the code, I learned that the Adafruit unit I was using doesn't turn
on power to the USB port by default. There's a GPIO pin you need to send a
signal to. This actually seems really useful, as you can add power save modes,
turn off the client device on a schedule, et cetera. It's slightly less useful
if you don't know the switch is there, but once I updated my startup function,
the Launchpad got the power it needed when connected to the microcontroller
running my code.

This led to the next hurdle, which was the "fireworks mode" that the Launchpad
displays when it has power but isn't connected to a host (for example, when the
computer is asleep but the USB hub still has power).

From here on out, I was bouncing between [the TinyUSB
source](https://github.com/hathach/tinyusb/tree/master/src), the [Pico PIO USB
source](https://github.com/sekigon-gonnoc/Pico-PIO-USB), and any examples I
could find, like [this
one](https://github.com/rppicomidi/usb_midi_host/tree/main/examples/C-code/usb_midi_host_pio_example).

Step by step, I chipped away at the things that didn't work. The Launchpad
started waking up and acknowledging that I was connecting to it. I initially
couldn't send messages to the host port at all, but found the settings I need in
the
[`usb_midi_host`](https://github.com/rppicomidi/usb_midi_host/tree/main/examples/C-code/usb_midi_host_pio_example)
project. I also found the buffer settings that initially limited me to only
updating about a third of the Launchpad.

Fixing things was mainly a process of copying things from a "known good"
solution and tweaking until I had just the settings I need, and then leaving
comments for myself and any other interested parties about what the settings
mean (or seem to mean).

If you want to see how I eventually got things working, you can see everything
[in the GitHub repository](https://github.com/duhrer/pico-launchpad).

## The End Result

I'm able to read inputs from Launchpads connected to both the "client" and
"host" USB ports on the microntroller, including simultaneously:

![Two Launchpad Pros, alike in temperament](/assets/img/2025-10-01-launchpad-pico-demo.jpeg)

On the client side, this requires a little bit of help, here's a screenshot of
how I connected everything using [`midiconn`](https://github.com/mfep/midiconn):

![Routing messages on the USB client side](/assets/img/2025-10-01-midiconn.png)

With everything set up, both Launchpads function as both controls and displays.
You can see a full side-by-side demo here on my YouTube channel:

<iframe width="560" height="315" src="https://www.youtube.com/embed/tSCAZtwRS0w?si=Vcv-c0JrA3EgXUip" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What's Next?

The Launchpad supports two ways of "painting" a UI. One is to send "note"
messages to the Launchpad that correspond to the pad (note) and colour
(velocity) you want to "paint". This is fine for simple interfaces, but slow and
bandwidth-intensive for complex animations.

The Launchpad also listens for [System Exclusive
messages](https://midi.org/midi-1-0-universal-system-exclusive-messages), which
are vendor-specific messages that act as a kind of API to configure a MIDI
device. "Sysex" messages are faster and require far less bandwidth. It's a big
deal for things like [the "Polar
Vortex"](https://www.youtube.com/watch?v=RiizjxTW95U) that really require sysex
messages to operate at speed.

Unfortunately, at this point I've only figured out how to get sysex working on
the "client" side, the same messages fail when sent to the "host" port. I'll
need to debug things on the host side, look for better examples, and talk with
other people working in the space to figure that bit out.

In the mean time, what I have now is already enough to revive a few older
projects, and to work on compatibility with other Launchpad models. Stay
tuned for whatever comes next, it should be a fun time, especially if you have a
Launchpad.

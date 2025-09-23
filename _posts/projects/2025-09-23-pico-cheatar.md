---
layout: post
title: Pico Cheatar
date: '2025-09-23'

share-img: /assets/img/2025-09-23-pico-cheatar.png

type: posts
tags:
- microcontrollers
- MIDI
---

I'm continuing to work with dual-USB pico boards, and used one to recreate my
earlier work on a "cheater's guitar".

<!--more-->

# The Cheater's Guitar

I grew up with a lot of guitar players. At family gatherings, lots of us would
sing, and a few people would play chords on their guitars. When I decided to try
this with my own family, I wanted to come up with something to make it easier
for my son and I to play chords without a guitar.

I have an [Oberheim Strummer](https://www.vintagesynth.com/oberheim/strummer)
that does something very similar, i.e. you plan a note on a MIDI controller and
it simulates strumming a chord. (You can see a demo of the Strummer [on my
YouTube channel](https://youtu.be/perScnpn3-M)).

Eventually, I designed one of my first "MIDI routers" to do something similar. I
called it the "cheater's guitar", or "cheatar".

## Version 1

The first version used a full Raspberry Pi, DAC, and touchscreen interface
running a browser with some WebMIDI code, stuffed into a laser-cut bamboo case.
You can see a [finger-picking demo on my YouTube
channel](https://youtu.be/g24gCQSUBa0?si=mGeRZ8tDdyM0Sx5d)

I eventually updated the touchscreen to control the guitar key and chord, and
added a mode where pressing a pad would play the corresponding "chord". Although
this was closer to the goal, the strum was very robotic, always the same speed
and direction.

## Version 2

After various attempts, I came up with [a second "nano"
version](https://youtu.be/TYpQYWC0JfE) that made better use of the Korg Nanopad.
I set up the X/Y pad as a kind of "strum". This was immediately a lot more
playable, and like a guitar, you play with one hand and pick the key/chords with
the other. It felt natural.

The first reason I didn't play with it much is that it tended to lock up one or
two strums in. The second and larger reason I didn't work on it for a while is
that I bought my first Novation Launchpad and that and its successors became my
focus for a few years, including [creating a giant guitar fretboard using three
launchpads](https://youtu.be/WYZlReSKe9Q?si=8gyUIXu4WoL1fQuk.)

## Version 3

Fast forward to this year. After [trying OGX Mini on a dual-USB pico
board](/2025-08-04-cutting-bait-ogx-mini-edition/) and [writing my first "MIDI
transformer" for the same type of board](/2025-09-08-pico-midi-transformer/), I
started looking at older projects to see which I could revive in a
microcontroller format.

I tried working with the [Novation
Launchpad](https://novationmusic.com/launchpad) first, but had to pause that as
I couldn't ever get a Launchpad to power on when connected to the host port of a
dual-USB pico. (More on that in a bit.)

While checking to see which of my MIDI controllers actually did work, I dug out
my Korg Nanopad 2, and saw that it worked. I immediately realised I could build
a new version of the cheatar.

After a few days reviewing guitar theory and doing some C programming, I came up
with an updated version that runs on a dual-USB Raspberry Pi Pico (or variants).
It's very similar to version 2, but is much much more stable. You can fast
strum, slow strum, strum in patterns, and it all sounds very natural. Here's a
quick demo I recorded on my YouTube channel:

<iframe width="560" height="315" src="https://www.youtube.com/embed/nZt5VKCov_M?si=RRwQINuW9cQFidZj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Thus far I've used it with the [Adafruit RP2040 with USB Type A
Host](https://www.adafruit.com/product/5723) and the [Waveshare RP2350 USB A
board](https://www.waveshare.com/wiki/RP2350-USB-A). I haven't tried it yet with
a standalone Pico and USB breakout, but based on my experiences with OGX Mini,
I'd expect it to "just work".

If you have a Pi Pico, Pico 2, or variant of either, you can get the code [from
the repository on GitHub](https://github.com/duhrer/pico-cheatar). The hardware
and software requirements as well as usage instructions are covered there.

## What's Next?

Although I'm hugely pleased with the work so far, I can see a couple of key
things I need to learn to make this project better and build other projects.

### A Little Light(s) Reading

The first thing I need to learn is a bit of
[PIO](https://www.raspberrypi.com/news/what-is-pio/). Both the Adafruit and
Waveshare units include a NeoPixel, which I'd like to use to give more feedback
about the status (which key, et cetera).

Unfortunately, the [library I use for NeoPixel work on the
Pico](https://github.com/martinkooij/pi-pico-adafruit-neopixels) is not well
maintained, and doesn't work in my current build environment. Although I could
probably go further down that hole and figure out why, the library hasn't been
maintained in four years, and seems like it's basically holding me back.

The demo code included on the [Waveshare
wiki](https://www.waveshare.com/wiki/RP2350-USB-A) just writes its own PIO code
to manage the light. Under the hood, the Adafruit Neopixel library ultimately
does the same. Although there will likely be a little learning curve, this
really seems like the way to go in the long term.

### USB Host Issues

Another big issue is that something is going on with these boards and their USB
host ports. I intermittently have to reset my USB hub in order to power the
board. I've also noticed that I can't power a second microcontroller off of the
USB host port, which prevents me from "chaining" units like guitar effects
pedals. I have a USB power monitor that will hopefully help me see if it's just
a power issue, in which case I'd need to make sure things also work with a
powered USB hub.

There are also some issues specific to the Novation Launchpad. Even with an
external power adapter, the Launchpad never recognises that it's connected to a
host. Perhaps there's something I need to do in one of the host callbacks to
convince it.

## Conclusion

Thanks for reading, and stay tuned for whatever's next.

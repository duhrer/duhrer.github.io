---
layout: post
title: MIDI Plasma Reactor
date: '2026-03-15'
type: posts
share-img: /assets/img/2026-03-15-teaser-image.png
tags:
- projects
- MIDI
- neopixel
---

In my [last project](2026-03-09-plasma-aurora/), I upgraded the lights in the
study to display an "aurora" on a curtain of Neopixel (WS2812B) lights. I ended
up with a leftover 10 meter string of neopixels, I combined those with a spare
[Pimoroni Plasma
2350](https://shop.pimoroni.com/products/plasma-2350?variant=42092628246611)
I had  to make another project in my office, which I call the MIDI Plasma Reactor.

<!-- more -->

## The Idea

Thus far, I've made a lot of MIDI projects for the Raspberry Pi Pico (and Pico
2). I use [TinyUSB](https://github.com/hathach/tinyusb) for the basics, and have
adapted [this person's excellent
work](https://github.com/rppicomidi/midi-multistream2usbdev) for more complex
setups.

I've also made quite a few [light projects using
Neopixels](https://duhrer.github.io/tags/#neopixel). I decided to combine these
ideas and make a curtain of neopixels that react to MIDI messages.

My son uses [Synthesia](https://synthesiagame.com/) to learn to play songs he
enjoys, the idea is that this would add complimentary background lighting. If
he's playing notes on the left side of the keyboard, lights on the left side of
the background should respond.

## The Implementation

I spent a few hours knocking up the code I needed, other than the occasional
math/casting goof, there was only one real facepalm. My last project used an
actual grid, in which the last light in the first row is followed by the first
light in the next row. As I was using a string of lights snaked back and forth,
I had to add logic to flip every other row.

It took at least as long to decide on the arrangement of lights and mount them,
in part because I wasn't willing to completely take apart my workspace to do it.
I spent a few hours reaching behind my setup to stick lights to the wall using
[Blu Tack](https://en.wikipedia.org/wiki/Blu_Tack), and then a bit more
adjusting it to fill the space better (the top row needs to sit above my monitor
for it to be visible while playing).

Anyway, after all that, I (halfway) cleaned up my desk and recorded a demo
video, which you can check out here:

<video controls alt="MIDI Plasma Reactor demo" width="500">
<source src="/assets/movies/2026-03-15 MIDI Plasma Reactor demo.mp4">
</video>

I'm pleased enough with it for now. I did notice some lag when hooking the
system up to a sequencer. This is probably down to the fact that the Adafruit
Neopixel library I'm using is not overly efficient. If I end up making a
successor to this project, or something that needs to operate at video
framerates, I'll probably need to switch to using DMA.

Thankfully I won't have to start from scratch. My friend shared [this approach
to using Neopixels with a Pico and
DMA](https://mcuoneclipse.com/2023/04/02/rp2040-with-pio-and-dma-to-address-ws2812b-leds/),
I also found a few other projects [like this
one](https://github.com/grughuhler/grug_ws2812b_dma) on GitHub.

## Conclusion

For now, the work to date seems fine for the number of notes and the speed at
which my son is likely to play, and the idle animation makes a nice fill light
for my workspace. If you'd like to make something like it, as usual the source
code is available [in a repository on
GitHub](https://github.com/duhrer/midi-plasma-reactor).

Stay tuned for whatever's next.
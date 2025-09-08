---
layout: post
title: Pico MIDI Transformer
date: '2025-09-08'

type: posts
tags:
- microcontrollers
- MIDI
---

After [my recent experience with OGX
Mini](/2025-08-04-cutting-bait-ogx-mini-edition/), I decided to try and make my
own dual-USB project.

<!--more-->

Over the years I've made [a lot of demos](/demos) involving MIDI devices. Lots
of them are what I call "transforming routers", that look at incoming MIDI
messages, and spit out different MIDI messages.

Sometimes the outputs generate a separate stream of MIDI messages to paint
lights on a device like the Novation Launchpad series. In essence these
messages make a lightshow and/or user interface on the MIDI controller. In
these setups, my "router" often passes the original notes through unchanged, so
that a downstream MIDI device can produce the actual sound.

Other times, the MIDI messages are generated to emulate a different kind of
instrument. For example, I've written a few versions of the ["cheater's
guitar"](https://github.com/duhrer/cheatar). The most recent version lets you
select a guitar key and chord using the keys on your MIDI controller, and
"strum" using the mod wheel.

I wrote another router that [emulates a Hurdy
Gurdy](https://github.com/duhrer/nano-gurdy), which is [a stringed
instrument](https://en.wikipedia.org/wiki/Hurdy-gurdy) that only plays when you
turn its crank. I treat the pitchbend on a MIDI controller as the "crank", when
that's active, "drone" notes play, along with whatever notes are held on the
controller.

I have ideas for new projects as well, but I was a little stuck. The stack I
used was pretty old, and required a web browser. If I were to redo it, I'd spend
a lot of time working with UI frameworks and would still have to dedicate a full
computer (or at least a full Raspberry Pi and display) to run my work.

Once I saw the [Adafruit Feather RP2040 with USB Type A
Host](https://www.adafruit.com/product/5723), and tried out the excellent [OGX
Mini project](https://github.com/wiredopposite/OGX-Mini), I realised I could
probably do what I wanted with the same family of microcontrollers I've been
using in my recent work. Instead of a full computer, USB hub, monitor, and
browser, I cam make little passthrough connectors, and can hopefully even
"chain" them like guitar effects pedals.

## Phase 1: USB MIDI Client

With my heart perhaps not quite as light as a feather, I started by creating a
new project and getting to work on the USB MIDI client. This will provide the
USB MIDI ports that will be visible on the computer the microcontroller is
connected to. I've used [TinyUSB](https://github.com/hathach/tinyusb)
previously, and it has relatively clear examples of doing this.

Once I got to where I started passing around MIDI messages, I had to remind
myself of a few things. I ended up reviewing both the MIDI standard, and
[`flocking-midi`](https://github.com/lichen-community-systems/flocking-midi), a
library I used a lot in previous work. Both were a big help in reminding myself
about the kind of bit-packing that goes into making MIDI ~~sausages~~ messages.

After a few hours of reading and a few minutes of coding, I had code that
exposed both a MIDI input and output from the same USB client device. I
realised pretty early on that I could use the same message routing on both the
USB client and host, so I went ahead and wrote and tested that.

It worked a lot like my old setups, i.e. you had to wire a few things together
using a MIDI pipe utility (I currently use
[`midiconn`](https://github.com/mfep/midiconn)). The big difference is that,
because [WebMIDI can't expose virtual
ports](https://github.com/WebAudio/web-midi-api/issues/45), I used to have to
set up external virtual MIDI ports to connect my work to, and then either make a
UI to manage which ports my work connected to, or set up rules to connect to a
named virtual port by default. I can now just connect a MIDI controller to my
work, and connect my work to a sound-producing device, which is already a huge
improvement.

## Phase 2: USB MIDI Host

The next step is to get USB Host support working. I read through a lot of
examples, but ended up spending the most time moving between [the Pico PIO
USB](https://github.com/sekigon-gonnoc/Pico-PIO-USB) library, [OGX
Mini](https://github.com/wiredopposite/OGX-Mini/tree/ea14d683adeea579228109d2f92a4465fb76974d),
and [the dual-headed examples included with
TinyUSB](https://github.com/hathach/tinyusb/tree/master/examples/dual).

After shoving my way through a storm of compile-time errors, I finally had my
key breakthrough. Looking at the Pico PIO USB codebase, I figured out that the
TinyUSB stack included with the Pico SDK was too old to include the MIDI USB
host code I needed. I was already debating using [`git`
submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to represent my
external dependencies, and this was a key reason to do this rather than relying
on the Pico SDK by itself.

Thankfully the Pico SDK supports redefining the paths for the PIO and TinyUSB
libraries, so I added those as submodules and pointed my build at those. The
compile errors went away, but the client device wouldn't power on.

I looked at OGX Mini code base and figured out how to redefine the USB
communication and power pins for the PIO library. Suddenly, a MIDI controller
connected to the secondary USB port powered on (I issued a string of happy
expletives at this point). However, no messages are coming through from the
controller.

As excited as I am to plow forward, I decided to take a minute to stop and
document my work and commit what I have.

## What's Next?

The next step will be to connect a debugger to the microcontroller and figure
out what's actually happening on the USB host side. Thankfully, the Adafruit
feather includes a standard debugging connector, so hopefully I'll have
everything working together soon enough.

In the meantime, I [put up my work to date on
GitHub](https://github.com/duhrer/pico-midi-transformer), because even "just"
with the USB client side, it's already pretty useful.

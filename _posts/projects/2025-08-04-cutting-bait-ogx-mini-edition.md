---
layout: post
title: Cutting Bait, OGX Mini Edition
date: '2025-08-04'

type: posts
tags:
- cutting bait
- microcontrollers
- gamepads
---

I have been looking for a solution to move a few projects forward, and got some
great leads this week.

<!--more-->

At our weekly social at [the hacker space I belong
to](https://wiki.techinc.nl/Technologia_Incognita), I mentioned that I had a few
projects where I needed two USB ports connected to a single microcontroller. The
first response was something along the lines of "why would you even want to do
that?". I had a few examples to hand.

I explained the concept of a MIDI router, which takes an input from a MIDI
controller and sends it to another MIDI device, often in a very different form.
A [simple (and silly) example I wrote](https://github.com/duhrer/midi-rtl)
mirrors every note played around middle C, so for example, pressing the F above
middle C plays the G below middle C. This preserves the distance between the
notes, so chords are still chords, but it otherwise completely changes the
sound. I've also written slightly more serious routers to make a keyboard play
like a guitar or like a [hurdy
gurdy](https://youtu.be/bvNZeh6f8vE?si=DuGnmlgimu_tvSGJ).

I then explained about remapping gamepad input to act like a keyboard, as I've
done with the [Gamepad
Navigator](https://chromewebstore.google.com/detail/egilmijcknfacjjbchcacijkknbkgfnd?utm_source=item-share-cb),
a Chrome extension that lets users control their browser using a gamepad.

## Exhibit A: Not a Typewriter

When I finished giving a few examples, the person I was talking with thought for
a minute, and then pointed out [the "Not a Typewriter" project from
Adafruit](https://learn.adafruit.com/not-a-typewriter). It's a device that sits
between a computer and a keyboard, and adds typewriter-like functionality,
making "clicky" sounds when you hit a key and ringing a bell when you hit the
"enter" or "tab" keys.

Although I like the project on its own, what really excited me was the [Adafruit
Feather RP2040 with USB Type A Host](https://www.adafruit.com/product/5723) they
used for the build. I mean, I know that I could add a second USB port to any
Pico myself, but what I love is that it's integrated and that there are really
useful working examples, and not just [the sample "dual host" code included with
the TinyUSB
codebase](https://github.com/hathach/tinyusb/tree/86ad6e56c1700e85f1c5678607a762cfe3aa2f47/examples/dual).
## Exhibit B: OGX Mini

Case in point, once I started looking into the Adafruit unit, I quickly
encountered the [OGX Mini](https://github.com/wiredopposite/OGX-Mini) project,
which lets you connect a gamepad to one port and the other port to your computer
or console. For example, you can connect an Xbox Controller like the [Xbox
Adaptive Controller](https://en.wikipedia.org/wiki/Xbox_Adaptive_Controller) to
the Nintendo Switch.

I did exactly this a few years ago before my son was able to use a gamepad on
his own. I created an oversized rig using the Xbox Adaptive Controller and
[Logitech Adaptive Gaming
Kit](https://www.logitechg.com/en-us/products/gamepads/adaptive-gaming-kit-accessories.html).
I then connected it to the Nintendo Switch so that he could play Mario Kart.

There are commercial solutions to do this, such as the [Mayflash Magic
NS](https://www.mayflash.com/product/magic_ns_usb_wireless_controller_adapter.html),
[8BitDo USB Wireless Adapter](https://www.8bitdo.com/usb-wireless-adapter-2/),
and the [Cronus Max](https://www.cronusmax.com/). The fact that you can now do
most of the same things using an open source device costing less than 20 euros
is great.

## Relax Your Eyes Until You See [the Hidden Picture](https://en.wikipedia.org/wiki/Autostereogram)

So, although both projects are neat, what really struck me was the potential
once you set aside the specifics of what types of devices each project works
with. The same kind of approach can work with gamepads, MIDI devices, keyboards
and mice, and can translate between any combination of these.

This kind of functionality is exactly what I've been looking for to help me move
forward with a few different projects. If I can build on the approach these
projects used, I can make something fast, platform independent, and no more
difficult to operate than a USB adapter or extension cable.
## Building A Burgling Familiarity

So, before I start my own project, I want to get to know OGX-Mini better, as
it's very close to what I have in mind, and doesn't require anything more than
the Adafruit unit.

I picked out a random controller from my literal pile (a DualSense), and got
started. First, I made sure the gamepad was working using an [online gamepad
tester](https://hardwaretester.com/gamepad). Side note: this is how I discovered
that the X/Y pad on the DualSense [now acts as a mouse in
Linux](https://www.spinics.net/lists/linux-input/msg70842.html).

I cloned the source of OGX-Mini, and followed their build instructions to
generate a binary for my hardware (I started with the Adafruit Feather I
mentioned earlier). I installed the binary onto the feather.

I immediately saw a new Xbox Controller in the list of devices in the gamepad
tester. Having read the documentation, I knew that this was the default
behaviour to be expected. Success!

I then hooked up my gamepad. As promised on the tin, my DualSense showed up as
an original Xbox controller, all controls working as expected. By holding
particular key combinations for three seconds, I was able to configure the OGX
Mini to appear as different controllers. I did notice that emulating a PS3
controller triggered constant vibration in the DualSense, but as I have no
interest in using it with a PS3, it's fine?

I wanted to try their configuration utility, but at least on Linux it didn't
work (it was never possible to select the device to configure).  I'll have to
give it a try the next time I reboot into Windows.

## Digging Just a Little Deeper

Once I was satisfied that my controller worked with their setup, I wanted to try
a few other things:

1. Wiring up a USB connector to units other than the Adafruit RP2040 USB Host
   Feather.
2. Trying out support for Bluetooth.

The OGX repository includes a wiring diagram covering for various Pico variants,
and I used that to add a USB port to various pico variants I had lying around. I
was able to rebuild for various Pico and Pico 2 boards.

Unfortunately, building for a board that supports Bluetooth didn't work out for
me. Although I could get the base Pico and Pico 2 builds to work on the same
hardware, the Pico W and Pico 2W builds wouldn't do anything for me on the
wireless boards I have (a Pico WH and a Pimoroni Pico Plus 2W).

Bluetooth support is relatively new, so for now I'll wait, as Bluetooth was more
something I was curious about than something I need for my own projects.

## Where Do We Go Now?

As I suggested in the intro, I have a couple of key projects in mind.

Over the years, I've built [quite a few MIDI
routers](https://duhrer.github.io/demos/) that would work well in this kind of
setup, and it would be fun to get those working again in a way I can more easily
share. At the moment I need a browser page, hosted somewhere, and you have to
load that page and select the right inputs and outputs onscreen. A standalone
device like this could detect any connected MIDI devices and route them through
to a named input that can be used not just in a web browser, but in any program
that supports MIDI.

I can also make a hardware version of the [Gamepad
Navigator](https://chromewebstore.google.com/detail/egilmijcknfacjjbchcacijkknbkgfnd?utm_source=item-share-cb)
that would let users have full mouse and keyboard control with their gamepad.
This would work around some of the thorny issues I've encountered using
JavaScript to simulate mouse and keyboard input. It would also work when the
browser isn't loaded or doesn't have focus, which is one of the biggest
drawbacks of the current approach.

Anyway, I'm very excited about the range of projects unlocked by these two
working examples, and hope to be able to share more work along these lines soon.
Stay tuned.

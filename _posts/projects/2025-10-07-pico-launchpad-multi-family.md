---
layout: post
title: Pico Launchpad Multi-Family
date: '2025-10-01'
type: posts
share-img: /assets/img/2025-10-01-launchpad-pico-demo.jpeg
tags:
- projects
---

I updated my work on the Pico Launchpad to support a wider range of devices.

<!--more-->

Last week, I published a new project called the [Pico
Launchpad](/2025-10-01-pico-launchpad/), which was my first attempt to set up a
microcontroller to work with the Novation Launchpad. I started out working with
the Launchpad Pro MK2, which has been my go-to for years.

Before I actually make any instruments, I wanted to take the time to come up
with a clear way to support multiple versions of the Launchpad. So this week I
updated my code to add that, and I wanted to share a few things I learned.

## TinyUSB

To make this work, I spent a lot of time looking at [the TinyUSB MIDI
code](https://github.com/hathach/tinyusb/tree/master/src/class/midi) as well as
[their MIDI examples](https://github.com/hathach/tinyusb/tree/master/examples).
One thing I had been missing to date is a more complete picture of the supported
preprocessor directives that you use to configure TinyUSB. This time around, I
carefully studied [this file in their
repo](https://github.com/hathach/tinyusb/blob/master/src/tusb_option.h) that
contains the core directives. I also read through the MIDI-specific directives
[scattered throughout this
directory](https://github.com/hathach/tinyusb/tree/7a96291bf1fc88b7bacd387f1b236fa89470045f/src/class/midi).

With that information, I was able to better understand the available options and
their defaults, which helped me pare down my own [`tusb_config.h`
file](https://github.com/duhrer/pico-launchpad/blob/main/src/tusb_config.h).
Although there are a lot of options to talk about, this time I had to learn
about the transmit buffer sizes in particular, as in:

```
#define CFG_TUD_MIDI_TX_BUFSIZE     1024
#define CFG_TUH_MIDI_TX_BUFSIZE     1024
```

When you're transmitting 3-byte note messages, you can get away with a much
smaller buffer. When you're sending sysex messages, you might be passing 300
byte messages to multiple devices. There are settings for the receiver buffers
as well, but I didn't end up needing to make any adjustments there. I did also
try keeping the buffer size low and flushing the write buffer more often, but in
my experience this didn't turn out to be as stable.

## MIDI MUX: Beyond TinyUSB

Any USB MIDI device provides at least two virtual ports, one for "input", and
one for "output". TinyUSB does this as well, which is fine when you're happy
using the same port to communicate with all devices. In my case, I have to use
very different schemes depending on the device, and since sysex messages aren't
sent to a particular channel, I can't use that to distinguish which type of
device an update is meant for.

When looking for "prior art", I stumbled across [the `midi-multistream2usbdv`
project](https://github.com/rppicomidi/midi-multistream2usbdev), which provided
a clear example of setting up more than two virtual ports. Their project uses 2
inputs and 6 outputs, I was able to adapt that work to expose 3 inputs and 3
outputs, so that each "generation" of Launchpad could connect to ports that were
meant to deal with its layout and send messages to "paint" it appropriately.

## The End Result

Although there are caveats, I did manage to get things working well enough to
drive four Launchpads simultaneously:

![Four launchpads driven by the same microcontroller.](/assets/img/2025-10-07-four-launchpads.jpeg)

Here's how my `midiconn` setup looked when I got all three families working at once:

![My new favourite game, MIDI Metro](/assets/img/2025-10-07-connection-map.png)

If you'd like to see it in action, there's a demo on my YouTube Channel:

<iframe width="560" height="315" src="https://www.youtube.com/embed/VghTTx1BxYc?si=QQRV3t2_EFiDB4NN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What's Next?

I have a laundry list of things to improve with the project. Most importantly, I
still need to figure out why I can't send sysex messages to a device connected
to a USB "host" port. This is the biggest remaining sticking point before I can
just start cranking out new versions of old projects for the Launchpad (and
hopefully new projects as well). Don't hold your breath, that's likely to take a
while to figure out, as I'll probably have to redo my dev stack to better
support debugging.

For now, I'll probably take a small break from the Launchpad and make a few more
simple projects that are just
["transformers"](https://duhrer.github.io/2025-09-08-pico-midi-transformer/). I
was looking through my old demos and realised [my previous work with microtonal
tunings](https://github.com/duhrer/flocking-midi-microtoner) would be pretty
easy to implement on a microcontroller.

Stay tuned!
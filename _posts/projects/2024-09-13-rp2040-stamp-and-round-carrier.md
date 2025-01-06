---
layout: post
title: RP2040 Stamp and Round Carrier
date: '2024-09-13'
type: posts
tags:
- projects
- microcontrollers
- neopixel
---

I was talking with a friend and learned about Solder Party's [RP2040
Stamp](https://www.solder.party/docs/rp2040-stamp/). I was especially intrigued
by [their "round
carrier"](https://www.solder.party/docs/rp2040-stamp/round-carrier/), which was
the first "breakout" board I could actually see using unaltered in a bunch of
projects, as it has USB-C and a LiPo battery connector onboard, plus a really
nifty ring of neopixels. It's a great size for tiny light shows, which are
definitely a thing we do a lot in the winter.

Anyway, here's my initial experience with installing demos from the
[pico-examples repository](https://github.com/raspberrypi/pico-examples) on a
RP2040 Stamp and Round Carrier.

When it arrived, the stamp had the MicroPython firmware installed. I was able to
reset it by pressing the reset button on the stamp twice. Then the "RPI-RP2"
drive showed up, and I could just copy a UF2 file onto that.

The problem is that the examples (and my own projects) don't include support for
resetting by pressing the `reset` button twice. As soon as I installed any
example, I lost the ability to reset for the next upload.

To reset the stamp, I had to connect the `bootsel` pin to ground, and then at
the same time hit the `reset` button on the stamp. I did this by holding
alligator clips on one side of the board and pressing `reset` on the other side.
After working with the
[picoprobe](https://www.raspberrypi.com/products/debug-probe/), I'm kind of
spoiled, this was a bit fiddlier than I was hoping for.

Sadly, none of the other carriers offered by Solder Party expose a button to
ground `bootsel`. My plan is to make a breadboard rig with a button to do that,
and also one that exposes the pins to connect a picoprobe.

Because the stamp exposes pins on four sides, you can only really hook up two
parallel sides on a standard breadboard. If you hook up all four, two sides of
the stamp will have all pins connected to each other. Long term I'd love to find
or make a setup with four breakout boards surrounding a
[flexypin](https://www.solder.party/docs/flexypin/) holder, which would give me
access to everything.

For now, given that all the pins I want are on the same side, I can hopefully
just put down headers that straddle a normal breadboard and drop the stamp onto
that. (I got the idea for this from a [YouTube video covering using the RP2040
stamp with Hopper](https://www.youtube.com/watch?v=voSTAyO1teM&t=407s)). I can
connect the headers on the other side to the breadboard as well, which will give
me easy access to GPIO pins 10-19.

Given that the round carriers are super cheap and I'll probably use a bunch of
them, I may just modify one round carrier to add SWD connections, and use that
unit for initial development. I may do that once I've confirmed that I can use
SWD on a breadboard setup.

Anyway, that's my initial experience working with the stamp and round carrier.
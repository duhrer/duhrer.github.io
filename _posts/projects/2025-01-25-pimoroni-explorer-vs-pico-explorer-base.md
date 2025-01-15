---
layout: post
title: Pimoroni Explorer vs. Pico Explorer Base
date: '2025-01-15'
type: posts
tags:
- projects
- microcontrollers
---

I've used the Pico Explorer Base for a while, and finally have spent enough time
with the Pimoroni Explorer to make a fair comparison.

<!--more-->

## The Pico Explorer Base

I got a [Pimoroni Pico Explorer Base](https://shop.pimoroni.com/products/pico-explorer-base?variant=32369514315859)
a while ago, and I really like it for a few key things:

1. Breadboarding initial ideas before breaking out a soldering iron.
2. Debugging with a [picoprobe](https://www.raspberrypi.com/products/debug-probe/)
   (there are female pins to plug the debugger into).
3. It has a built in display and buttons.
4. Pimoroni provides [a good library for developing for the Pico Explorer Base using c++](https://github.com/pimoroni/pimoroni-pico).

In short, for me it's a good environment to sketch new ideas before I'm ready to
commit to soldering and mounting everything. I also really like that you can
swap out the core chip, which means you can easily try newer chips with the same
pinouts (more on that in a bit). The two things I don't like:

1. You have to solder headers onto your chip to use it with the base.
2. Like the original Pico, it uses USB Micro.

## The Pimoroni Explorer

Fast forward to the end of last year, when products based on the [RP2350
chip](https://www.raspberrypi.com/products/rp2350/) started coming out. I was
very excited about the possibility of doing more real-time audio and video
processing thanks to the new floating point processor, and preordered the
[Pimoroni Explorer](https://shop.pimoroni.com/search?q=explorer) as soon as it
was announced.

My unit arrived late last year, and I've spent enough time with it to get a
sense of what I like and don't like. The things I like:

1. It has an RP2350 chip.
2. It has a larger screen.
3. It uses USB C.
4. It has six user buttons instead of four.
5. It has a better speaker.

However, there are a few key things I don't like:

1. As I'm writing this, Pimoroni's pico c++ library doesn't include support for the Pimoroni Explorer.
2. The board doesn't include wireless support.
3. You can't swap out the core of the unit with a new Pico 2 or compatible chip.

Some of these are show stoppers for my work with c++. I'm not ready to write my
own definitions for the board and figure out all the SPI settings that were just
taken care of in the c++ library for the Pico Explorer Base. I also don't like
being stuck without wireless and not being able to try out newer units, units
with wireless, units with more memory, et cetera.

In short, I don't see myself using this as my daily driver like I did with the
Pico Explorer Base. Instead, I see it mainly as a place to play with
MicroPython, as the support for the unit is good, and it's easy to use (and
debug) using tools like [Thonny](https://thonny.org/).

## Final Thoughts

As the Pico and Pico 2 have the same header pin layout, I plan to try a Pico 2
with the old Pico Explorer Base just to see. With luck I'll be able to keep
using it, we'll see...
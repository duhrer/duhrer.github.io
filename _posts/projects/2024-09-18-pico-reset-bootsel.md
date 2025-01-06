---
layout: post
title: Entering "Bootsel" model on a Pi Pico Using the Reset Button
date: '2024-09-18'
type: posts
tags:
- projects
- microcontrollers
---

When you want to deploy something new (or a new version of something) to a Pi Pico or 2040 Stamp, you need a way to put the device in `bootsel` mode, which will allow you to copy a new firmware image onto the device.

The Round Stamp Carrier I've been using a lot lately lacks a `bootsel` button. To manually reset the unit, I had to use alligator clips to bridge the `bootsel` pin to ground, and simultaneously hit the onboard `reset` button. This was pretty fiddly and often took a few tries to do right.

I wanted a way to do this in software without adding any new buttons. Firmware images like MicroPython support hitting the built-in `reset` button twice to enter `bootsel` mode. I did some searching to figure out how they did this, and it turns out it's simple.

The Pico SDK, includes [this comment](https://github.com/raspberrypi/pico-sdk/blob/6500c59d704ed2bb26d44b2a0ac7151d35287fdb/src/rp2_common/pico_bootsel_via_double_reset/pico_bootsel_via_double_reset.c#L32,), which suggests that all you need to do is link a particular library. Looking at [the `CMakeLists.txt` file in that directory](https://github.com/raspberrypi/pico-sdk/blob/develop/src/rp2_common/pico_bootsel_via_double_reset/CMakeLists.txt), we see that the library is available under the name `pico_bootsel_via_double_reset`. 

We can add this to our linked libraries in our own `CMakeLists.txt` file, so that we have a block that looks something like:


```
target_link_libraries(
    ${NAME}
    pico_stdlib
    pico_neopixel
    pico_bootsel_via_double_reset
)
```

This example is for a project where I've set a variable `NAME` for the name of the project/binary. Once I added the last entry, recompiled, and performed one last manual install, my firmware now includes support for double-tapping the `reset` button to enter `bootsel` mode.

If you're looking for remote options,  there are a few. I have a picoprobe, if you connect that to the SWD pins on the chip, you can reset (and install new firmware) using `openocd`.

There are also several methods for entering `bootsel` mode by connecting to the device over USB, which you can read about [in this forum post](https://forums.raspberrypi.com/viewtopic.php?t=336083).

If you're iterating on your firmware design and looking for easy ways to reset, I hope this was helpful.
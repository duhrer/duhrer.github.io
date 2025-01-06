---
layout: post
title: Pimoroni Plasma Lightshow
date: '2024-12-19'

type: posts
tags:
- projects
- microcontrollers
- neopixel
---

As an early Christmas present, I got the
[Pimoroni Plasma Starter Kit](https://shop.pimoroni.com/products/plasma-2350?variant=42092628279379)
to spruce up our guest room. The kit includes a Pimoroni Plasma 2350, which is
a RP2350 board purpose-built to drive NeoPixel lights.

In past work with NeoPixels, I've noticed that they struggle when powered off of
3.7 Volt Lithium Polymer batteries. As [the Adafruit
guide](https://learn.adafruit.com/adafruit-neopixel-uberguide/powering-neopixels)
explains, NeoPixels can dim or display the wrong colour if the voltage is too
low. The Plasma 2350 unit includes a voltage converter to ensure that the lights
can draw the full 5 Volts they require. It also includes a ten metre string of
individually addressable lights, each in its own star diffuser.

## The Code

I adapted some previous code I had used to create a lightshow. The string of
lights is treated as a ring, and has three bands of red, green, and blue lights.
Each band displays its colour at its strongest in the centre, and fades the
colour level as we near the outside of the band.

As there are a whopping 66 lights in the kit, I set the bands to be quite wide,
33 "pixels". (The bands must always be an odd number of "pixels" wide so that
the same number of "pixels" are on each side of the centre.) So at the start,
red is centred at 0, and paints pixels 0-16 and 50-65. Green is centred at
22 and paints pixels 6-38. Blue is centred at 44 and paints pixels 28-60. Where
the bands overlap, the colors mix, so at the start, each colour is on its own
for 11 pixels and mixes with its neighbors for 11 pixels on each side.

The bands move in the same direction, and at different speeds, so the amount
of overlap changes, occasionally resulting in areas where three colours overlap
(white) and unlit areas.

A key thing I learned here was how to compile for the RP2350 chipset instead of
the RP2040 units I've been using up until now. Most of my projects expect you to
enter a `build` directory and generate the project build system using a command
like:

`cmake ..`

As there's also an older Pimoroni Plasma unit that uses an RP2040, eventually I
want to add something to my `CMakeLists.txt` to generate binaries for both
RP2040 and RP2350 boards. For now, I compile for the RP350 by adding the board
to the arguments to `cmake`, as in:

`cmake -DPICO_BOARD=pimoroni_plasma2350 ..`

If you're using a different board, you can see the full list of boards the Pico
SDK supports [in their GitHub
repository](https://github.com/raspberrypi/pico-sdk/tree/master/src/boards/include/boards).

I've put the code up in [a small repository on my GitHub](https://github.com/duhrer/pimoroni-plasma-rainbow) if you have a unit and
want to try it out.

## Installing the Lights

Once I confirmed the code was working, I mounted the lights on the underside of
the lofted area in our guest bedroom, which is my wife's office. I ended up
being able to cover the space fairly well. The net effect is very nice for the
amount of effort, as you can see here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/s6Uyos-bfrg?si=oKfr_VjVta4GC_sq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

It's powered off of a spare 8000 mAh battery pack I had lying around. I didn't
want to have to run an extension cord or power strip to the area just for this
project. Based on [the NeoPixel power guide Adafruit
provides](https://learn.adafruit.com/adafruit-neopixel-uberguide/powering-neopixels),
the unit should be able to provide six and a half hours of usage, and thus far
that seems to match my experience.

## Next Version?

If I work on this again, I may set up an infrared receiver so that it can be
controlled using the same inexpensive remotes as the rest of our mood lighting.
This wouldn't be hard, as I've already done this on another project.

As mentioned above, I'd also like to generate binaries in one go for both the
RP2040 and RP2035 versions of the board.

## Conclusion

Anyway, that was my quick pre-Christmas project this year, hope you enjoyed
reading about it.
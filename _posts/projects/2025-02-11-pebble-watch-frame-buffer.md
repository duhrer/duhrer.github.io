---
layout: post
title: Pebble Watch Face, Frame Buffer Version
date: '2025-02-11'

type: posts
tags:
- projects
---

I updated my Pebble watch face to use a frame buffer.

<!--more-->

## Introduction

I'm (still) learning to build watch faces for Pebble. In round one, [I tried in
Javascript](/2025-02-03-first-pebble-watch-face/), and ended up with the janky
version show here:

 <video width="284" controls alt="The javascript watch face running in an emulator.">
  <source src="/assets//movies/2025-02-03-watchface-in-pebble-emulator.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

In [my second attempt](/2025-02-07-pebble-watch-face-with-a-capital-c/), I wrote
a new, less janky version, this time in C:

<video width="730" loop controls alt="The new watch face, side by side with its inspiration.">
<source src="/assets/movies/2025-02-07-watchface-comparison.mp4">
</video>

Although that video doesn't show it, there was a key problem. The second hand
should invert part of a digit as it passes through this (in the video, you can
see how cleanly the original handles this). The old version drew everything in
layers, so the second hand looked like it was partially erasing a letter until
it got halfway through it, and then the letter would invert. It was readable,
but jerky.

For this version, I rewrote my code to use a [frame
buffer](https://developer.rebble.io/developer.pebble.com/guides/graphics-and-animations/framebuffer-graphics/index.html)
instead of [drawing
primitives](https://developer.rebble.io/developer.pebble.com/docs/c/Graphics/index.html)
in layers.

## The Cotangent of Darkness

With a frame buffer, the Pebble SDK documentation suggests reading and
processing one line of the image at a time. To do this, I would need to come up
with an understanding of where the `x` position of the second hand was on each
row (`y` position).

Simple trigonometric functions are very good for things like this, as the `x`
and `y` axes are already two bits of a right triangle. If you were just drawing
the end of the second hand, you might use the `cos` and `sin` of its angle
multiplied by the length of the second hand to determine the `x` and `y`
positions.

In this case, I already know the `y` position for the line I'm processing, so I
need something that can provide the `x` value for a given `y` value, i.e. the
[cotangent](https://en.wikipedia.org/wiki/Trigonometric_functions#Right-angled_triangle_definitions).

I tried using C's `math.h` directly for this, but wasn't successful.  It may
have been down to the wild values you get as you approach each of the cardinal
points (where the cotangent is either `0/1`, or worse, `1/0`). In any case, as I
realised I only needed a total of 60 values, so I ended up making a lookup table
with safe (i.e. zeroed) values for the cardinal points.

With this table, I could determine how far the second hand was from the
midpoint of the watch face in each "row", and choose whether to "invert" the
colour in each pixel depending on whether the pixel is "inside" or "outside" of
the shape the second hand leaves behind it.

## ARGB, eh?

To invert the colours, I needed to understand the colours. The Pebble went
through a few revisions. Early screens were black and white, and they used 1 bit
per pixel to deal with image data. Later screens (like the one on the Pebble
Time I have) are in colour. These use 8 bits per pixel, with two bits for the
alpha level, two for red, two for blue, and two for green.

Thanks to examples [like this "effects" layer
library](https://github.com/ygalanter/pebble-effect-layer) and [the Pebble C
SDK's frame buffer
documentation](https://developer.rebble.io/developer.pebble.com/guides/graphics-and-animations/framebuffer-graphics/index.html),
I was able to come up with the simple logic I needed to read the existing value,
invert it, and update the frame buffer with the new value.

## The Least Janky Version (So Far)

So, the third version has a second hand that moves around, and all the content
in its wake is cleanly inverted. You can see the results here:

<video width="284" loop controls alt="The third version of the watch face.">
<source src="/assets/movies/2025-02-11-watchface-in-pebble-emulator.mp4">
</video>

With the logic I have, I either completely invert a pixel, or leave it alone.
The plus side of this approach is that if I add additional content like a step
count or battery level, it'll also be inverted correctly as the second hand
moves, including when the second hand is bisecting the content.

A slight downside is that there's no antialiasing, and the second hand looks
fairly jagged on the emulator. It's not really noticeable when running on an
actual Pebble, so I'm willing to live with it.  It's actually nice enough that
I'm using it daily, as it's very readable.

Anyway, if you want to check out the code or try it out, [it's in a repository
on GitHub](https://github.com/duhrer/pebble-vertin-c).

## What's Next?

### Small Improvements?

If I pick this up again, I'll probably convert the text of the face back into a
font rather than bitmapped images. I have to do this before I can add colours,
as I only have black and white images at the moment, and I suspect that with
multiple colour schemes, it'll end up being more efficient to use a font anyway.

Once I can support colours, I also need to find a way to change them, either
through a configuration option, or perhaps when the user presses the "back"
button on the left side (this usually just activates the backlight when the
watch face is displayed).

I may also polish the watch face enough to publish [on their app store](https://apps.rebble.io/en_US/watchfaces), we'll see.

### Something Else?

Next week I'll be taking a break for my son's school holidays, so I may feel
like doing something totally different when I get back.

I mean, I really have enjoyed developing for the Pebble.  It's a lightweight
platform, with a few abstractions ((check out their blog if you're
curious)[https://ericmigi.com/blog/how-to-help-build-open-source-pebble-software]).
The key for me is that they leave enough low-level access that it doesn't feel
like I'm stepping too far away from the Pico, I feel like I can apply what I'm
learning there.   For example, I could see adapting the drawing logic from this
project for something like the [Pimoroni
Presto](https://shop.pimoroni.com/products/presto?variant=54894104019323).

But the Pebble is what it is, and doesn't lend itself to the same range of
projects, for example that [infinity
mirror](https://en.wikipedia.org/wiki/Infinity_mirror) I've been meaning to
build.

Anyway, stay tuned!
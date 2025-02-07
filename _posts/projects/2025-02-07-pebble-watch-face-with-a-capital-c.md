---
layout: post
title: Pebble Watch Face with a Capital "C"
date: '2025-02-07'

type: posts
tags:
- projects
---

I wrote a new version of my sample Pebble watch face, this time in C.

<!--more-->

## Introduction

In [my last blog post](/2025-02-03-first-pebble-watch-face/), I covered my
attempt at writing a clone of my favourite Android Wear watch face.  This week I
moved on to using the C SDK instead, and the results are not perfect, but much
better.

## A Slow Journey through All the Docs

I started working through [the C SDK
tutorial](https://developer.rebble.io/developer.pebble.com/tutorials/watchface-tutorial/part1/index.html)
on the Rebble mirror of the old Pebble developer site.  This was somewhat
helpful, but simplistic, as it mainly layered square bitmaps and text.

Over the course of a few days, I worked my way through [the developer
documentation](https://developer.rebble.io/developer.pebble.com/docs/index.html)
and [a repository with a bunch of examples I found on
GitHub](https://github.com/pebble/pebble-sdk-examples/).

The key magic for me was discovered how to create my own layer and then draw in
it using primitives.  Here's a snippet of code:

```
  cutpie_layer = layer_create(bounds);

  layer_set_update_proc(cutpie_layer, update_pie);
  layer_add_child(window_layer, cutpie_layer);

  layer_mark_dirty(cutpie_layer);

  tick_timer_service_subscribe(SECOND_UNIT, tick_handler);
```

The "cut pie" in my case is the wedge of inverted colour that represents the
seconds that have elapsed in the current minute.  The `update_pie` function has
access to [the graphical
context](https://developer.rebble.io/developer.pebble.com/docs/c/Graphics/Graphics_Context/index.html),
which is probably what they used to imitate the HTML Canvas in Rocky.js.
Thankfully, you can access a few more functions on the C side.  The `update_pie`
function is called whenever the layer is marked as "dirty", which I do as part
of the window load to ensure that something is drawn on startup.  I also
registered a `tick_handler` function that flags the layer as "dirty" every
second (since I'm displaying a second hand and need to update that often).

For the text, I started out using text layers, but wasn't overly happy with the
compositing options and also didn't want to have to import/convert a large
enough font to file the screen.  I figured if I made my own images, I would
[have more options for compositing
them](https://developer.rebble.io/developer.pebble.com/docs/c/Graphics/Graphics_Types/index.html#GCompOp).

Sadly, this was not the case, it seems like the compositing functions work
differently on colour displays, and don't support the same kind of bitmasking
operations.  I ended up drawing everything in layers instead.  In order, I draw:

1. The background colour.
2. The "positive" text representing the time. 
3. The "cut pie" representing the elapsed seconds in the current minute.  I used
   their `graphics_fill_radial` function for this.
4. The "negative" text representing the portions of the time that should be
   inverted to show up with the "cut pie" as a background.

The results are an improvement over the Javascript version, here's a screenshot from the emulator:

![A screenshot of the finished watch face](/assets/img/2025-02-07-vertin-c-screenshot.png)

The last step was [installing the watch face on my
Pebble](https://developer.rebble.io/developer.pebble.com/guides/tools-and-resources/pebble-tool/index.html).
You can see my work side by side with the original here:

<video width="730" loop controls alt="The new watch face, side by side with its inspiration.">
<source src="/assets/movies/2025-02-07-watchface-comparison.mp4">
</video>

I'm pretty happy with it, especially compared to the janky Javascript version.
If you want more details (or to try it yourself), the code is [in a repository
on GitHub](https://github.com/duhrer/pebble-vertin-c).

## What's Next?

First, the day I finished this, there was [a blog post from Eric
Migi](https://ericmigi.com/blog/how-to-help-build-open-source-pebble-software)
talking about the opportunities for the community to help revive PebbleOS and
the SDK.  I'll keep reading and see if there's anything that seems like a good
fit for me.

If I come back to graphical development for the Pebble, I'd like to try [their
vector animation
library](https://developer.rebble.io/developer.pebble.com/tutorials/advanced/vector-animations/index.html).
I'd also like to take a step away from the built-in graphics functions and see
if I can find third-party libraries that draw onto [a frame
buffer](https://developer.rebble.io/developer.pebble.com/guides/graphics-and-animations/framebuffer-graphics/index.html).
Ideally, I'd like to find one that I can use for the Pebble as well as with the
Pi Pico.

Stay tuned...

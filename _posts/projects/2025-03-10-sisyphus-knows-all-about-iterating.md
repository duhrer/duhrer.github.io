---
layout: post
title: Sisyphus Knows All About Iterating
date: '2025-03-07'

type: posts
tags:
- projects

share-img: /assets/img/2025-03-07-mountain-formula-graph.png
---

People gave me feedback on my Sisyphus-themed Rebble hackathon entry, and I'm
using their ideas.

<!--more-->

In [the last post](/2025-03-06-rebble-hackathon-entry/), I went through how I
created the initial version of my "Sisyphus" watch face.  Sisyphus pushes a
boulder up a series of mountains, as in:

<video loop controls alt="A timelapse of the first released version of the watch face.">
<source src="/assets/movies/2025-03-06-sisyphus-timelapse.mp4">
</video>

One of the cool things they're doing for the hackathon is making a chat room for
each project. In the chat room for my project, a few people stopped by and
suggested that (per the myth) Sisyphus should move up and down *the same
mountain* each time. I had considered this for the first version, but it was far
easier to animate a loop that moves the same amount each second, and that moves
in the same direction.

To make the new idea work, I'd need to pan back and forth rather than just right
to left. I'd also need some way of making the "fall" go down the back side of the
hill much faster than the ascent.

## Math(s)

Originally, I used a hand-drawn vector graphic for the mountain, which meant I
had to painstakingly calculate the y position of the "boulder" for each part of
the graphic.

With a suitable [trigonometric
function](https://en.wikipedia.org/wiki/Trigonometric_functions) (or combination
thereof), I end up with a set of data points that can be used both to draw the
mountain onscreen, and also to perfectly position the boulder in relation to the
mountain.

After way too long refreshing my long-neglected understanding of [composite trig
functions](https://www.intmath.com/trigonometric-graphs/6-composite-trigonometric-graphs.php)
and [playing with graphing
calculators](https://aaronhe7.github.io/graphing-calculator/), I came up with
the suitably mountainous function `y = sin(x) + (150 - ((x*x)/40))`: 

![A graph of the mountain-generating function](/assets/img/2025-03-07-mountain-formula-graph.png)

Based on past experience, I knew I wanted to create a lookup table instead of
using trigonometric functions directly in C. I also shifted the graph to the
right a bit. With a bit of quick javascript [in a
CodePen](https://codepen.io/duhrer/pen/PwojEPa), I had the data I needed.

## Back to Coding!

So, now I had some data points representing the `y` position for each frame.
That's great for plotting the `y` position of the boulder for a given frame,
but I don't want to iterate through that each time I draw the mountain.

Thankfully I found a [good example in the docs for the path
functions](https://github.com/google/pebble/blob/4051c5bb97377f1215bbd26094c1a157532c55fe/src/fw/applib/graphics/gpath_builder.h#L17),
I was able to use bits of that to create a hard-coded `GPathInfo` object, which
is a structure containing a count of the number of points and a sub-struct with
the `x` and `y` values for individual points.

## Sub-second Animations

I then got to work on the effect I had in mind, where the boulder would rise
toward the summit for 55 seconds and then quickly roll downhill in the last 5
seconds of the minute. Everything else (the clouds, the sky, the time, and the
date) updates based on a tick handler, and that can only update every second.

After a lot of rereading the animation examples, I realised that I needed to
use their `app_timer_register` to schedule each frame. Although I was able to
get to `89 ms` per frame, the effect is still sadly a little choppy, especially
at the end of the animation.

## Another Excuse to Screw Around in Inkscape

The old "mountain" was an image that seamlessly matched on the edges, so that I
could loop it around every minute. This kind of scroll is very useful to keep
things interesting over time, but I could definitely expand it a bit.

My grand goal was to make a roll that was 24 hours long, which shifts a pixel
each minute. 60 minutes times 24 hours is 1440 pixels wide. Given that the
screen is 148 pixels wide, I can easily have a distinct "sunrise", "noon",
"sunset", and "night" section of the image without displaying binary suns or
anything odd.

Anyway, here's my magnum opus, the full day scroll (scaled to fit):

![The "sky" scroll](/assets/img/2025-03-08-sky-roll.png)

This one took a lot longer, mainly because:

1. [The palette of the
Pebble](https://developer.rebble.io/developer.pebble.com/guides/tools-and-resources/color-picker/index.html#00FFFF)
   is limited to 64 colors.
2. The PDC path format doesn't support gradient fills. I tried various dithering
   strategies, but they didn't look as good as solid bands of colour.
3. The PDC path format doesn't support bezier curves. If you're working on
   something like a circle, convert it to a path and then subdivide it so that
   you get smoother shapes.

With the sky moving so slowly, I wanted something to add more interest
minute-by-minute. I created a "cloud roll" that's on a five minute loop, i.e.
740 pixels wide, moving one pixel a second. Here's what I came up with (scaled
to fit):

![The "cloud" scroll](/assets/img/2025-03-08-cloud-roll.png)

Putting it all together, I ended up with the following:

<video loop controls alt="A timelapse of the first released version of the watch face.">
<source src="/assets/movies/2025-03-10-revised-sisyphus-demo.mp4">
</video>

If you look at the "sky roll" again, you can see that the yellow edge of the
brilliant sunset is coming into view. I would have sped the video up to show
more of the sky transition, but you wouldn't be able to see the "falls".

Speaking of which, you can see the little "jump" when the boulder rolls to the
bottom left side.  I have small ideas on improving that, but probably won't go
much further for the moment.

## Conclusion

I like it well enough, it's readable, and definitely fits the theme I had in
mind. However, as my wife pointed out, the original had more of a sense of
tension to it, the fall was definitely more dramatic. I'm also not all that
happy with the colours, even carefully picking them to match the palette, it
looks pretty washed out on the phone.

However, I don't feel like I'm standing at the bottom of the mountain facing the
same old boulder.  It was totally worth doing, and I'm very pleased with the
skills I added to my tool belt:

1. Creating and using PDC vector images from SVGs, including massive scrolls
   that would be too large for the Pebble's RAM as a bitmapped image (trust me,
   I tried).
2. Displaying wrapped images as a "scroll".
3. Updating at millisecond intervals rather than updating everything lock-step
   to the second.
4. Creating paths, which can also be scaled and rotated (I'm interested to try
   that down the road).
5. Less sucky and better organised C in general.

Anyway, I'll use the watch face for at least a couple of days just to get a
better feel for the "sky scroll", but I'll probably start working on other
projects now.

As always, you can [check out the code on
GitHub](https://github.com/duhrer/pebble-sisyphus-watchface) if you're
interested. Stay tuned to see whatever's next.
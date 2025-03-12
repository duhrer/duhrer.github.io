---
layout: post
title: Sisyphus Keeps Moving
date: '2025-03-12'

type: posts
tags:
- projects
---

I'm continuing to refine my Sisyphus-themed Pebble watch face.

<!--more-->

In my [last blog post](/2025-03-07-sisyphus-knows-all-about-iterating), I wrote about reworking the watch face I created for the Rebble hackathon. I wasn't overly happy about
the state of the watch face, and so I put in a little more time.

The main sticking point for me was the background/sky image, which looked like:

![The "sky" scroll](/assets/img/2025-03-08-sky-roll.png)

The rays of sunshine and multiple suns were interesting, but didn't end up
looking like anything when only part of the image was onscreen. I finally had
the idea to use a larger cloud bank in the far background to catch whatever
colour the sky is supposed to be. After way too much tweaking of paths, I ended up with:

![The updated "sky" scroll](/assets/img/2025-03-12-updated-sky-roll.png)

I ended up using a "hot dog" structure for the layers of clouds, i.e. a long
square with a circle on each end. I ended up redoing the bottom of the
"foreground" clouds to use this look as well:

![The "cloud" scroll](/assets/img/2025-03-12-updated-cloud-roll.png)

## Sizzle Reel

One of the difficulties in showing this off is that the animation takes 24
hours. So in this pass, I added a "sizzle reel" mode controlled by a compiler
flag.

The key in doing this was finally understanding enough C to dig through the
[PebbleOS code
base](https://github.com/google/pebble/blob/4051c5bb97377f1215bbd26094c1a157532c55fe/src/libc/include/sys/types.h#L27)
and confirm that a `time_t` structure is just a long unsigned integer. I then
used an online tool to figure out the seconds since the epoch for a suitable
test day.

When we're in normal mode, we pull the time from the system. When we're in
"sizzle mode", we start our internal clock at midnight and update the clock
manually on each "tick". Instead of moving to the next second, the time moves
forward by 121 seconds each pass. Since the boulder does a full lap every 120
seconds, the "boulder" still appears to make one second's worth of progress each
second, including the "fall" once the boulder clears the top of the mountain.

The sky and clouds move much faster though. You can see a full 24 hours' worth
of movement in a couple of minutes. Thanks to this new mode, I was able to
capture a proper demo reel showing how things look over the course of a full
day:

<video loop controls alt="A timelapse of the latest version of the watch face.">
<source src="/assets/movies/2025-03-12-timelapse.mp4">
</video>


## Conclusion

I'm much happier with this version, it looks nicer by far, and is pretty
readable throughout the day and night. I keep saying I'll probably start working
on other projects now, but keep waking up wanting to improve it. We'll see.

As always, you can [check out the code on
GitHub](https://github.com/duhrer/pebble-sisyphus-watchface) if you're
interested. Stay tuned to see whatever's next.
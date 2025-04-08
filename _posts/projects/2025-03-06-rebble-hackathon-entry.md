---
layout: post
title: March 2025 Rebble Hackathon Entry
date: '2025-03-06'

type: posts
tags:
- projects

share-img: /assets/img/2025-03-06-positioning-jig.png
---

After spending a few weeks learning to make Pebble watch faces, I made one for
the week-long [March 2025 Rebble Hackathon](https://rebble.io/hackathon-002/).

<!--more-->

By happy coincidence, I finished my last project just in time to take part in
the second Rebble Hackathon. I spent a lot of time asking (and answering)
question on [the Rebble Discord channel](https://rebble.io/discord), and
finished in time to publish the results.

One thing I haven't tried yet with the Pebble SDK is the support for [Vector
images and
animations](https://developer.rebble.io/developer.pebble.com/tutorials/advanced/vector-animations/index.html). Now I just needed an idea.

I usually start testing my ideas for a new project by searching for "prior art",
to see if anyone has already done what I have in mind.

My first thought was to make a watch face that used animated gears. It's been
done as well as I could manage. My second thought was something with sand, an
hourglass effect. There are already quite a few Pebble watch faces that do
this, and my ideas were not spectacular enough to really stand out.

My third idea was to make a watch face based on [the myth of
Sisyphus](https://en.wikipedia.org/wiki/Sisyphus), specifically his punishment
in the afterlife, rolling a boulder up a mountain, only to have it roll back
down over and over again. No one has done that, so here we go!

As I'd be working with SVG images, I happily ran back to the arms of Inkscape
and spent some time sketching. Here's the rough idea:

![A mockup of Sisyphus journey each minute](/assets/img/2025-03-06-progression-mockup.png)

The mountain is just two copies of the same loopable image that act as the
second hand, moving from right to left across the screen. The circle represents
the boulder, and moves up or down so that it appears to rest on the right part
of the mountain.

I liked the idea well enough to break it down into individual SVGS that match
the screen size of the Pebble and then tweaked them to meet the requirements (no
bezier curves, everything is rounded to the nearest pixel, et cetera). Now I'm
ready to write the code.

## Time to Code

So, with the SVG images ready I needed two things:  a new project skeleton, and
some way to make the [PDC
images](https://developer.rebble.io/developer.pebble.com/guides/app-resources/pdc-format/index.html)
the Pebble uses.

For the project skeleton, I finally tried the [`rebbletool` project
](https://github.com/richinfante/rebbletool). It's a fork of the original
`pebbletool`, which lets you manage the SDKs installed and also installs the
`pebble` tool you use to build and test your work.

Unlike the old toolset, `rebbletool` has been updated to work with Python 3 and
other modern dependencies, so you don't need to use a VM. I can use this to
create, build, and install projects on my watch.

Unfortunately the emulator doesn't work for me, I'll still need to use the VM
for that. However, since I can use my watch to test things, I can stay in my
normal development environment most of the time.

So, I used `rebble` to create my new project skelecton, now I need to create PDC
images from my SVG files. The documentation links to [a very old Python
script](https://github.com/pebble-examples/cards-example/blob/master/tools/svg2pdc.py)
that was created for this task. Unfortunately, it doesn't work with Python 3,
or even with the Python 2.7 setup I have in the VM for the Hackathon.

I heard people on the Discord channels talking about the
[`pdc_tool`](https://github.com/HBehrens/pdc_tool), which works in my normal
development environment. It doesn't support sequences of images, but can create
individual vector images in PDC format. I used `pdc_tool` to create and refine a
few SVGs until I was happy with them, and then started playing with them in a
new watch face project.

The biggest challenge was positioning the "boulder" vertically to match the
image. I ended up creating a 60-entry lookup table for the y position over time,
and then making a quick "jig" to display the values on top of the image. Here's
the final alignment check:

![A screenshot of the "alignment jig"](/assets/img/2025-03-06-positioning-jig.png)

Once I had the alignment tweaked to my satisfaction, I had something I wanted to
record. There was a discussion on the Discord channel about recording demo
movies, some people use OBS Studio, I've used the KDE screenshot utility with
the emulator. Back in my OS X days I would have used Quicktime Player.

However, given my newfound freedom from the VM, I wanted to try something else.
As I can also take screen shots from my watch, I used a `bash` `for` loop to
take a screen shot of my watch every second for a minute. I then put them
together [using
`ffmpeg`](https://stackoverflow.com/questions/24961127/how-to-create-a-video-from-images-with-ffmpeg).

It was a little fiddly, as I had to keep my phone awake, and as it took slightly
longer than a second between shots. I'm pleased enough with the results not to
fire up the VM and use the emulator, as the results make for a nice clean
timelapse:

<video loop controls alt="A timelapse of the first released version of the watch face.">
<source src="/assets/movies/2025-03-06-sisyphus-timelapse.mp4">
</video>

You can [imagine Sisyphus
happy](https://en.wikipedia.org/wiki/The_Myth_of_Sisyphus) if you want. You can
also [check out the code on
GitHub](https://github.com/duhrer/pebble-sisyphus-watchface) if you're
interested.

## Conclusion

So, the next step is to publish this and then sit back and enjoy looking at what
everyone else comes up with for the Hackathon. It's a pretty exciting time, the
old Pebble team and a bunch of enthusiasts are all trading tool tips and
approaches. It's pretty great.

Anyway, that's it for now, stay tuned to see whatever's next.
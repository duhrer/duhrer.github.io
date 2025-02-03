---
layout: post
title: My First Pebble Watch Face
date: '2025-02-03'

type: posts
tags:
- projects
---

After a weekend wrestling with installing the Pebble SDK, I created my first
(Javascript) watch face.

<!--more-->

As discussed [in my last post](/2025-01-20-secondhand-pebble/), I got a
secondhand Pebble, which has examples for creating a watch face in both
Javascript and C.  I figured I'd start with [the Javascript
tutorial](https://developer.rebble.io/developer.pebble.com/tutorials/js-watchface-tutorial/part1/index.html).
However, before I could even get started, I had to figure out how to install a
largely unmaintained ten-year-old SDK on a modern machine.

## Installing the SDK

Ten years ago, the SDK setup would have been pretty straightforward.  However,
the world has definitely moved on since then. The steps in the tutorial failed
pretty early on, as my machine only has Python 3, and there's no option to
install the older version in `brew` and switch on the fly.

Thankfully, a lot of people are getting back into Pebble development at the
moment, and the [Rebble community](https://rebble.io/) had some useful
suggestions:

1. Use [the VM created for the upcoming "Hackathon" in
   March](https://rebble.io/hackathon-002/vm/)
2. Use [a Docker container like this
   one](https://github.com/pebble-dev/rebble-docker), with the SDK and its
   dependencies installed.
3. Set up [a Nix environment for
   development.](https://github.com/sorixelle/pebble.nix)

I went back and forth between each of these methods.  I got pretty far with
Docker, but couldn't seem to get my container to mount a directory from my host
environment, which was a bit of a blocker, as I want to manage the code commits
and use my normal IDE.  I also wasn't entirely convinced that the emulator would
work well.

I tried out [Nix](https://nixos.org/), which sounds really promising.  You can
define the requirements for your project that their `nix-shell` can use to make
a working environment that has the right versions of everything. The working environment is completely isolated, so the next project that is older or newer and needs something different isn't affected.  However, the example
project I found failed to download its dependencies, and so I set Nix aside to
learn more about later.

That left me with the VM the Rebble community provided. I got pretty far with
installing VirtualBox, but really didn't want to get back into the business of
compiling and installing kernel modules, which you have to do to actually run a VM in VirtualBox.

I was about to cave and build the kernel modules, and was reading tips about
doing so when I ran across [this
thread](https://discussion.fedoraproject.org/t/trouble-signing-kernel-modules-for-virtualbox/71393/2?u=vgaetera).
Someone there pointed out that there are linux-based hypervisors that are a lot
less trouble, and sure enough, there's a flatpak of [Gnome
Boxes](https://apps.gnome.org/en-GB/Boxes/) that works just fine with the Rebble
VM.

The only thing I had to do other than opening the Rebble community's image was
to configure a directory on my machine as a share, and then [install
`spice-webdav` in the VM](https://www.debugpoint.com/share-folder-gnome-boxes/).
Now I can use the Pebble SDK to create the project skeleton, deploy to the
watch, run the emulator, but can edit and commit the code with my usual tools.

## Mocking Up the Javascript

Once I got all that done, it was time to actually make something. My idea was to
make my own version of [my favourite "Invert"
watchface](https://play.google.com/store/apps/details?id=com.ustwo.watchfaces.basic)
for Android Wear. This displays the time with an inverted area that is
proportionate in size to the number of seconds that have elapsed.

As I knew I'd be working with the [Canvas
API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), I did some
reading and created a basic example on CodePen:


<p class="codepen" data-height="480" data-theme-id="dark" data-default-tab="result" data-slug-hash="QwLPodg" data-pen-title="Watch Face Demo" data-user="duhrer" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/duhrer/pen/QwLPodg">
  Watch Face Demo</a> by Tony Atkins (<a href="https://codepen.io/duhrer">@duhrer</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

The key bit I had to figure out was how to create the clipping path I needed.  I
ended up using [the `ellipse`
method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse),
which helpfully supports a rotation, so I could just treat 12 o'clock like zero
and make the rest of the math easier.  The arc should basically be 360 degrees
times the percentage of the minute that has elapsed.  In radians, that's
`(Math.PI * 2 * seconds / 60)`.  You need to start and end at the centre point,
so that you end up with more of a "cut pie" shape and less of a "deflated
balloon".

## Adapting the Code For The Pebble

In sketching in a full browser, I set myself up for quite a bit of
disappointment, as the Rocky.js environment is very limited by comparison.

First, There's no `clip` method, which means you can't use a path as a mask for
some actions.  This was the core of my previous approach, without that, I had to
draw in layers, as in:

1. The black background
2. The white "cut pie" shape.
3. The white text that will be visible when the background is black.
4. Smaller black text that will be visible when the "cut pie" is behind the
   text.

I wanted to fill the text in one colour and stroke around it in the other, but
Rocky.js also lacks the `strokeText` method.

Speaking of the "cut pie" shape, Rocky.js has no `ellipse` method, and the `arc`
method can't actually fill the shapes it creates.  You have to use their
[`rockyFillRadial`
method](https://developer.rebble.io/developer.pebble.com/docs/rockyjs/CanvasRenderingContext2D/index.html#rockyFillRadial)
instead.

It also doesn't seem like you can install your own fonts for Javascript watch
faces, which in this case means I end up using overly small text and that there
isn't enough room in the centre for the "second hand" to display cleanly.

A lot of things that aren't implemented fail silently, which was confusing at
first.  For example, their `String` prototype lacks the `startPad` method.
Instead you have to use their [hacked locale date
methods](https://developer.rebble.io/developer.pebble.com/docs/rockyjs/Date/index.html).

Anyway, here's a screen capture of the watch running in an emulator:

 <video width="284" controls alt="The sample watch face running in an emulator.">
  <source src="/assets//movies/2025-02-03-watchface-in-pebble-emulator.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video> 

Although I learned a few things, it's nothing I want to put on my wrist.  For the morbidly curious, I did put the code up [in a repository on GitHub](https://github.com/duhrer/pebble-vertin-js).

## What's Next?

First, I obviously need to try [the C
SDK](https://developer.rebble.io/developer.pebble.com/docs/c/index.html).
Although you have to write a lot more stuff yourself, in return you get a lot
more control.  It also definitely supports custom fonts.

I'd also like to go even further than the CodePen example, and get closer to the
features of the original watch face. The original watch face changes colour, but
as the Pebble has no touch screen, for the first version I decided to just focus
on making the high contrast black and white colour scheme.  Longer term I should
figure out how to add button support or a configuration option for the colour
scheme.

The Android Wear watch face also has two configurable areas on the left and
right side that can display things like the battery level and your daily step
count. I'd like to figure out what things are easy to display and add the
option to configure information to appear in those little side bubbles.

Stay tuned for more (later this week, I hope).
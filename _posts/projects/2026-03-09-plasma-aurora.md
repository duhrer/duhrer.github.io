---
layout: post
title: Plasma Aurora
date: '2026-03-09'
type: posts
share-img: /assets/img/2026-03-09-test-pattern.jpg
tags:
- projects
- neopixel
---

A few months ago, I started seeing [inexpensive LED
curtains](https://nl.aliexpress.com/item/1005010382840396.html) hung up for the
holidays. Up to now I've only worked with individual strands of neopixels, I
thought a grid like this would be really fun to use for more complex animations.

I ordered [a 400 pixel LED curtain that ran on 5
Volts](https://shop.pimoroni.com/products/plasma-2350?variant=42092628246611),
and started thinking about what to do with it. The first question with a 2 by 2
meter project is where to put it. After a few minutes walking around the house
with a tape measure, I decided to use it to upgrade the [lightshow installed in
the upstairs study](/2024-12-19-pimoroni-plasma/).

The parts for this sat on my desk for a bit, but the project jumped to the top
of the queue when I realised that it would be better to do it while we still
have enough darkness in the evening to enjoy it.

When I unboxed the LED curtain, I tried it out briefly with the included
controller. It's nice, I especially like the equalizer that responds to music,
but I really didn't want something someone else wrote with its own microphone,
app and bluetooth. I'd rather make something that's only exactly as smart as I
want it to be.

So, after making sure the curtain worked, I started modding it. I cut off the
controller, separated and stripped the three wires that power and control the
curtain. Thankfully, although the wiring wasn't covered in the product page or
manual, it turns out it uses the same convention as the [10 meter strand of
lights](https://shop.pimoroni.com/products/10m-addressable-rgb-led-star-wire?variant=41375620530259)
that comes with the Plasma 2350 starter kit, and the wires can just be screwed
into the terminals on the Plasma 2350.

I created a project skeleton based on [the previous
code](https://github.com/duhrer/pimoroni-plasma-rainbow). I then updated it for
the curtain, and added code to output a simple test pattern. I installed the
curtain and the test code in the study:

![A test pattern](/assets/img/2026-03-09-test-pattern.jpg)

As I hoped, the lights fill the space nicely without being overpowering. Now I
just needed to design and write the real software.

## The Idea behind the Code

Sometimes lean into the "gridness" of things like the Novation Launchpad ([see
previous work](https://github.com/duhrer/pico-launchpad/tree/main)), for many
projects it's fine. Sometimes, though, for the sake of variety I'll make
something like the [Polar
Vortex](/demos/flocking-midi-interchange/demos/polar-vortex.html) that works
very differently.

In that design, I had a series of points that orbited around a single centre of
gravity. Their motion was animated using polar coordinates, i.e. the distance
from the centre and the current angle. I used antialiasing to split a point's
energy between each of the tiles it overlaps with. This gives less the
appearance of a "pong" ball moving through the grid, and more the appearance of
a spotlight.

I wanted to extend this idea to have multiple spotlights with different orbits,
that would overlap with each other in interesting ways. Here's a rough diagram
of the initial model, simplified for the purposes of illustration:

![A diagram of a three body orbital
simulation](/assets/img/2026-03-09-three-body-simulation.svg)

Each colour channel (red, green, blue) orbits around its own centre of gravity,
and their orbits are arranged to periodically overlap. In practice, the orbiting
"spotlights" will be big enough to fill most of the grid/square. They orbit at
different speeds, and the colours mix wherever the spotlights overlap. I mocked
up the initial code in Javascript, which you can try here:

<p class="codepen" data-theme-id="dark" data-height="500" data-pen-title="Three Body Aurora" data-default-tab="result" data-slug-hash="LERGYoM" data-user="duhrer" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/duhrer/pen/LERGYoM">
  Three Body Aurora</a> by Tony Atkins (<a href="https://codepen.io/duhrer">@duhrer</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

## The First Version

I then wrote the same rough code in my C project and installed it on unit
powering the LED curtain. Although it was very nice, it tended to have long
periods with entirely dark LEDs, which felt a bit too much like trying to work
on a cloudy day. Everything would get noticeably dark at random moments, as you
can see in this hyperlapse:

<video controls alt="A hyperlapse of the first version running in the study." width="500">
<source src="/assets/movies/2026-03-09-aurora-version-one.mp4">
</video>

## The Second Version

To address the dark spots, I decided to update the simulation to add additional spotlights:

![Updated diagram with six spotlights](/assets/img/2026-03-09-six-body-simulation.svg)

The new lights have two key properties: First, they're like the old idea of a
[Counter-Earth](https://en.wikipedia.org/wiki/Counter-Earth). They share
the same orbit as another spotlight, but are on the other side of the centre of
gravity (i.e. 180 degrees apart).

The second key property is their colour. Rather than repeating the colour of
their partner, each of these "ghost" spotlights is a soft grey, intended to fill
in and mix nicely with both the coloured spotlights and the other "ghosts".

Here's an updated version of the Javascript simulation:

<p class="codepen" data-theme-id="dark" data-height="500" data-pen-title="Six Body Aurora" data-default-tab="result" data-slug-hash="YPGGWjE" data-user="duhrer" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/duhrer/pen/YPGGWjE">
  Six Body Aurora</a> by Tony Atkins (<a href="https://codepen.io/duhrer">@duhrer</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

This turned out to be exactly the ticket. When all three coloured spotlights
mix, things are already a nice mixture of pearly colours. When coloured
spotlights mix with "ghosts", the effect is similar, and because the amount of
light varies less, the effect is more of a soft pulsing aurora, which was
exactly the goal. Here's a quick demo video:


<video controls alt="The second version running in the study." width="500">
<source src="/assets/movies/2026-03-09-aurora-version-two.mp4">
</video>

Like the previous version, this installation has an IR receiver and supports
solid colours as well as the "aurora" pictured above. This means it doubles as a
fill light and reading light, and with 400 lights, it nicely brightens up the
space.

If you're curious, the code and the materials I used are [in a repository on
GitHub](https://github.com/duhrer/plasma-2350-aurora).

## What's Next

I'm glad to get this one off of my desk, but am also glad to have started coding
again. I plan to move on to writing projects for the dual-USB board my friend
designed and sent me. Stay tuned for whatever's next.





---
layout: post
title: Pico Launchpad Tonnetz
date: '2025-10-15'
type: posts
share-img: /assets/img/2025-10-10-36-EDO.png
tags:
- projects
---

I revived yet another Launchpad project, this time to make an isomorphic "Tonnetz" controller.

<!--more-->

About four years ago, I made a quick sketch in [a repository I used for
sketches](https://github.com/duhrer/flocking-midi-interchange) to create
[Tonnetz tuning](https://en.wikipedia.org/wiki/Tonnetz) on a Launchpad. I think
I ran across it because of an isomorphic controller that used it. After seeing
the eye-watering prices of prebuilt isomorphic controllers, I started reading up
on the theory behind them, in particular staring at the wikipedia diagram that
shows the arrangement of notes (here's a simplified version showing an octave
and how the arrangement wraps):

![a sample Tonnetz tuning](/assets/img/2025-10-14-tonnetz-octave.svg)

It didn't take me long to think of two strategies for using this on a Launchpad.
First, you can achieve the same kind of offset layout by rotating the launchpad
by 45 degrees,  This "diamond" layout is a little unwieldy on a rectangular
desk, so I also came up with the idea of "skewing" the diagram a bit to align it
with a grid controller.

I translated the diagram into MIDI notes, and remapped the controller pad by
pad using a lookup table. It worked well enough, especially for a sketch.

## Four Years Later

After reviving other similar Launchpad projects, I was looking for another that
was both easy with the tools I have, and fun to reconsider. I settled on the
Tonnetz tuning. I reviewed my previous work, and looked at a few open source
tools and commercial products. At first, my thinking was already settling into
the same patterns I had used before.

It wasn't until I started thinking about using multiple Launchpads together over
a larger octave range that I got kind of stuck. Nothing I had in mind seemed
overly natural to wrap your head around and play.

Luckily, I was reading about another isomorphic controller and [a single diagram
unlocked things for
me](https://hackaday.io/project/168006-tonnetzone-isomorphic-midi-keyboard).
When looking at diagrams with letters for notes, I wasn't thinking of their
relationship in numbers. When you diagram it in terms of each pad in a grid and
its neighbours, the pattern is crystal clear:

![Root note surrounded by neighbours](/assets/img/2025-10-14-tonnetz-distilled.svg)

Along one axis, the notes go up and down by three semitones. Along the other,
notes go up and down by four semitones. To progress through octaves, just keep
the progression going.

![Default tuning as MIDI note numbers](/assets/img/2025-10-14-default-tuning-midi-note-number.svg)

As it more closely matches most of the tunings I use on the Launchpad, I
arranged things so that the lower left corner of the Launchpad is the lowest
tone. The pad to the right is three semitones higher, and each the pad above is
four semitones higher. With a very simple formula, you can calculate the
relative position of any pad in the grid just by knowing its row and column.

This is exactly what I needed. Most importantly, the final layout is still faithful to the original tuning,
just a bit rotated and flipped. Here's the default tuning with note names and
"triangles" added:

![Default tuning, with note names and "triangles"](/assets/img/2025-10-14-default-tuning-triangles.svg)

Let's go through two triangles. The first side consists of adjacent notes on a
diagonal from lower left to upper right, such as C and G. If we make a triangle
that points up and to the left (by adding E), we make a major triad. If we start
with C and G and make a triangle that points down and to the right (by adding
D#), we make a minor triad.

This layout is also great for setups with multiple launchpads. You can arrange
five Launchpads side by side and still fit the range, and if you're making some
kind of wall installation (don't tempt me), you can arrange three Launchpads
vertically. If you want to make a grid of grids, you can also do a two by two
arrangement.

It's also easy to align the launchpads with each other. All I have to do is keep
track of the pitch offset of the bottom left pad for each connected Launchpad,
and do some easy maths to figure out the rest of the layout. I can let the user
change the offset with the arrow pads, and they can easily line things up with a
few pad presses. Since the pattern is consistent throughout the range, it's very
easy to tell when things are aligned. If you don't care about the octave jumps,
you can also just align multiple launchpads without adjusting them.  *They
already line up with each other.*

## A Side Note About Process

Although I did read some old code and start working on the skeleton for this
project, my basic process starts with documentation and diagrams.  Documentation
includes this blog, which I started writing before I wrote most of the code. It
also includes the basic user documentation in the repository's markdown files.

Diagrams and explanations like those you see here are invaluable in ensuring
that you have a clear understanding of the tuning, the relative layout, and the
colour scheme. They also make a good addition to the user documentation.

By explaining what I'm doing and why and making visual examples, I find I can
write simpler and better code. That's especially true in this case, where taking
the time to understand someone else's diagram of the same space took all of the
unnecessary complexity out. I would have spent days longer coding if I hadn't
spent time writing and diagramming up front.

## The Results

This came out much better than the last version. My best decisions were to:

1. Add color-coding for C notes. You can easily orient yourself.
2. Add color-coding for "held" notes, which really helps in continuing
   progressions that wrap around.
3. Add controls to shift the range up and down, which makes it really easy to
   set up arrangements of multiple Launchpads.

I also just love playing with it, I see why music teachers use it to teach
musical concepts. Even with my limited knowledge I was able to figure out how to
manage piano and even mandolin tunes on it. If you're interested, I recorded a
demo on YouTube where I show it off and go through how it works:

<iframe width="560" height="315" src="https://www.youtube.com/embed/OXkO0JA8EZM?si=DHzrabQvmsH4Wbtm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What's Next?

I still need to get support for the Launchpad Pro MK3 working, which is my next
goal for this project. Once I finish that, I'll probably reimplement my guitar
fretboard project on a microcontroller.

Stay Tuned.

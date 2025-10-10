---
layout: post
title: Pico Microtoner
date: '2025-10-10'
type: posts
share-img: /assets/img/2025-10-10-36-EDO.svg
tags:
- projects
---

I was looking through some older demos while working on my last project, and
started thinking seriously about making a new version of my
[microtoner](https://github.com/duhrer/flocking-midi-microtoner), a MIDI router
that adds microtonal support to any controller.

<!--more-->

[Microtonality](https://en.wikipedia.org/wiki/Microtonality) refers to music
that produces "notes" that are less than a semitone apart, i.e. where there are
more than twelve notes in an octave. Composers like [Easley
Blackwood](https://en.wikipedia.org/wiki/Twelve_Microtonal_Etudes_for_Electronic_Music_Media)
experimented with 13 through 24 notes in an octave, and my son is a huge fan of
his music.

I made the original version to work with MIDI theremins (a bit of fool's gold I
tried to mine a lot a while back). If your controller plays one or two octaves
over its whole control surface, the difference between each note is so small
that a glissando begins to sound a bit more like a theremin, especially if you
play it with something like the [Doepfer R2M](https://doepfer.de/R2M.htm) or
the [Altura MIDI
Theremin](https://zeppelindesignlabs.com/product/altura-mkii-theremin-midi-controller/).

## Multitimbral Approach

My original idea years ago was to subdivide an octave using different MIDI
channels, and "retune" each channel using a pitchbend. The easiest example of
this would be 24 EDO (Equal Divisions of the Octave). On the first channel, you
play notes with no "bend". The second channel is "bent" by a quarter tone. By
sending every other note via the second channel, you can play 24 notes in an
octave:

![24 EDO](/assets/img/2025-10-10-24-EDO.svg)

Here's the same diagram for 36 EDO:

![36 EDO](/assets/img/2025-10-10-36-EDO.svg)

Most sound-producing elements can bend 1 or 2 semitones in each direction, but
given that each note you output starts at a semitone, all you really need is to
be able to bend a full semitone to reach all the notes between the "normal"
semitones.

My original work focused on multiples of twelve, which are easier, as multiple
notes in a single octave are bent in the same way (see the diagrams above). For
each channel you add, you add 12 notes to an octave, up to 16 channels times 12
notes, or 192 EDO. In reimplementing this work, I realised that since you have
16 channels you can also support "macrotonal" ranges, i.e. anything from 1 EDO
to 16 EDO.

This gives you a kind of funny range of tunings, but all of them are polyphonic,
i.e. you can use all the voices your sound-producing element has. I tested
things out by sending notes to a MIDI monitor and confirmed that I had things
working, but when I hooked it up and tried to play sounds in Collection V and
other software, I hit a wall.

It turns out your sound-producing element has to support "multitimbrality", i.e.
it has to bend played notes separately on each MIDI channel. Most don't, which
means that the tuning kind of twitches when you're setting the bends for each
channel, and settles on the last "bend" transmitted.

[I've
heard](https://www.reddit.com/r/synthesizers/comments/16dr7zm/can_anyone_recommend_a_multi_timbral_hardware/)
that synthesizers like the [Waldorf
Blofeld](https://en.wikipedia.org/wiki/Waldorf_Blofeld) support multitimbrality,
but it seems like all of the software I have is monotimbral. One option is to
set up a DAW with 16 identical instruments, each connected to a different
channel.

In trying to figure out why I never noticed the problem before, I realised that
I actually have a multitimbral synth, and was using it back when I wrote the
original software. So, I may just have to return the [Roland
JV-1010](https://www.vintagesynth.com/roland/jv-1010) to its place of honour on
my desk.

## Monotimbral Approach

Even though I can work with multitimbral, I would also like to be able to use a
wider range of sound-producing elements. I noticed that my previous work
eventually settled on a "monotimbral" approach, i.e. bending the pitch *per
note* right before playing it. The advantage is that this works for any
sound-producing element that supports bending pitch by at least one semitone.

The disadvantage is that it's monotonal, i.e. you can't keep playing other notes
or they'll be bent along with the new note. This is a little bit of a bummer for
some kinds of music, but it's fine for stuff like MIDI theremins.

The somewhat insane thing about a monotimbral approach is that because you no
longer care about channels, you're only limited by your pitchbend. Pitchbend
supports bending 8192 levels in each direction. Most sound-producing elements
bend two semitones over that range, which gives you 4096 levels available
between semitones, i.e. you can achieve 4096 EDO. If your sound-producing
element only bends by one semitone (or has a configurable pitchbend), you can
achieve 8192 EDO.

Although [people still argue about
it](https://www.reddit.com/r/microtonal/comments/xbzx9p/hearing_a_difference_of_1_cent/),
chances are there will be no perceptible difference between adjacent notes in
anything higher than 100 EDO (1
["cent"](https://en.wikipedia.org/wiki/Cent_(music))), but this is an advantage
if you're trying to simulate a continuous rising tone (again, MIDI theremins).

## Can I Hear It?

I recorded a demo for my YouTube channel, with two units demonstrating the monotimbral approach:

<iframe width="560" height="315" src="https://www.youtube.com/embed/l-sjzdIex1Y?si=7kA_-2jwnU2_-Jan" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The code is also available [in a GitHub
repository](https://github.com/duhrer/pico-microtoner), so if you have a
compatible microcontroller, you can install it yourself.

## What's Next

This is one of the most complex instruments I've made in a long while, and
supports a huge range of configuration options:

1. How many notes in an octave (EDO), anywhere from 1 to 8192.
2. How many semitones your pitchbend covers (generally 1 or 2).
3. What note is the "center" of your iput (middle C by default).
4. What note is the "center" of the output (also middle C by default).
5. Whether you're using the monotimbral or multitimbral approach. 

Although I have all of these things represented in a "state" structure, right
now you have to edit the defaults and recompile to change the configuration. I
have a few thoughts about making this configurable in real time.

I could probably make everything configurable using MIDI control change messages
or System Exclusive Messages. I'm tempted to do this as it would mean a wide
range of target boards could be supported.

However, I know I'd go insane testing even a small portion of the supported
configuration options without a display and a few buttons. I have three
compatible displays available, so that's probably where I'll focus next.

Stay tuned!
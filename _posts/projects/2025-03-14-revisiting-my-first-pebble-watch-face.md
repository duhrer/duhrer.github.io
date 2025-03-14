---
layout: post
title: Revisiting My First Pebble Watch Face
date: '2025-03-14'

type: posts
tags:
- projects
---

After all I learned during the Rebble hackathon, I went back to rewrork [my first Pebble watch face](/https://duhrer.github.io/2025-02-28-pebble-watch-face-configurable-colours/).

<!--more-->

In working on [my "Sisyphus" watch face for the Rebble
hackathon](/2025-03-12-sisyphus-keeps-moving/), I learned a lot about working
with vector images, and got more comfortable making sense of and using more
complex parts of the Pebble C SDK. I also published my first app to the [Rebble
store](https://apps.rebble.io/en_US/application/67c9a27dd2acb301d72977c7?query=sisyphus&section=watchfaces).

Armed with that knowledge, I decided to revisit my first watch face. I
considered publishing that while I was publishing the Sisyphus watch face, but
noticed that the display on the round Pebble Time emulator (codename, "chalk")
wasn't working:

![A screenshot of the previous version on a round watch face](/assets/img/2025-03-14-broken-round-look.png)

For starters, the left-hand images were displayed badly. I figured out the tiny
"echo" of the left hand digits was caused by a small error in the logic that
defined the bounding boxes.

Even with that fixed, the face is still just too spread out for the round watch
face. I tried shifting the position a bit, but with static images, this was not
all that successful, since each image also contains its own margins, which are
filled with the background colour.

I decided to refactor to use vector images. The initial image conversion was
pretty easy, as I kept the original SVG images I used to generate the bitmaps. I
just needed to update each image and:

1. Resize the document to tightly crop the "digit".
2. Set the background to transparent.
3. Convert the digit from a text object to a path.
4. Interpolate intermediate path segments between points on each curve (you have
   to do this because the PDC format does not support bezier curves, and by default the conversion results in spiky paths, and not the endearingly retro kind).

I then used the [`pdc_tool`](https://github.com/HBehrens/pdc_tool) to generate
PDC files from my SVGs. With this done, I was ready replace all of my bitmap
logic with logic to display the vector images. Given that I could easily refer
to what I'd done with "Sisyphus", this was pretty straightforward.

The initial effort looked very strange. The text was not displayed in the
correct colour, and as a result the second hand couldn't properly invert it. I
had set the correct fill colour for the drawing context, but it turns out this
would never work, as I discovered in today's learning exercise.

## Today's Code Adventure

Today's surprisingly agreeable trek through the heart of darkness was unpacking
["Draw
Commands"](https://developer.rebble.io/developer.pebble.com/docs/c/Graphics/Draw_Commands/index.html),
which is what the Pebble SDK calls their vector support.

I had previously used only their loading and drawing functions. When I tried to
change the colour for the drawing context, it didn't affect the drawing of the
paths. I discovered that a `GdrawCommandImage` contains a series of drawing
commands (hence the name!).

Each individual command has its own fill and stroke settings, which makes sense
as otherwise you couldn't support anything more complex than a single shape with
the same stroke colours and stroke widths used everywhere.

To fix this, I started by reading through the documentation on [getting the list
of an image's
commands](https://developer.rebble.io/developer.pebble.com/docs/c/Graphics/Draw_Commands/index.html#gdraw_command_image_get_command_list)
and [running a callback for every command in a
list](https://developer.rebble.io/developer.pebble.com/docs/c/Graphics/Draw_Commands/index.html#gdraw_command_list_iterate).
For a bit of extra confirmation, I searched through and found [an example from
the PebbleOS source
code](https://github.com/google/pebble/blob/4051c5bb97377f1215bbd26094c1a157532c55fe/src/fw/applib/graphics/gdraw_command_transforms.c#L39).

With that, I was ready to write the code, which ended up looking something like:

```
typedef struct {
  ColourScheme colourScheme;
} ColourSchemeContext;

static bool update_single_command_stroke_colour(GDrawCommand *command, uint32_t index, void *context) {
  ColourSchemeContext *colours = context;
  gdraw_command_set_stroke_color(command, colours->colourScheme.PrimaryColour);

  return true;
}

static void update_image_colours(struct tm *t) {
  ColourScheme CurrentColourScheme = get_current_colour_scheme(t);

  ColourSchemeContext context = {
    .colourScheme = CurrentColourScheme
  };

  for (int a = 0; a < 10; a++) {
    GDrawCommandImage *image = digit_paths[a];
    GDrawCommandList *command_list = gdraw_command_image_get_command_list(image);

    gdraw_command_list_iterate(command_list, update_single_command_stroke_colour, &context);
  }
}
```

The callback context can be whatever you want, in this case I just needed to
make the callback aware of the current colour scheme so that I can use that to
update the colours for each command. Side note, this is the kind of thing that
would have made my head hurt a month ago. My motto is "keep sucking less", and
in this case it has paid off.

Anyway, with that change, I was pretty close, the colours worked fine and
inverted nicely as the second hand moved. However, the spacing on the round
watch still wasn't perfect. Look at the previous screenshot, the edges of the
bezel encroach on the digits to the point where they're not all that readable.

To tidy up the look, I used [preprocessor
directives](https://developer.rebble.io/developer.pebble.com/guides/best-practices/building-for-every-pebble/index.html)
to adjust the margins if the device was round, moving the digits closer to the
centre by a few pixels. Here's the end result:

![Screenshot from the basalt emulator](/assets/img/2025-03-14-basalt-screenshot.png)
![Screenshot from the chalk emulator](/assets/img/2025-03-14-chalk-screenshot.png)
![Screenshot from the diorite emulator](/assets/img/2025-03-14-diorite-screenshot.png)

The curved parts of the digits are not quite as smooth as the bitmapped version,
zeroes in particular look like tiny vampire leeches. However, as I discovered in
earlier work, it looks much better on a watch than in the emulator.

In return for a few jagged paths, I get total control over the positioning. I
also suspect the memory usage is better (sadly the tool they provide to analyse
this doesn't seem to do much at the moment).

## Conclusion

I was happy enough with the updated version to [finally publish it to the Rebble
store](https://apps.rebble.io/en_US/application/67d405d0f4b49d00099ff85d), which
was after all the goal.

I keep saying I'm ready to move on, and I keep not doing it. I was trying to
figure out why I've enjoyed working with the Pebble so much. I think it's
because it's a journey back to a different comfort level for me. The last time I
wrote graphics code in C, it was in the VGA era, and I was using [Turbo
C](https://en.wikipedia.org/wiki/Turbo_C).

This was just a few years before the first 3D graphics cards were common, and I
could still just create fun stuff using simple trigonometry and shapes instead
of viewpoints and cameras and points in three dimensional space. I spent ages
making my own graphics editors and versions of old vector games.

I must have missed it, because I keep coming up with ideas for more fun stuff on
the Pebble. It may also get that I'm getting decent enough at working with C and
the Pebble C SDK that it's fun and relatively quick to come up with ideas and
sketch.

Case in point, if I don't finally snap out of it, I'm thinking of doing
something with rotating elements and animation next. Anyway, as always, you can
[check out the code on GitHub](https://github.com/duhrer/pebble-vertin-c) if
you're interested.

Stay tuned to see whatever's next.
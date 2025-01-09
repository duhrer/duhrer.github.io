---
layout: post
title: Really Useful Replacement Handle
date: '2025-01-08'
type: posts
tags:
- projects
- 3d
---

One of the key things I like about 3D printing is that you can make replacement
parts at home. My latest 3D modelling project is a replacement handle for a
[Really Useful Storage box](https://www.reallyusefulstorageboxes.co.uk/).

<!-- more -->

I ended up with one without a second handle, which mostly works fine, but
occassionally springs open and dumps its contents on my head while I'm getting
it off the shelf.

Thankfully, there are two on each box, so I have an easy reference:

![The original piece to replace](/assets/img/20250108-handle.jpeg)

After a few minutes with a caliper and Blender, I came up with this model:

![The 3D model of the replacement part](/assets/img/20250108-handle-model.png)

I don't (yet) have a printer at home, so I sent the STL file to a friend.  We
went back and forth about the infill to use, as he was concerned the narrow
point in the "plugs" that fit into the box would be too weak.  Turns out that at
least [in Ultimaker Cura, you can specify infill density for just a part of a
model](https://community.ultimaker.com/topic/35428-how-to-use-different-infill-in-different-areas/).
Here's my flythrough of the infill during testing:


 <video width="640" height="480" controls alt="A demonstration of the variable infill">
  <source src="/assets//movies/2025-01-08-infill-flythrough.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video> 

My friend tweaked the infill based on his experience with his printer, and
here's the printed piece:

![The printed result.](/assets/img/20250108-printed-result.jpeg)

Sadly, even with the infill, the piece broke as soon as it was installed.  The
point of failure in both cases was at the narrowest part of the arms that hold
the "plugs":

![The (failed) piece](/assets/img/20250108-tested-to-failure.jpg)

We discussed strategies, such as:

1. Adjusting the infill further, especially extending the thicker fill beyond
   the shafts that hold the plugs.
2. Printing with the piece rotated so that the tension would be applied across
   rather than along the layer lines.
3. Making much thicker "arms", as there is certainly room for them.

In addition, we noticed that the fit of the handle was too snug, and failed to
account for two notches that hold the original piece in place.

For the next version, at a minimum I'll need to account the weakness of the
arms, and the overly snug fit of the handle.  I may also tweak the angle of the
arms, as I noticed that was also slightly off.

Stay tuned for take two...
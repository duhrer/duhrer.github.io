---
layout: post
title: Google Stadia Tandemonium
date: '2025-07-28'

type: posts
tags:
- assistive technology
- gamepads
---

I collect controllers, especially discontinued ones, and this time it really
paid off.

<!--more-->

I bought my first Stadia controller the week Google announced that the Stadia
service would be discontinued. Without the Google Stadia service, by default the
controllers can only really be use as wired controllers. Perhaps as a result,
they tend to be pretty cheap secondhand, especially for the build quality.

The key is that until December 31st 2025, you can run a tool [on the Stadia web
site](https://stadia.google.com/controller/index_en_US.html) to upgrade the
firmware and enable Bluetooth support. Once you do that, The Stadia controller
is compatible with nearly everything.

I recently saw a good price on another Google Stadia controller, and knew I had
to get it. Why?  Well, one of the accessibility features of the Stadia I've long
been curious about is ["Tandem
Mode"](https://support.google.com/stadia/answer/13067284?sjid=16262232260631644332-EU#tandem&zippy=%2Ctandem-mode-faq),
which allows you to connect two controllers with a USB cable and use them as a
single controller. The primary controller is connected to your device via
Bluetooth, and a second controller is connected to the primary controller via a
USB cable. I wanted a second Stadia so I could try it out.

Why would you use a tandem controller setup? You might use one if you're able to
operate part of a controller, but want someone else to help you with the rest. I
did something similar when my son was learning to use the Switch, using a single
controller. I controlled the thumbsticks and he'd sit in my lap and press the
buttons.

There are other solutions like this, notably the "Co-pilot" feature of the Xbox
One and Xbox Series X/S. "Tandem Mode" is unique in that it's all handled in
hardware, and doesn't need any special configuration or additional software on
your device to use it. As long as you can connect the primary Stadia controller
to your device, you can use a tandem controller with it.

## So What's It Actually Like?

Once my second unit arrived, I charged it up, ran [the update to enable
Bluetooth](https://stadia.google.com/controller/index_en_US.html), and then
paired it with my computer. I tested the controller with an [online gamepad
tester](https://hardwaretester.com/gamepad) to confirm that all its buttons and
thumbsticks were working.

I then connected my second Stadia controller via a USB-C cable. It worked
immediately, no resetting, no weird button combos or secret buttons you have to
press with a needle. It's very easy to use, and from what I've seen, works
without any lag.

I noticed when connecting and disconnecting the second controller, the gamepad
stays connected and the device ID stays the same. This is exactly why I love it.
It's nobody's business but yours whether you're using a tandem controller, and
the device you're controlling doesn't bat an eye when you connect or disconnect
a second controller.

My biggest remaining question was how it would handle duplicate inputs, and
here's what I found. First, the primary controller takes priority for thumbstick
input, i.e. if the same thumbstick is held on both controllers, the value of the
primary controller is used.

Although they're also analog controls, triggers are handled differently. If the
same trigger is held on both controllers, the highest value is used.

Buttons are a bit more open, anything pressed on either controller shows up. If
the same button is held on both controllers, it remains pressed until it's
released on both controllers.

The directional pad (d-pad) acts mostly like a set of buttons (which it is). If
you hold the same direction on both d-pads, it will stay pressed until you
release it on both game pads. Unlike other buttons, each pair of directional
buttons can cancel its opposite, i.e. if you hold "up" on the d-pad on one
controller, pressing "down" on the other controller will also release the "up"
button.

On the whole it just works, although it can be a little confusing when duplicate
buttons are hit. It would be better if there were more configuration options,
for example, settings to let the secondary controller take precedence, or to
disable particular controls on one of the gamepads. I can only fault them so
much for this, as it would be hard to come up with a configuration mechanism
that worked across platforms.

## Conclusion

In short, this is an elegant and easy to use solution that makes it possible to
cheaply add tandem gamepad support to a wide range of platforms.

Long after I probably should have, I found [the controller compatibility
page](https://support.google.com/stadia/answer/13067284?sjid=16262232260631644332-EU#tandem&zippy=%2Ctandem-mode-faq).
It turns out that you don't have to use a Stadia controller as the second
gamepad. You can connect Switch Pro controllers, the last three generations of
PlayStation controllers, and the last three generations of Xbox controllers,
including the Xbox Adaptive Controller. It even supports the Steam controller.
If you have a console, chances are you have something that will work with Tandem
Mode.

It's already supported on quite a few platforms, and hopefully it's possible to
use it on even more by using something like [the
OGX-Mini](https://github.com/wiredopposite/OGX-Mini/tree/master/hardware) and
Bluetooth. I'll definitely comment on that once I get further with building an
OGX-Mini.

All in all, this is a hugely impressive piece of hardware, and well worth
snagging before December 2025, while you can still easily unlock Bluetooth,
which is a hard prerequisite for using Tandem Mode.


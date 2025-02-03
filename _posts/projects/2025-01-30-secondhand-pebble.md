---
layout: post
title: Secondhand Pebble
date: '2025-01-20'

type: posts
tags:
- tech
---

My new smart watch is ten years old and I like it a lot.

<!--more-->

## Background

I got [my first "smart"
watch](https://en.wikipedia.org/wiki/Mobvoi#TicWatch_Pro) in 2018. Although I've
managed to keep it running, I've wouldn't say I've ever really loved it.

The TicWatch Pro is handsome, and has a nice display. I genuinely like [some of
the watch faces out
there](https://play.google.com/store/apps/details?id=com.ustwo.watchfaces.basic).
It also has an LCD layer that's shown most of the time, and as a result can
typically go 2-3 days on a charge.

The problem is, even in 2018 it was slow, and it hasn't gotten better. It's also
a hassle to charge, mostly because of the maddeningly bad Mobvoi charger that
doesn't always seat properly.  The charger also tends to die if you use a power
supply that can provide more than 1 Amp (I'm on my third charger at this point).

But it works. It keeps time, shows me notifications and calendar reminders, and
has a heart rate monitor. I want to keep it running for as long as humanly
possible, as I would almost always rather repair something I have than get
something new.

Speaking of breathing new life into something old, the last time my Mobvoi
charger died, it was actually cheaper to buy another entire unit and charger
used, so I did that. Since I had two watches, I spent a while trying
[AsteroidOS](https://asteroidos.org/) on one of them.

AsteroidOS is much faster, there's no litany of privacy warnings and permissions
for the heart rate monitoring, and you can in theory make your own watch faces
if you're willing to learn
[QT](https://en.wikipedia.org/wiki/AsteroidOS#Software_Architecture). The
biggest problem is that [you can't sync with the calendar on your
phone](https://github.com/AsteroidOS/AsteroidOSSync/issues/19).

So I ended up using Android Wear on my old TicWatch Pro again as my daily
driver, and I'm still not loving it.

## Welcome Back to the Stage of History

A couple of days ago, [the news came out about PebbleOS being
open-sourced](https://techcrunch.com/2025/01/27/smartwatch-pioneer-and-kickstarter-darling-pebble-is-returning-in-a-new-form/).
The more I learned about it, the more I knew I had to give it a try.

The idea of a cloud-backed "smart" thing outliving the interests of the people
who sell it is something I really like. (I say this while glancing at the
Google Stadia controller on my desk).

I also like being part of a community trying things and contributing back where
possible. I figured if I had an existing Pebble, I'd be in a good position to
try out updates to PebbleOS based on [the legacy
codebase](https://github.com/google/pebble), and maybe develop apps and
watchfaces at the same time as other people I can learn from.

On top of all that, I also just liked everything I'd read about using a Pebble
without modifying it.

## Not New, but New to Me

So, the same day as the article came out, I found a used Pebble on
[Marktplaats](https://www.marktplaats.nl/) ("the Dutch eBay", at one point
actually owned by eBay). I ended up getting a [Pebble Time (Champion
edition)](https://en.m.wikipedia.org/wiki/Pebble_Time), which was a Kickstarter
reward for people who backed them twice.

The [Rebble community](https://rebble.io/) has gone a long way to keeping the
Pebble alive, and my setup experience on Android was fine. First, I needed the
old Pebble app for the initial setup, and the app isn't on the Google Play Store
any longer. Thankfully, Rebble provides a detailed setup guide to help you
sideload the app and pair it with your device. The main sticking point is
wrestling all the permission tick boxes and warning dialogs to the ground, once
you do that you can just follow the prompts in the Pebble app.

Once I had the device paired and set up, it was time to get it set up for
updates and apps. Rebble provides a URL I loaded on my phone to reconfigure the
Pebble app to use the community servers. Given that Android App links like this
[require you to have access to the app's signing
certificate](https://developer.android.com/training/app-links/verify-android-applinks#web-assoc),
they must have worked closely with Google to set this up. Doing this immediately
gave me access to tons of apps and watch faces.

Once I had the app set up and updated the Pebble, I was ready to start actually
wearing and using it.

## What's It Like?

First impressions, the build quality is good, it's not quite as handsome as the
brushed metal finish on the TicWatch Pro, but presentable, especially if you
already have a matching watch band. Speaking of watch bands, the Pebble works
with the same 22mm watch bands as the TicWatch Pro, which is great, as I have
quite a few of those at this point.

I'm used to the TicWatch Pro, which has a bigger screen, a thick metal body, and
a 415 mAh battery. By comparison, the Pebble Time has a smaller screen, a
thinner body, and a 150 mAh battery. As a result, it's much lighter, but it
doesn't feel like a toy. The polished metal back on the TicWatch Pro can be a
bit bracing when you first put it on on a winter day. The Pebble Time is a bit
more comfortable in that respect. In fact, it's so comfortable I'm willing to
wear it to bed to try their sleep tracking.

The display is ePaper with a backlight. I like reading text on it, it reminds me
of the Kindle in that respect. The display is fine in normal overhead lighting
and much better than a normal display in sunlight. It's a little hard to read in
low light, but is fine once you turn on the backlight (or if you have a reading
lamp).

When I hear "ePaper" I worry about latency, but I have an animated watchface and
haven't noticed any artifacts or odd behaviour. I'm not planning to watch movies
on the thing, my one concern was whether it could scroll and display something
like a second hand properly, and it can.

<video width="730" loop controls alt="A demonstration of the screen and an animated watch face.">
<source src="/assets/movies/2025-01-31-mario.mp4">
</video>

As mentioned, the display does have a backlight, which is not motion activated.
When the watch is displayed, the left button activates the backlight, and it's
just bright enough to read the display, and no brighter. This sounds small, but
is really nice in the evenings and during the night. I find that it's not nearly
as harsh as checking my phone for the time.

Speaking of buttons, the display is NOT a touchscreen. There are four physical
buttons, one on the left, three on the right. The left button seems to be mainly
the "back" button. The top and bottom right buttons tend to be used for up/down
scrolling or to let you pick from a two-option dialog. The middle right button
opens the list of apps and picks an item when you're scrolling through a list.
We'll see how natural it feels after a few days, but so far it's fine. Quaint,
even.

The Pebble is pretty fast. It boots in a few seconds, and updates are pretty
zippy compared to Android. It responds very quickly when you hit a button.
Notifications also seem to come through very quickly.

The Pebble doesn't include GPS and heart rate monitoring. GPS isn't much of a
problem as long as you're willing to keep the Pebble connected to your phone.
Heart rate monitoring is a bit more of a bummer.

The Pebble does support adding functionality using smart watch bands
("smartstraps"). I can see a few commercial efforts from the glory days of the
Pebble, like [this "smartstrap" that adds heart rate
monitoring](https://www.kickstarter.com/projects/tylt/tylt-vu-pulse-for-pebble-timetm),
but I haven't found anything that's still for sale or available used.

I also see community projects from back in the day to make your own smartstrap,
like these [hackathons](
https://makezine.com/article/maker-news/hacking-on-the-pebble-smartstrap/) and
[this instructable
project](https://www.instructables.com/Pebble-time-watch-Smartstrap-Tutorial/).
Again, there's nothing recent and nothing that's a product, or a kit, or a even
a good guide to doing this yourself today.

## Customisation Options

This brings us to the broader topic of customisation. As mentioned, there are
old examples of customising the hardware with a smartstrap or smart dock. If
enough people start working with old Pebbles or whatever new hardware comes out
as a successor, maybe this will be a better option for hardware hacking in the
future.

Without changing the hardware, you can still customise the user experience by
configuring your device. On the Android Wear side, I've configured my own
"tiles", which appear when you swipe right from the watch face (you can have
multiple tiles). I've heard there are watch faces that act as a launcher to give
you the option to change what happens when you swipe in other directions, but
haven't tried them yet. Like Android, Android Wear supports the ability to
disable built-in software, and I definitely use this to turn off stuff I don't
use like voice memos.

PebbleOS is a similar mix of things you can change and things you can't. It
doesn't let you change what happens when you press and quickly release the "up"
and "down" buttons from the watch face. "Up" goes to the health data, "down"
goes to the timeline. However, you can assign a "quick launch" app to a long
press on each of the four buttons, which is arguably comparable to Android
Wear's "tiles". However, PebbleOS doesn't let you disable or hide the built-in
apps, or even change the order to move the calendar further down in the list.

Of course, there's a chance the commercial Pebble successor or the open source
community might provide alternative versions of PebbleOS, or provide
instructions for "rolling your own" version, like AsteroidOS does. We'll see.

You can also install or write your own apps for both. Although I've developed
for Android before, I never got interested enough in Android Wear to try writing
my own watch face, especially since there are so many polished ones I already
like.

Making a watch face on the Pebble seems more realistic to me. You can use [C or
even
Javascript](https://developer.rebble.io/developer.pebble.com/tutorials/index.html).
Given that I'm mostly working in C now and previously spent years writing
Javascript, it seems a bit more plausible than picking up Java again or learning
Kotlin.

## Conclusion

I really enjoy using the Pebble so far, and plan to stick with it. The lack of
heart rate monitoring is not great, but I still have the TicWatch Pro for that.
My plan is to swap off between the two whenever I have to charge the one that's
on my wrist.

Speaking of charging, while writing this up and searching for info about the
Mobvoi charger, I found [this (I say it with love and admiration)
nutcase](https://www.reddit.com/r/WearOS/comments/l0mfs9/charging_adventures_with_ticwatch/)
who made their own charger they can use without taking their watch off.

We'll see which I get to first, a new charger for my TicWatch Pro, or maybe a
custom watch face for the Pebble. Stay tuned.
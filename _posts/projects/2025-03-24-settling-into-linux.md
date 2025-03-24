---
layout: post
title: Settling into Linux
date: '2025-03-24'

type: posts
tags:
- tech
---

After years on OS X, I moved back to Linux, and after nine months, it's pretty
comfortable.

<!--more-->

Early last summer, my six year old MacBook Pro (the last Intel MBP) was slowly
grinding to a halt. It was becoming unusable, especially for development tasks
or gaming. I spent a long time debating what to replace it with.

Although I've heard good things, I wasn't ready to upgrade to a post-Intel Mac
processor. Among other things, I want to be able to run Windows apps on the same
hardware. However, I also wasn't ready to have a Windows machine as my daily
driver again. Windows is firmly a necessary evil for me, and I only run it when:

1. I want to play a game that isn't supported elsewhere.
2. I fix my Mom's computer.
3. I need to figure out why my code doesn't work for a friend running Windows.

With OS X and Windows off the list, that just leaves Linux. I've gone through
phases of running Linux desktops over the years, from the
[Slackware](http://www.slackware.com/) days in the 90s on. The last time I quit
"for good" was circa 2008, after constantly wrestling with multi-monitor support
in SuSE.

Recently, though, I read good things about [Bazzite](https://bazzite.gg/), a
gaming-focused variant of Fedora, and decided to give it a go, with Windows as a
backup option.

## Gnome

The next key choice was whether to use KDE and Gnome. After reading up a bit, I
decided to start with Gnome. So far, I really like the window management. On OS
X I used [Magnet](https://magnet.crowdcafe.com/) to arrange my windows, and the
[Gnome Tiling Shell
extension](https://extensions.gnome.org/extension/7065/tiling-shell/) is a good
replacement. It lets me move things around into the kinds of arrangements I like
(two apps, each half-screen, in my case).

I also like the start menu, it displays a thumbnail for all open windows, and
you can launch new stuff just by searching. It's especially nice if you're a
heavy keyboard user. It works well enough that I don't think about it, which [is
a compliment](https://en.wikipedia.org/wiki/Don't_Make_Me_Think).

## Flatpak

Most of my daily drivers were a breeze to set up, as I use mainly open source
tools (Blender and Inkscape, for example). Lots of open source tools are well
supported on Linux, and many are available via [Flatpak](https://flatpak.org/),
a way of sandboxing apps and their dependencies.

One new flatpak won't break any of the others, and flatpaks are a breeze to keep
up to date. This is a welcome change from the dependency hell of old, where
updating one application's required libraries might break anything, including
the window manager.

### A Versioned Operating System

Although I got pretty far with just flatpaks, I did end up manually installing a
few things. The process is a lot different than I remember. You used to use
your distribution's package manager (`rpm`, `yum`, et cetera) to install stuff
directly into the `/usr` directory, or perhaps into `/usr/local` if you wanted
to keep some things separate from the core operating system.

Fedora (and Bazzite) use [`rpm-ostree`](https://coreos.github.io/rpm-ostree/),
which creates a read-only system image based on the desired packages and
versions. You have to restart to activate changes to the core OS, but you can be
pretty sure that if you install a bad update you can just roll back.

You can also switch back and forth between versions if, for example, you want to
confirm compatibility with particular games or apps. No more upgrading and then
learning what you've lost, as happened so many times on OS X.

In the beginning, I abused `rpm-ostree` a bit, and manually installed all the
old stuff I was used to (VMWare, Docker) that wasn't available as a Flatpak.
Eventually I figured out how I was supposed to be doing these things now
([`Boxes`](https://apps.gnome.org/en-GB/Boxes/) and
[`distrobox`](https://distrobox.it/), respectively).

I ultimately pared down the manual installs to just the things I couldn't get
working in Brew or Flatpak:

1. All Browsers ([Web
   MIDI](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) didn't
   work in the Flatpak versions).
2. 1Password (the browser and command-line integration is better if you use the
   package instead of Flatpak)

I was also used to sloppy stuff like writing directly to `/usr` and
`/usr/local`. The `/usr` filesystem on Bazzite is read-only, and is constructed
based on a series of "overlays" managed using
[`systemd-sysext`](https://www.freedesktop.org/software/systemd/man/latest/systemd-sysext.html).
I've only made changes twice, to fix poorly written packages that expect a
hard-coded path, and the overlay system is easy to use and comforting. All the
little hacky bits are well-contained and easy to keep track of and undo.

### Waydroid

Another new thing (to me) was [Waydroid](https://waydro.id/), which lets you run
Android apps in a window. This gives you another option for apps that are
available on Android but not Linux. At first I hated it, but I think this was
mainly down to not fully engaging with it:

1. I hadn't gone [all the way through the
   setup](https://docs.bazzite.gg/Installing_and_Managing_Software/Waydroid_Setup_Guide/),
   and thus didn't have the Google Play Store and other basics.
2. I hadn't found the settings to [disable the onscreen
   keyboard](https://docs.waydro.id/faq/disable-on-screen-keyboard), which is
   ultra irritating if you have an actual keyboard.
3. I hadn't figured out [how to disable the shortcut to the Waydroid
   calculator](https://www.reddit.com/r/waydroid/comments/1977994/how_to_hide_waydroid_shorcut_app_on_fedora_or_any/),
   and was encountering Waydroid by accident.

Once I engaged with Waydroid enough to smooth out the edges, it felt a lot less
like operating an oddly-sized phone with a remote control. For a single app
(Microsoft To Do), it's fine.

### Wait, HomeBrew is a Linux Thing Now?

When it came time to work with a node project, I was pleasantly surprised to
learn that [HomeBrew is now a thing on
Linux](https://docs.brew.sh/Homebrew-on-Linux). I can manage many command-line
tools and versions just like I did on OS X. I ended up using `brew` to install
various build tools as well as command-line `emacs` (I only know enough `vi` to
ask where the bathroom is).

## Games (and WINE)

Bazzite has been great for the games I use. I mainly run intentionally low-fi
games and older games, which is a fine fit for the GPU I have on my Framework
laptop. However, if I decide to build a gaming machine to play AAA games, I
would still use Bazzite.

There are a bunch of app launchers (Steam, Heroic Launcher, and my current
favourite, [Lutris](https://lutris.net/)). Between them, you can install an
incredible range of games, including from sites like Steam, Good Old Games,
Battle.net, and the Epic Store. You can also manually install games using the
actual windows installers in Lutris (more on that in a bit).

Under the hood, these launchers use
[WINE](https://en.wikipedia.org/wiki/Wine_(software)) and
[Proton](https://github.com/ValveSoftware/Proton) to emulate Windows. With
modern engines like [the Glorious Eggroll version of
Proton](https://github.com/gloriouseggroll/proton-ge-custom), game performance
is comparable to native Windows, at least from what I've seen. But unlike
running on native Windows, you can have multiple WINE install directories, so
you can create little islands for each era of Windows you want to revisit.

WINE is not just for games. Lutris also allows you to install a new program
from a Windows installer. I used this feature to install [Arturia Collection
V](https://www.arturia.com/products/software-instruments/v-collection/overview)
and [Synthesia](https://synthesiagame.com/). Those were some of my last reasons
to reboot into Windows. I've noticed I have to restart WINE when I connect a new
MIDI controller, but given how fast WINE starts, this isn't much of a hardship.

My only early complaint with WINE was the resolution. I have a double-wide
monitor whose native resolution is `3440 x 1400`. Apps designed for older and
smaller monitors were incredibly tiny, and it was a pain getting through the
various microscopic dialogs to get to the point where I could finally set the
in-app resolution to something acceptable.

The breakthrough for me was learning [how to configure the DPI scaling for
WINE](https://askubuntu.com/questions/1337156/how-do-i-set-scaling-in-wine).
With that, most apps were nice and sharp.

### Conclusion

In the beginning, I was rebooting into Windows fairly often to compare
performance and run things I hadn't got working in Bazzite. After nine months,
the only things I still have to boot to Windows to do are:

1. Print to my aging [Ricoh
   Printer](https://support.ricoh.com/bb/html/dr_ut_e/re1/model/sp150/sp150.htm)
2. Watch Apple TV+ content (in my case, movies I've purchased over the years
   from my Apple TV).

This means most of my time is spent in Linux, and it gets more comfortable the
longer I use it. It "just works" a lot more of the the time than it used to, and
when it doesn't, there's almost always a small (and purposeful) learning curve
between me and getting things running. It feels right for me, for now.

Anyway, I'd been meaning to share this for a while and there it is. Thanks for
reading, I hope to post more making content in the next few days. Stay tuned for
what's next.
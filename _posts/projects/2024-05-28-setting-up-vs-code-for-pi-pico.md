---
layout: post
title: Setting Up VS Code for Pi Pico and the Explorer Base
date: '2024-05-28'

type: posts
tags:
- projects
- microcontrollers
---

I got far enough with an early project for the Pi Pico that I really wanted to step through things using VS Code and my [picoprobe](2024-05-27-raspberry-pi-pico-debugger).

Thankfully, [this guide from DigiKey](https://www.digikey.be/en/maker/projects/raspberry-pi-pico-and-rp2040-cc-part-2-debugging-with-vs-code/470abc7efb07432b82c95f6f67f184c0) is almost exactly what I needed. I followed that with only a couple of extra steps.

## Building / Installing `openocd`

You need a custom version of openocd to work with the picoprobe. Most of their instructions for building were fine, but you couldn't actually run or install the binary. To fix this, I had to install additional libraries to run `openocd`, which I did using a command like:

`brew install libftdi hidapi capstone`

Once that was done, I was able to run `make install` from the source directory to put the binary and configuration files in `/usr/local/bin`.

## Configuring VS Code

Their instructions for setting up VS Code were mostly sound. However, with their settings, the debug still failed to launch `openocd`. 

First, as suggested in [this issue](https://github.com/raspberrypi/debugprobe/issues/48), I needed to use the `cmsis-dap` configuration instead of `picoprobe`.

Second, based on [this thread](https://forums.raspberrypi.com/viewtopic.php?t=346055), I had to add a `openOCDLaunchCommands` option to set the adapter speed.

Finally, their guide also  uses the deprecated `runToMain` setting in the VS Code settings file `.vs_code/launch.json`.  This doesn't cause problems, but I don't like walking past a warning all the time.

Take altogether, my working `launch.json` file now looks like:

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Pico Debug",
            "cwd": "${workspaceRoot}",
            "executable": "${command:cmake.launchTargetPath}",
            "request": "launch",
            "type": "cortex-debug",
            "servertype": "openocd",
            "gdbPath": "arm-none-eabi-gdb",
            "device": "RP2040",
            "configFiles": [
                "interface/cmsis-dap.cfg",
                // https://github.com/raspberrypi/debugprobe/issues/48
                // "interface/picoprobe.cfg",
                "target/rp2040.cfg"
            ],
            "svdFile": "${env:PICO_SDK_PATH}/src/rp2040/hardware_regs/rp2040.svd",
            "runToEntryPoint": "main",
            "openOCDLaunchCommands": ["adapter speed 5000"],
            // Work around for stopping at main on restart
            "postRestartCommands": [
                "break main",
                "continue"
            ]
        }
    ]
}

```

## Conclusion

With that, I was able to launch debugging sessions from VS Code and step through my program's operation. The defaults are exactly what I wanted, you stop at the beginning of your `main` function automatically.

Given that I'm now using `cmsis-dap`, I might actually not need to build the custom branch of `openocd`. If I need to go through the setup again, I would try using a packaged version first just to see.

Anyway, if you read all of this, hope it was at least somewhat helpful.

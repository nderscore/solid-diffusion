# Solid Diffusion

Minimalist web-based interface for Stable Diffusion with persistant storage in the browser, built with SolidJS.

This project is an **__alpha test__**. It has not been heavily stress-tested, and is likely to change in the future as the backend dependencies continue to evolve.

Come back later when it's done-er for the best experience!

## Screenshots

<div align="center">
  <img src="./screenshots/alpha.png" alt="Screenshot" />
  <img src="./screenshots/alpha-light.png" alt="Screenshot" />
  <img src="./screenshots/alpha-mobile.png" alt="Screenshot" />
</div>

## Features

* Full-width fluid layout on any screen size (mobile-friendly & monster-monitor-friendly)
* Dream queueing (don't wait - schedule multiple dreams to happen in sequence)
* Persistent settings (in local storage)
* Persistent dream storage (in IndexedDB)
* Image-to-image input with preview
* Pipe images from dream log into image input
* Ability to reproduce exact settings from logged dreams
* Copy (Image / Prompt / Settings) to clipboard
* Multiple themes (thanks [daisyUI](https://daisyui.com)!)

### Planned features

* Quick save/load of settings
* Queue management (cancel queued or in-progress dreams)
* Basic image editing
* Variants
* Inpainting?
* Error handling? 😅
* More...?

## Installation

### Prerequisites

Solid Diffusion is only a frontend, so it requires another piece of software to do the dreaming.

Currently, only the [lstein fork](https://github.com/lstein/stable-diffusion/) of Stable Diffusion is supported. 

You must **already have this configured and working** before you can set up Solid Diffusion.

### Setup instructions

1. Download the latest build of `index.html` from [Releases](https://github.com/nderscore/solid-diffusion/releases)

1. Copy it into the `static/dream_web/` of your lstein `stable-diffusion`

1. Launch the dream server with the `--web` flag: `python scripts/dream.py --web`

1. Visit the address that appears in the terminal in your browser.

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) for contributing information.

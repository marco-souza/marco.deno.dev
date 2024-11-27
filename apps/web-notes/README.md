# Tampermonkey web-notes

[![Quality Gateway](https://github.com/marco-souza/web-notes/actions/workflows/quality-gateway.yml/badge.svg)](https://github.com/marco-souza/web-notes/actions/workflows/quality-gateway.yml)
[![Release](https://github.com/marco-souza/web-notes/actions/workflows/gh-release.yml/badge.svg)](https://github.com/marco-souza/web-notes/actions/workflows/gh-release.yml)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

Tampermonkey script which gives you a code review checklist for your pull
requests.

## Tech Stack

![SolidJS](https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=c8c9cb)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

## Features

- check items you already review
- send comments to the pull request

## Installation

1. Install Tampermonkey
2. Create a script (develop or production)

### Building a dev script

```bash
deno Install
deno task dev
```

### Building a production script

```bash
deno install
deno task build
deno preview
```

## Usage

1. Open a pull request
2. Open the review button
3. Check the items you review

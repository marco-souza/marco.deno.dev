---
title: Migrating from Solid-Start to Fresh
description: This migration is deprecating Node.js in favor of Deno, with the amazing Fresh framework 🍋
author: Marco Antonio
email: marco@tremtec.com
author_url: https://marco.tremtec.com
created_at: 09-20-2023
---

![And here we are again](https://deno.com/blog/fresh-1.4/lemon.jpg)

# Migrating a SolidJS App to Deno with "fresh"

Migrating my SolidJS app to Deno using the "fresh" module was a challenging but
rewarding experience. Here's how it went:

## Difficulties Encountered

- **Module Compatibility**: Adapting existing SolidJS modules to work seamlessly
  with Deno required adjustments due to differences in the module system and
  APIs.

- **Third-Party Dependencies**: Some third-party dependencies used in my SolidJS
  app were not readily available in Deno. I had to find compatible alternatives
  or make necessary modifications.

- **Build Process**: The build process needed modifications to align with Deno's
  approach, especially in handling imports and bundling.

## Changes Made

- **Updating Imports**: Adjusted import paths to work with Deno's module
  resolution system, ensuring all modules were fetched correctly.

- **Refactoring**: Restructured the codebase to better fit Deno's conventions
  and take advantage of its runtime features.

- **Dependency Management**: Reviewed and updated dependencies to versions
  compatible with Deno, and utilized Deno-specific modules where necessary.

## Overall Experience

The migration was a valuable learning experience. While it presented challenges,
it allowed me to understand the strengths and differences of Deno compared to
traditional setups. The "fresh" module proved to be a useful tool for running
and managing the app, making the migration smoother than anticipated.

## Conclusion

Migrating a SolidJS app to Deno with the "fresh" module was a step towards
embracing modern technologies and improving the project's overall
maintainability. Despite the initial hurdles, the benefits of Deno's secure and
efficient runtime, coupled with the developer-friendly "fresh" module, made the
effort well worth it. I look forward to leveraging Deno's capabilities in future
projects.

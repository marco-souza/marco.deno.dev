---
title: Migrating from SolidJS to Solid-Start
summary: Hi there 👋, this is the second post of my blog made with SolidJS, TailwindCSS and Github Actions. It explains how did I migrated the original blog to solid-start
author: Marco Antonio
email: marco@tremtec.com
author_url: https://marco.tremtec.com
created_at: 04-10-2023
---

![And here we are again](https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)

I recently migrated my web application from SolidJS to Solid-Start, a starter kit for building SolidJS applications. Here's a rundown of the changes I made:

- **Update dependencies:** I updated my project dependencies to match those of Solid-Start, which included newer versions of SolidJS and other packages.

- **Setup Solid-Start:** I followed the Solid-Start documentation to set up my application with its recommended folder structure and build tools.

- **Reuse components:** I reused components such as the Home and NotFound pages, which required some minor adjustments to match the Solid-Start structure.

- **Share components:** I refactored my code to share components between pages where possible. For example, I moved the meta data to the root.tsx layout to avoid duplication.

- **Add 404 page:** I added a 404 page to handle non-existent routes.

- **Local plugins:** I set up local plugins for Solid-Start to extend its functionality.

- **Separate PR workflow:** I added a separate workflow for pull requests to ensure that tests were run before merging.

- **Rename PR job:** I renamed the job for pull request workflows to better reflect its purpose.

- **Run on pull request created:** I configured my GitHub Action to run on pull requests created, in addition to pushes.

- **Migrate to Solid-Start:** I replaced my SolidJS implementation with the equivalent Solid-Start implementation, making any necessary changes to fit the new structure.

Overall, the migration to Solid-Start was a smooth process, and I'm pleased with the result. If you're looking to build a SolidJS application, I'd definitely recommend checking it out!

You can check the Pull Request [here](https://github.com/marco-souza/marco-souza.github.io/pull/20).

## Reference

- <https://dev.to/lexlohr/using-solid-start-with-github-pages-3iok>


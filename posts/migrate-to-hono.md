---
title: Migrating from Fresh to Hono 🔥
description: On the road to a more powerful and flexible blog, I'm migrating from Fresh to Hono, a Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.
author: Marco Antonio
email: marco@tremtec.com
author_url: https://marco.podcodar.com
created_at: 10-20-2024
---

![And here we are again, migrating to a new framework](https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?q=80&w=1024&auto=format&fit=crop)

# Migrating from Fresh to Hono 🔥

## Why do you migrate your personal site so often?

I wanted to start addressing this question because I've been migrating my blog for a few year now, and I think it's important to share the reasons behind it.

The main reason is that I like to experiment with new technologies and frameworks. I believe that by doing so, I can learn new things and improve my skills as a developer. I also think that it's important to stay up-to-date with the latest trends in the industry, and migrating my blog is a way for me to do that.

Another reason is that I like to challenge myself. Migrating my blog to a new framework is not an easy task, and it requires a lot of time and effort. But I enjoy the process, and I find it rewarding to see the end result.

Finally, I think that migrating my blog is a way for me to showcase my work. By sharing the process of migrating my blog, I can show others what I'm capable of and what I've learned along the way.

## Why Hono this time?

Hono is similar to express, a lightweight and flexible framework that allows me to build powerful web applications. It's built on web standards and supports any JavaScript runtime, which makes it a great choice for my blog.

Instead of using a bloated and opinionated framework, I wanted to use something that gives me more control over my code and allows me to build things the way I want. Hono provides me with the flexibility I need to create a blog that meets my requirements.

Hono also is fast, efficient and easy to deploy, and now Deno offers a great compatibility with Node.js packages, such as `remark`, which I'm using to generate my blog posts.

### HTMX

I'm also using HTMX to make my blog more interactive. HTMX is a library that allows me to create dynamic web applications using HTML, CSS, and almost no JavaScript. It's lightweight and easy to use, and it provides me with the tools I need to build a modern and responsive app.

HTMX is a great addition to Hono, and it allows me to create a blog that is fast, efficient, and user-friendly.

### JSX

I'm using JSX, which is supported by Hono out of the box, but I'm **not using client components**. I'm using JSX as a Server-Side template engine, and when I need some JS, I add it as callback functions that changes DOM directly, no shadow DOM, no virtual DOM, just plain old DOM manipulation.

## Overall experience

Migrating my blog to Hono was a great experience. It allowed me to learn new things, improve my skills, and create a blog that meets my requirements. Hono is a powerful and flexible framework that gives me the control I need to build things the way I want.

I also found it faster to build, extensible, and a great tool for the Deno stack.

The only thing I missed was some kind of **macro** or building tool. We have `deno compile` which doesn't work with NPM packages, but even if it worked, I'd still to generate code in build time 🥲. But I think I can live without it for now.

## What comes next?

Not a `Next.js` app, for sure 😂.

Honestly, I'm happy with Hono, and I think I'll stick with it for a while. When
I get bored, I'll probably migrate to something else, but for now, I'm happy
with what I have.

You can check the code [here](https://github.dev/marco-souza/marco.deno.dev).

Thanks for reading! 🚀

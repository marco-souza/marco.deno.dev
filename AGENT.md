# Agent Protocol

This document provides operational directives for AI agents interacting with this repository.

## 1. Project Goal

To develop and maintain a fast, dynamic, and responsive personal website using Deno, Hono, HTMX, and Tailwind CSS.

## 2. Core Technologies

- **Runtime**: Deno
- **Web Framework**: Hono
- **UI (Dynamic Content)**: HTMX
- **Styling**: Tailwind CSS with DaisyUI
- **Database**: Deno KV (accessed via Dengo)
- **Environment**: direnv

## 3. Operational Commands

Execute these commands via `deno task <command>`.

- `start`: Runs the development server.
- `test`: Runs all unit tests. **Mandatory before finalizing any changes.**
- `fmt`: Formats the entire project. **Mandatory before finalizing.**
- `lint`: Lints the codebase. **Mandatory before finalizing.**

## 4. File Structure Map

- `main.ts`: Application entry point. Initializes Hono.
- `deno.jsonc`: Project configuration, dependencies, and task definitions.
- `tailwind.config.ts`: Configuration for Tailwind CSS.
- `styles.css`: Input file for Tailwind CSS processing.
- `/components/`: Reusable server-side UI components (e.g., JSX for HTMX).
- `/routes/`: API and page-level routing logic.
- `/public/`: Static assets (images, fonts, etc.).

## 5. Agent Directives & Persona

### Persona

You are an expert software engineer specializing in Deno, Hono, and modern web development. Your code must be clean, efficient, well-documented, and align with the project's existing patterns. You are a collaborative assistant focused on precision and quality.

### Rules of Engagement

1.  **Analyze First**: Before writing or modifying code, always analyze the provided context, file structure, and existing code to understand the patterns and conventions.
2.  **Adhere to Style**: Strictly follow the existing coding style, formatting (`deno fmt`), and linting (`deno lint`) rules.
3.  **Verify All Changes**: Before concluding your task, you **must** run `deno test`, `deno fmt`, and `deno lint` to ensure code quality, functionality, and consistency. Report any errors.
4.  **Be Concise**: Keep your reasoning, explanations, and commit messages clear, direct, and focused on the technical changes.
5.  **No New Dependencies**: Do not add or suggest new external dependencies unless explicitly instructed to do so.
6.  **Atomic Changes**: Focus exclusively on the files and logic relevant to the assigned task. Do not refactor or modify unrelated code.
7.  **Ask for Clarification**: If a request is ambiguous or lacks context, ask for clarification before proceeding.


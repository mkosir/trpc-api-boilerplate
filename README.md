# tRPC API Boilerplate ![Heisenberg](https://raw.githubusercontent.com/mkosir/trpc-fe-boilerplate-vite/main/misc/heisenberg_75.png)

[![CI][ci-badge]][ci-url]

Minimal [tRPC](https://trpc.io/) API boilerplate for projects with separate backend and frontend repositories. Easily publish fully typesafe APIs that any frontend can consume.

Monorepos are great, but sometimes the architecture requires separating the backend and frontend into distinct repositories.

### Why use this?

This boilerplate is ideal when you want to separate:

- **Domain/business logic** – expose only what needs to be exposed through the API.
- **Developer responsibilities** – for larger teams/companies.
- **CI/CD pipelines** – manage PRs, issues, and deployments independently.

## Running

_Easily set up a local development environment_

- Fork & clone the repo
- Run `npm install`
- Make changes to the tRPC API
- Push - a new [package](https://www.npmjs.com/package/trpc-api-boilerplate) is released 📦 [![npm version][npm-badge]][npm-url]
- In your frontend app, install it `npm install trpc-api-boilerplate`

## Example Repos

Example frontend app repositories:

- [tRPC Frontend Boilerplate](https://github.com/mkosir/trpc-fe-boilerplate-vite) - Vite
- [tRPC Frontend Boilerplate](https://github.com/mkosir/trpc-fe-boilerplate-next) - Next.js

### Avoid publishing the package?

If for whatever reason publishing a package is not an option:

- privacy concerns
- faster development iterations - skip CI
- ...

Use the repository to share types by running `npm run trpc-api-export` and push code changes.  
In your [frontend app](https://github.com/mkosir/trpc-fe-boilerplate-vite/blob/main/package.json#L7), consume types by running `npm run trpc-api-import`.

<!-- Badges -->

[ci-badge]: https://github.com/mkosir/trpc-api-boilerplate/actions/workflows/main.yml/badge.svg
[ci-url]: https://github.com/mkosir/trpc-api-boilerplate/actions/workflows/main.yml
[npm-url]: https://www.npmjs.com/package/trpc-api-boilerplate
[npm-badge]: https://img.shields.io/npm/v/trpc-api-boilerplate.svg

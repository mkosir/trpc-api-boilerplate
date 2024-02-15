# tRPC API Boilerplate ![Heisenberg](https://raw.githubusercontent.com/mkosir/trpc-fe-boilerplate-vite/main/misc/heisenberg_75.png)

[![CI][ci-badge]][ci-url]

Minimal [tRPC](https://trpc.io/) API boilerplate for separate BE-FE repositories. Easily publish fully typesafe APIs that any frontend can consume.

Monorepos are great, but sometimes we are targeting backend and frontend as separate (mono)repositories.

We might aim for backend and frontend repositories separation of:

- domain/business logic - expose only what need to be exposed through API.
- developers - larger teams/companies.
- CI/CD pipelines, PRs, issues, etc.

... in that case checkout this boilerplate.

## Running

_Easily set up a local development environment_

- fork & clone repo
- `npm install`
- make changes to tRPC API & push - new [package](https://www.npmjs.com/package/trpc-api-boilerplate) is released 📦 [![npm version][npm-badge]][npm-url]
- install newly released package `npm install trpc-api-boilerplate` in any frontend app 🚀

## Example Repo

Example frontend app repositories:

- [tRPC Frontend Boilerplate](https://github.com/mkosir/trpc-fe-boilerplate-vite) - Vite
- [tRPC Frontend Boilerplate](https://github.com/mkosir/trpc-fe-boilerplate-next) - Nextjs

### Avoid publishing package?

If for whatever reason publishing a package is not an option:

- privacy concerns
- faster development iterations - skip CI
- ...

Use repository to share types by running `npm run trpc-api-export` and push code changes.  
In your [frontend app](https://github.com/mkosir/trpc-fe-boilerplate-vite/blob/main/package.json#L7) consume types by running `npm run trpc-api-import`.

<!-- Badges -->

[ci-badge]: https://github.com/mkosir/trpc-api-boilerplate/actions/workflows/CI.yml/badge.svg
[ci-url]: https://github.com/mkosir/trpc-api-boilerplate/actions/workflows/CI.yml
[npm-url]: https://www.npmjs.com/package/trpc-api-boilerplate
[npm-badge]: https://img.shields.io/npm/v/trpc-api-boilerplate.svg

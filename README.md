# tRPC API Boilerplate ![Heisenberg](https://raw.githubusercontent.com/mkosir/trpc-fe-boilerplate/main/misc/heisenberg_75.png)

[![CI][ci-badge]][ci-url]
[![npm version][npm-badge]][npm-url]

Minimal [tRPC](https://trpc.io/) API boilerplate for separate BE-FE repositories. Easily publish fully typesafe APIs that any frontend can consume.

Monorepos are great, but sometimes we are targeting backend and frontend as separate (mono)repositories:

- separation/encapsulation of backend and frontend domain (except what must be exposed to both through API).
- separation of backend and frontend developers (larger teams/companies).
- separation of backend and frontend CI/CD pipelines, PRs, issues, etc.

... in that case checkout this boilerplate.

## Running

_Easily set up a local development environment_

- fork & clone repo
- `npm install`
- make changes to tRPC API & push - new [package](https://www.npmjs.com/package/trpc-api-boilerplate) is released 📦
- `npm install trpc-api-boilerplate` in any frontend app 🚀

## Example Repo

Example frontend app repository - [tRPC Frontend Boilerplate](https://github.com/mkosir/trpc-fe-boilerplate)

### Avoid publishing package?

If for whatever reason publishing a package is not an option:

- privacy concerns
- faster development iterations - skip CI
- ...

Use:

- npm link
- run `npm run trpc-api-export` and push code changes. In your [frontend app](https://github.com/mkosir/trpc-fe-boilerplate/blob/main/package.json#L6) run `npm run trpc-api-import`.

<!-- Badges -->

[ci-badge]: https://github.com/mkosir/trpc-api-boilerplate/actions/workflows/CI.yml/badge.svg
[ci-url]: https://github.com/mkosir/trpc-api-boilerplate/actions/workflows/CI.yml
[npm-url]: https://www.npmjs.com/package/trpc-api-boilerplate
[npm-badge]: https://img.shields.io/npm/v/trpc-api-boilerplate.svg

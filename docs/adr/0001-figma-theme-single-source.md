# This repo is the single publisher of @thinkbuff/figma-theme

`@thinkbuff/figma-theme` existed in two places with the same package name: this repo (UnoCSS preset, published as 0.0.x) and the `thinkbuff/platform` monorepo (Tailwind CSS v4 rewrite with generated utilities and a token sync pipeline, source-only, never published). We port the platform implementation into `packages/theme` here and make this repo the only place the package is built and published; platform will later consume the published package instead of its own copy. The UnoCSS preset export (`./unocss`) is dropped, not kept alongside, so the theme has one utility contract shared by the React and Vue component libraries.

## Considered Options

- Rewrite a Tailwind theme independently in this repo: rejected, would fork the utility contract from platform's Vue `figma-ui`.
- Depend on platform's package: rejected, it ships TypeScript sources with no build and lives in a private-app monorepo.
- Keep both UnoCSS and Tailwind exports: rejected, doubles the surface to maintain and test for no current consumer.

## Consequences

- Until platform is switched over, the two copies can drift; token changes must be made here first.
- Removing `./unocss` is a breaking change for existing consumers (released as 0.1.0).

# Gnosis Docs

What are these docs about...

## Installation

> You have to be on Node >= 8.x and Yarn >= 1.5.

```sh
yarn i
```

## Run website

```sh
cd website
yarn i
```
# Run it for development
```
yarn start

# It you want to try with a different base url
BASE_URL=/ yarn start
```

**Gotchas**: If in production you have some issues displaying some images, and it doesn't reproduce in the local dev
server, try to add a `/` at the end of the problematic URL. Docusaurus v1 can have issues serving static files from
those URLs.

# Build for production

```bash
yarn build
```

It's a good idea to preview the production version, because there can be small differences with the development one -
especially concerning resource paths and links:

```bash
# Build and run app changing the base url
yarn build && \
  rm -rf protocol && \
  mv build/dfusion-docs protocol \
  && npx serve .
```

Then access <http://localhost:5000/protocol/>

## More info

Look under [website folder](website/README.md) or [Docusauros Official Docs](https://docusaurus.io/docs/en/site-creation)

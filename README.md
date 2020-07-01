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

# Run it for development
yarn start

# It can be convenient to make sure the paths and links are ok even when we change the base url
BASE_URL=/protocol/ yarn start
```

# Build for production

```bash
yarn build
```

It's a good idea to preview the production version, because there can be small differences with the development,
specially related to resource paths and links:

```bash
# Build and run app changing the base url
BASE_URL=/protocol/ yarn build && \
  rm -rf protocol && \
  mv build/dfusion-docs protocol \
  && npx serve .
```

Then access <http://localhost:5000/protocol>

## More info

Look under [website folder](website/README.md) or [Docusauros Official Docs](https://docusaurus.io/docs/en/site-creation)

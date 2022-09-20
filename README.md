# MetaMask API Playground

This repo uses https://github.com/MetaMask/api-specs to provide a playground to interact with MetaMask.

## Developing

Uses Gatsby.js. [Getting your development environment set up](https://www.gatsbyjs.com/docs/tutorial/part-0/).

- Install node.js if you don't have it. Version 14.17.5
- Install Gatsby if you don't have it:`npm i -g gatsby-cli`
- Install yarn if you don't have it:`npm i -g yarn`
- Install dependencies: `yarn setup`.
- Start your development environment: `yarn run develop`.

Once you have Gatsby installed, you should be able to `yarn run develop` and get going.

If you have issues with the `sharp` module, one of these might help:
- `npm rebuild --verbose sharp`
- on OSX: `brew install vips`


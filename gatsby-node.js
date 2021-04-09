/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const MetamaskOpenRPCDocument = require('@metamask/api-specs').default;
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// get OpenRPC Document at build time
const resultData = JSON.stringify(MetamaskOpenRPCDocument);

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // deref doc
  // create node for build time openrpc document on the site
  createNode({
    openrpcDocument: resultData,
    // required fields
    id: `openrpcDocument`,
    parent: null,
    children: [],
    internal: {
      type: `OpenrpcDocument`,
      contentDigest: createContentDigest(resultData),
    },
  })
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-json-view/,
            use: loaders.null(),
          },
          {
            test: /monaco-editor/,
            use: loaders.null(),
          },
          {
            test: /monaco-vim/,
            use: loaders.null(),
          },
          {
            test: /@open-rpc\/inspector/,
            use: loaders.null(),
          },
        ],
      },
    });
  } else {
    actions.setWebpackConfig({
      plugins: [
        new MonacoWebpackPlugin({
          // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
          languages: ["json"]
        }),
      ],
    })
  }
}

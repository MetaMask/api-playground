/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-json-view/u,
            use: loaders.null(),
          },
          {
            test: /monaco-editor/u,
            use: loaders.null(),
          },
          {
            test: /monaco-vim/u,
            use: loaders.null(),
          },
          {
            test: /@open-rpc\/inspector/u,
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
          languages: ['json'],
        }),
      ],
    });
  }
};

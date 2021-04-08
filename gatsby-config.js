
module.exports = {
  pathPrefix: "/api-playground",
  siteMetadata: {
    title: 'Metamask JSON-RPC API',
    description: 'This API lets you interact with an Ethereum Network via Metamask',
    logoUrl: 'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
    primaryColor: '#3f51b5', //material-ui primary color
    secondaryColor: '#f50057', //material-ui secondary color
    author: '',
    menuLinks: [
      {
        name: 'Home',
        link: '/',
        ignoreNextPrev: true
      },
      {
        name: 'API Documentation',
        link: '/api-documentation'
      }
    ],
    footerLinks: [
      {
        name: 'Metamask',
        link: 'https://metamask.io'
      }
    ]
  },
  plugins: [
    "@xops.net/gatsby-openrpc-theme",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'api-playground',
        short_name: 'api-playground',
        start_url: '/',
        background_color: 'transparent',
        theme_color: '#3f51b5',
        display: 'minimal-ui',
        icon: 'src/images/metamask-fox.svg', // This path is relative to the root of the site.
      },
    }
  ],
}

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  /* Your site config here */

  plugins: [
    "gatsby-plugin-typescript",
    `gatsby-plugin-material-ui`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "lolly",
        // This is field under which it's accessible
        fieldName: "getAllLollies",
        // Url to query from
        url:
          "https://k6e6bccvlbh3pd5fzkfmogvrxm.appsync-api.us-east-2.amazonaws.com/graphql",
          headers: {
            "x-api-key": "da2-iqnqo5od7nfanbt3sr2q7pnb4a"
          }
      },
    },
  ],
}

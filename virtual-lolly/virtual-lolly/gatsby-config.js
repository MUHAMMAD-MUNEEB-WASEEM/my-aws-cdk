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
          "https://b2oxv2fz4ze6hj44gruvu54vei.appsync-api.us-east-2.amazonaws.com/graphql",
          headers: {
            "x-api-key": "da2-z2l7yqpts5dz5dn2ulgmywacxa"
          }
      },
    },
  ],
}

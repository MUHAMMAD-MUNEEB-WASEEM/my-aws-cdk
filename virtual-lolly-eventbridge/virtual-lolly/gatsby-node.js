const path = require("path")
exports.createPages = async function ({ graphql, actions }) {
  const { createPage } = actions
  const result = await graphql(`
      query MyQuery{
        getAllLollies {
          getLollies {
            color1
            color2
            color3
            link
            sender
            reciever
            message
          }
        }
      }
  `)

  result.data.getAllLollies.getLollies.map((d) => {
      createPage({
          path: `${d.link}`,
          component: path.resolve("./src/templates/template.tsx"),
          context: {
            color1: d.color1,
            color2: d.color2,
            color3: d.color3,
            link: d.link,
            message: d.message,
            sender: d.sender,
            reciever: d.reciever,
          }
      })
  })
  console.log("End of Gatsby Node File");
}
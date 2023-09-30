const gremlin = require('gremlin')
// const order = gremlin.process.order;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
const Graph = gremlin.structure.Graph
const uri = process.env.READER
const { order: { desc , asc} } = gremlin.process;
const { P: { gt } } = gremlin.process;


const nearestHRRestaurant = async (city:String) => {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {})
    const graph = new Graph()
    const g = graph.traversal().withRemote(dc)
    try {
      let data = await g.V().hasLabel('restaurant').has('rating', gt(4)).has('city', city).toList()
      let posts = Array()

      for (const v of data) {
        const _properties = await g.V(v.id).properties().toList()
        let post = _properties.reduce((acc, next) => {
          acc[next.label] = next.value
          return acc
        }, {})
        post.id = v.id
        posts.push(post)
      }
                
      dc.close()
      return posts
    } catch (err) {
        console.log('ERROR', err)
        return null
    }
}



export default nearestHRRestaurant
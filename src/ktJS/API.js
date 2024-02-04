import { STATE } from './STATE.js'
import { CACHE } from './CACHE.js'
import { DATA } from './DATA.js'
import { UTIL } from './UTIL.js'


// 加载、实例化树
function initTree() {
  const treeMeshArr = []

  DATA.groundEdgeArr.forEach(e => {
    const area = UTIL.calculatePolygonArea(e)
    const edgePoints = UTIL.generatePointsOnPolygonEdge(e, area / 300000)
    const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10

    for (let i = 0, len = area / 100000; i < len; i++) {
      const position = UTIL.generateRandomPointInPolygon(e)
      const newTree = CACHE.originTreeArr[0].clone()

      newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
      newTree.position.set(position[0], 0, position[1])
      newTree.rotation.y = Math.random() * 3.14
      treeMeshArr.push(newTree)
    }

    for (let i = 0; i < edgePoints.length; i++) {
      const newTree = CACHE.originTreeArr[0].clone()
      const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10

      newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
      newTree.position.set(edgePoints[i][0], 0, edgePoints[i][1])
      newTree.rotation.y = Math.random() * 3.14
      treeMeshArr.push(newTree)
    }
  })

  treeMeshArr.push(...CACHE.originTreeArr)
  UTIL.instantiationSingleInfo(treeMeshArr, 'tree')
  treeMeshArr.splice(0, treeMeshArr.length)
}


export const API = {
  initTree
}

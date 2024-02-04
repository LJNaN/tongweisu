import { STATE } from './STATE.js'
import { CACHE } from './CACHE.js'
import { DATA } from './DATA.js'
import { UTIL } from './UTIL.js'


// 加载、实例化树
function initTree() {
  const treeMeshArr = []
  let tempNewTree = null

  DATA.groundEdgeArr.forEach(e => {
    for (let i = 0; i < 200; i++) {
      const position = UTIL.generateRandomPointInPolygon(e)
      const newTree = CACHE.originTreeArr[0].clone()
      newTree.scale.set(DATA.sceneScale / 2, DATA.sceneScale / 2, DATA.sceneScale / 2)
      newTree.position.set(position[0], 0, position[1])
      treeMeshArr.push(newTree)

      if (!tempNewTree) {
        tempNewTree = newTree.clone()
      }
    }
  })

  treeMeshArr.push(...CACHE.originTreeArr)
  UTIL.instantiationSingleInfo(treeMeshArr, 'tree')
  treeMeshArr.splice(0, treeMeshArr.length)
}


export const API = {
  initTree
}

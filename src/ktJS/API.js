import { STATE } from './STATE.js'
import { CACHE } from './CACHE.js'
import { DATA } from './DATA.js'
import { UTIL } from './UTIL.js'
import { SimplifyModifier } from '@/assets/js/SimplifyModifier.js';


// 加载、实例化树
function initTree() {
  const treeArr1 = []
  const treeArr2 = []
  const singleTree = STATE.sceneList.singleTree.children[0].clone()

  const modifier = new SimplifyModifier()
  const mainTree = STATE.sceneList.mainTree.children[0].clone()
  const count = Math.floor(mainTree.geometry.attributes.position.count * 0.34)
  mainTree.geometry = modifier.modify(mainTree.geometry, count)
  
  DATA.groundEdgeArr.forEach((e, index) => {
    const area = UTIL.calculatePolygonArea(e)
    const edgePoints = UTIL.generatePointsOnPolygonEdge(e, area / 300000)
    const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10

    if ([0, 1, 2, 3, 8, 16, 19, 20].includes(index)) {
      for (let i = 0, len = area / 100000; i < len; i++) {
        const position = UTIL.generateRandomPointInPolygon(e)
        const newTree = mainTree.clone()
        newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
        newTree.position.set(position[0], 0, position[1])
        newTree.rotation.y = Math.random() * 3.14
        treeArr1.push(newTree)
      }


      for (let i = 0; i < edgePoints.length; i++) {
        const newTree = mainTree.clone()
        const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10
        newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
        newTree.position.set(edgePoints[i][0], 0, edgePoints[i][1])
        newTree.rotation.y = Math.random() * 3.14
        treeArr1.push(newTree)
      }

    } else {
      for (let i = 0, len = area / 50000; i < len; i++) {
        const position = UTIL.generateRandomPointInPolygon(e)
        const newTree = singleTree.clone()
        newTree.scale.set(randomScale / 0.7, randomScale / 0.7, randomScale / 0.7)
        newTree.position.set(position[0], 0, position[1])
        newTree.rotation.y = Math.random() * 3.14
        treeArr2.push(newTree)
      }

      for (let i = 0; i < edgePoints.length; i++) {
        const newTree = singleTree.clone()
        const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10
        newTree.scale.set(randomScale / 0.7, randomScale / 0.7, randomScale / 0.7)
        newTree.position.set(edgePoints[i][0], 0, edgePoints[i][1])
        newTree.rotation.y = Math.random() * 3.14
        treeArr2.push(newTree)
      }
    }
  })


  CACHE.originTreeArr.forEach(e => {
    const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10
    const newTree = mainTree.clone()
    newTree.scale.set(randomScale / 3, randomScale / 3, randomScale / 3)
    newTree.position.set(e.position.x, 0, e.position.z)
    newTree.rotation.y = Math.random() * 3.14
    treeArr1.push(newTree)
  })
  UTIL.instantiationSingleInfo(treeArr1, 'tree1')
  CACHE.originTreeArr.splice(0, CACHE.originTreeArr.length)

  UTIL.instantiationSingleInfo(treeArr2, 'tree2')
  treeArr2.splice(0, treeArr2.length)
}


export const API = {
  initTree
}

import { STATE } from './STATE.js'
import { CACHE } from './CACHE.js'
import { DATA } from './DATA.js'
import { UTIL } from './UTIL.js'
import { mergeGeometries } from '@/assets/js/BufferGeometryUtils'


// 加载、实例化树
function initTree() {
  const treeArr1 = []
  const treeArr2 = []
  const singleTree = STATE.sceneList.singleTree.children[0].clone()
  singleTree.material.alphaToCoverage = true
  const geo = []
  let material = null

  DATA.groundEdgeArr.forEach((e, index) => {
    const area = UTIL.calculatePolygonArea(e)
    const edgePoints = UTIL.generatePointsOnPolygonEdge(e, area / 300000)
    const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10

    for (let i = 0, len = area / 100000; i < len; i++) {
      const position = UTIL.generateRandomPointInPolygon(e)
      const newTree = CACHE.originTreeArr[0].clone()
      const g = newTree.geometry.clone()
      newTree.geometry = g
      if (!material) {
        material = CACHE.originTreeArr[0].material.clone()
      }

      newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
      newTree.position.set(position[0], 0, position[1])
      newTree.rotation.y = Math.random() * 3.14
      newTree.updateMatrix()
      const newGeometry = newTree.geometry.applyMatrix4(newTree.matrix)
      geo.push(newGeometry)
    }

    // if ([0].includes(index)) {
    //   // if ([0, 1, 2, 3, 8, 16, 19, 20].includes(index)) {




    //   // for (let i = 0, len = area / 1000000; i < len; i++) {
    //   //   const position = UTIL.generateRandomPointInPolygon(e)
    //   //   const newTree = CACHE.originTreeArr[0].clone()

    //   //   newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
    //   //   newTree.position.set(position[0], 0, position[1])
    //   //   newTree.rotation.y = Math.random() * 3.14
    //   //   treeArr1.push(newTree)
    //   // }

    // } else {
    //   // for (let i = 0, len = area / 100000; i < len; i++) {
    //   //   const position = UTIL.generateRandomPointInPolygon(e)
    //   //   const newTree = singleTree.clone()

    //   //   newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
    //   //   newTree.position.set(position[0], 0, position[1])
    //   //   newTree.rotation.y = Math.random() * 3.14
    //   //   treeArr2.push(newTree)
    //   // }
    // }



    // for (let i = 0; i < edgePoints.length; i++) {
    //   const newTree = singleTree.clone()
    //   const randomScale = DATA.sceneScale * Math.floor(Math.random() * 5 + 10) / 10

    //   newTree.scale.set(randomScale / 1.5, randomScale / 1.5, randomScale / 1.5)
    //   newTree.position.set(edgePoints[i][0], 0, edgePoints[i][1])
    //   newTree.rotation.y = Math.random() * 3.14
    //   treeArr2.push(newTree)
    // }
  })



  console.log('geo: ', geo);
  const merged = mergeGeometries(geo)
  const mergedMesh = new Bol3D.Mesh(merged, material)
  CACHE.container.scene.add(mergedMesh)

  // treeArr1.push(...CACHE.originTreeArr)
  // UTIL.instantiationSingleInfo(treeArr1, 'tree1')
  // CACHE.originTreeArr.splice(0, CACHE.originTreeArr.length)

  // UTIL.instantiationSingleInfo(treeArr2, 'tree2')
  // treeArr2.splice(0, treeArr2.length)
}


export const API = {
  initTree
}

import { API } from './API.js'
import { UTIL } from './UTIL.js'
import { CACHE } from './CACHE.js'
import { STATE } from './STATE.js'
import { DATA } from './DATA.js'

let container

// 通过配置文件加载
export const loadSceneByJSON = ({ domElement, callback }) => {
  fetch(`${STATE.PUBLIC_PATH}/editor/bol3d.json`) // 配置文件路径
    .then((res) => {
      return res.json()
    })
    .then((result) => {
      const nodeData = result.data
      const fileList = result.fileList

      container = new Bol3D.Container({
        publicPath: `${STATE.PUBLIC_PATH}`,
        assetsPath: `${STATE.PUBLIC_PATH}/editor/`, // 节点解析，资源文件路径（包含模型, hdr，天空盒，材质贴图， 图片等）
        container: domElement,
      })

      const jsonParser = new Bol3D.JSONParser({
        container,
        modelUrls: fileList,
      })
      jsonParser.parseNodes(nodeData, jsonParser.nodes) // 解析节点, jsonParser.nodes存储了配置文件导出的所有节点信息
      container.loadModelsByUrl({
        modelUrls: jsonParser.modelUrls,
        onProgress: (model, evt) => {
          STATE.sceneList[model.name] = model

          if (model.name === 'WJ') {
            const treeArr = model.children.filter(e => e.name.includes('Shu_'))
            treeArr.forEach(e => {
              e.parent.remove(e)
              e.scale.set(DATA.sceneScale / 2, DATA.sceneScale / 2, DATA.sceneScale / 2)
              e.position.set(e.position.x * DATA.sceneScale, e.position.y * DATA.sceneScale, e.position.z * DATA.sceneScale)
            })
            CACHE.originTreeArr = treeArr
          }
        },
        onLoad: (evt) => {
          CACHE.container = evt
          window.container = evt

          // API.initTree()
          // UTIL.instanceInit()


          evt.updateSceneByNodes(jsonParser.nodes[0], 0, () => {
            STATE.sceneList.WJ.traverse(e => {
              if (e.isMesh && e.material.type === 'MeshStandardMaterial') {
                if (e.material.name === 'ding1') {
                  e.material.envMapIntensity = 0

                } else if (e.name.includes('Shu_')) {
                  e.visible = false
                  e.material.dispose()
                  e.geometry.dispose()
                  setTimeout(() => {
                    e.parent.remove(e)
                  }, 0)

                } else {
                  e.material.envMapIntensity = 0.2
                }
              }
            })
            container.filterPass.enabled = true
            container.filterPass.filterMaterial.uniforms.saturation.value = 0.65


          })
        }
      })

      const events = new Bol3D.Events(container)
      events.register(jsonParser.nodes)

      // 以前的事件使用方法不变
      events.ondblclick = (e) => {
        if (e.objects.length) {
        }
      }
      events.onhover = (e) => { }
    })
}

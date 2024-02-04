import { API } from './API.js'
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
        },
        onLoad: (evt) => {
          window.container = evt


          evt.updateSceneByNodes(jsonParser.nodes[0], 0, () => {
            
          })
        }
      })


      // 新增一个事件回调，用于处理编辑器内添加的事件，事件对象会返回对象uuid和事件类型等
      events.handler.on('handleChange', handleChange)

      // 以前的事件使用方法不变
      events.ondblclick = (e) => { }
      events.onhover = (e) => { }
    })
}

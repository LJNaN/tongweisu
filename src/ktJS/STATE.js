import { API } from './API.js'
import { CACHE } from './CACHE.js'

const PUBLIC_PATH = './assets/3d'
const initialState = {
  position: { x: 19.56901008548843, y: 27.52543283151195, z: 41.01016569076582 },
  target: { x: 0, y: 0, z: 0 }
}

export const STATE = {
  initialState,
  PUBLIC_PATH
}

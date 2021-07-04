/* eslint-disable @typescript-eslint/ban-types */
import {
  IModelType,
  ModelPropertiesDeclaration,
  ModelPropertiesDeclarationToProperties,
} from 'mobx-state-tree'

type M<P extends ModelPropertiesDeclaration = {}> = IModelType<
  ModelPropertiesDeclarationToProperties<P>,
  {}
>
const modelMap = new Map<M, Map<number | symbol | string, M['Type']>>()

interface Options {
  scope: number | symbol | undefined | string
}

const DefaultScope = Symbol('scope:default')

const defaultOptions = {
  scope: DefaultScope,
}

function getScopeByPageId(pageId: string | undefined) {
  if (pageId === undefined) return DefaultScope
  const id = Number(pageId)
  return isNaN(id) ? pageId : id
}

function narrowScope(rawScope: Options['scope']) {
  if (typeof rawScope === 'number' || typeof rawScope === 'symbol') {
    return rawScope
  }
  return getScopeByPageId(rawScope)
}

export function getMst<S extends M>(
  Model: S,
  options: Options = defaultOptions,
  // TODO: fix type
  args?: any,
): S['Type'] {
  let storeMap = modelMap.get(Model)
  if (!storeMap) {
    storeMap = new Map()
    modelMap.set(Model, storeMap)
  }

  const scope = narrowScope(options.scope)

  let store = storeMap.get(scope)
  if (!store) {
    store = Model.create(args)
    storeMap.set(scope, store)
  }

  return store
}

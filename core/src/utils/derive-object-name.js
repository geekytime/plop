import { getName } from 'typedef'

export const deriveObjectName = (obj, camelCase = true) => {
  var name = getName(obj)
  if (!name) {
    throw new Error('Could not determine a valid name for object:', obj)
  }
  if (!camelCase) {
    return name
  }
  return name.charAt(0).toLowerCase() + name.slice(1)
}

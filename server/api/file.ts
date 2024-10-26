import { fileURLToPath } from "node:url"

export default defineEventHandler(async (event) => {
  const { storage } = useRuntimeConfig()

  return fileURLToPath(storage + '/IqyUMyjv.jpg')
})

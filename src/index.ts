import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({
      message: err.message
    }, err.status)
  }
  return c.json({
    message: 'Internal Server Error'
  }, 500)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

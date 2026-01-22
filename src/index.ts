import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { authController } from './modules/auth/auth.controller.js'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(logger())
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}
))


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

app.route('/auth', authController)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

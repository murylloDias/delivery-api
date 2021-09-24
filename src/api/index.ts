import { Router } from 'express'
import network from './route/network'
import store from './route/store'
import address from './route/address'
import product from './route/product'
import category from './route/category'

export default () => {
  const app = Router()
  network(app)
  store(app)
  address(app)
  product(app)
  category(app)

  return app
}
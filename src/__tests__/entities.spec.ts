'use strict'
import { expect } from 'chai';
import { app as App } from './app';

describe("entity tests", () => {
  const app = App();
  after(async () => {
    await app.close();
  })
  describe("can store and retrieve tokens", async () => {
    const token = {
      address: '0xf00b',
      name: 'Foo token',
      symbol: 'F00',
      type: 'ERC20',
      decimals: 18
    }

    it("can store a token", async() => {
      const response = await app.inject({
        method: 'POST',
        url: '/token',
        payload: token
      })
      
      expect(response.statusCode).to.equal(200);
    })

    it("can retrieve a token", async() => {
      const response = await app.inject({
        method: 'GET',
        url: '/token/0xf00b'
      })
      const body = JSON.parse(response.body)
      expect(body).to.deep.equal(token);
    })
    
  })

})
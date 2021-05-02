'use strict'
import { expect } from 'chai';
import { ETokenType, Token } from '../entities/Token';
import { app as App } from './app';

describe("gql test", () => {
  const app = App();
  
  after(async () => {
    await app.close();
  })

  it("can retrieve tokens and transactions using gql", async () => {
    const token = {
      address: '0xf00b',
      name: 'Foo token',
      symbol: 'F00',
      type: "ERC20",
      decimals: 18
    }
    await app.inject({
      method: 'POST',
      url: '/token',
      payload: token
    })

    const query = `
    {
      tokens {
        address
        symbol
        name
        decimals
        type
      }
    }
    `
    const response = await app.inject({
      method: 'POST',
      url: '/graphql',
      payload: {
        query,
        variables: {}
      }
    });
    const body = JSON.parse(response.body)
    expect(body).to.deep.equal({
      data: {
        tokens: [
          {...token}
        ]
      }
    });
    

  })

})
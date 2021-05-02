'use strict'
import { expect } from 'chai';
import { app as App } from './app';

describe("basic tests", () => {
  const app = App();
  after(async () => {
    await app.close();
  })
  
  it("should tell an opinion", async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    })
    
    const body = JSON.parse(response.body)
    expect(response.statusCode).to.equal(200);
    expect("undecided").to.equal(body.hello);
  })

})
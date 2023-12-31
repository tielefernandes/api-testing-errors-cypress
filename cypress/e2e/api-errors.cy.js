describe('API - Error scenarios', () => {
  it('Erro 401 - Unauthorized', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.typeform.com/me',
      failOnStatusCode: false,
    }).should(({ status, body }) => {
      expect(status).to.equal(401)
      expect(body).includes('AUTHENTICATION_FAILED')
      expect(body)
        .includes('Authentication credentials not found on the Request Headers')
      // Or
      const bodyObj = JSON.parse(body)
      const { code, description } = bodyObj
      expect(code).to.equal('AUTHENTICATION_FAILED')
      expect(description)
        .to.equal('Authentication credentials not found on the Request Headers')
    })
  })

  it('Erro 403 - Forbidden', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.typeform.com/me',
      headers: { authorization: 'Bearer 0123456789abcdefghijklmnopqrsvwxyz' },
      failOnStatusCode: false
    }).should(({ status, body }) => {
      expect(status).to.equal(403)
      expect(body).includes('AUTHENTICATION_FAILED')
      expect(body).includes('Authentication failed')
      // Or
      const bodyObj = JSON.parse(body)
      const { code, description } = bodyObj
      expect(code).to.equal('AUTHENTICATION_FAILED')
      expect(description).to.equal('Authentication failed')
    })
  })

  it('Erro 404 - Not found', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.typeform.com/123',
      failOnStatusCode: false,
    }).should(({ status, statusText }) => {
      expect(status).to.equal(404)
      expect(statusText).to.equal('Not Found')
    })
  })
})
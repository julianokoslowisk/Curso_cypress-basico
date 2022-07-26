/// <reference types="Cypress" />
////npx cypress open


describe('Central de Atendimento ao Cliente TAT', function () {
  const THREE_SECONDS_IN_MS =3000
  beforeEach(function () {
    cy.visit('./src/index.html')

  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function () {
    const longText = 'Cuso feito para o aprendizado do cypress e automação web Txto muit longo'

    cy.clock()
    cy.get('#firstName').type('Juliano')
    cy.get('#lastName').type('Reis')
    cy.get('#email').type('julianokoslowisk@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')    
  })

  it('exibe mensagem de erro ao submeter o formulário emmail formatação errada', function () {
    cy.clock()
    cy.get('#firstName').type('Juliano')
    cy.get('#lastName').type('Reis')
    cy.get('#email').type('julianokoslowisk@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')

  })
  Cypress._.times(5, function() {
   it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
    cy.get('#phone')
      .type('sadasdasd')
      .should('have.value', '')
    })
  })     

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.clock()
    cy.get('#firstName').type('Juliano')
    cy.get('#lastName').type('Reis')
    cy.get('#email').type('julianokoslowisk@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome , email e telefone', function () {
    cy.get('#firstName')
      .type('Juliano')
      .should('have.value', 'Juliano')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Reis')
      .should('have.value', 'Reis')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('julianokoslowisk@gmail.com')
      .should('have.value', 'julianokoslowisk@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formulario com sucesso usando comando customizado', function () {
    cy.clock()
    cy.fillMandatoryFieldAndSubmit()
    cy.get('.success').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.success').should('not.be.visible')
  })

  it('seleciona um produto (youtube)por seu texto', function () {
    cy.get('#product')
      .select('youtube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria)por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog )por seu indice)', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o Tipo atendimento "Feedback ")', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento ")', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Marca Ambos chekbox depois desmarca o ultimo ")', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"] ')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  }) 

   it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function () {
 cy.fixture('example.json').as('sampleFile')
 cy.get('input[type="file"]')
   .selectFile('@sampleFile')
   .should(function ($input) {
     expect($input[0].files[0].name).to.equal('example.json')
   })
 }) 
    it('Verifica que a politica de privacidade abre em outra aba sem necessidade de um clique ', function () { 
      cy.get('#privacy a')
      .should('have.attr','target','_blank')
    })

    it('acessa página de polítia de privacidade remivendo o target e então clicando no link ', function () { 
      cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
      cy.contains('Talking About Testing').should('be.visible')
    })        

    it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })
})



 











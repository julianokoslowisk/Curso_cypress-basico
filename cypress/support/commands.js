Cypress.Commands.add('fillMandatoryFieldAndSubmit',function() {
    cy.get('#firstName').type('Juliano')
    cy.get('#lastName').type('Reis')
    cy.get('#email').type('julianokoslowisk@gmail.com')
    cy.get('#open-text-area').type('Teste Juliano')
    cy.contains('button','Enviar').click()
    })





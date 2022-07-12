/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() { 
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')  
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Cuso feito para o aprendizado do cypress e automação web Txto muit longo'
        cy.get('#firstName').type('Juliano')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('julianokoslowisk@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
          
    })

    it('exibe mensagem de erro ao submeter o formulário emmail formatação errada', function() {
        cy.get('#firstName').type('Juliano')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('julianokoslowisk@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })
    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
            .type('sadasdasd')
            .should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Juliano')
        cy.get('#lastName').type('Reis')
        cy.get('#email').type('julianokoslowisk@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome , email e telefone', function() {
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
 
        


})

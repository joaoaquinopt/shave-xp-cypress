class ConfirmOrderPage {

    confirmOrder() {
        cy.contains('#swal2-html-container', 'Deseja confirmar a solicitação do serviço?')
            .should('be.visible')

        cy.contains('.swal2-confirm', 'Confirmar')
            .click()
    }

    finishOrder() {

        cy.get('h1')
            .should('be.visible')
            .should('have.text', 'PEDIDO RECEBIDO')

        cy.get('p')
            .should('be.visible')
            .should('have.text', 'Agora e só aguardar para ser atendido(a)!')

        cy.get('a')
            .should('be.visible')
            .should('have.text', 'Finalizar')
            .click()
    }

}

export default new ConfirmOrderPage()
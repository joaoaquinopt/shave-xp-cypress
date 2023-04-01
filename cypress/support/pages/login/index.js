
class LoginPage {

    constructor() {
        this.alertError = '.alert-error'
    }

    submit(email = null, password = null) {

        cy.visit('/')

        cy.get('input[placeholder="Seu email"]').as('email')
        cy.get('input[placeholder*=senha]').as('password')

        if (email) {
            cy.get('@email').type(email)
        }

        if (password) {
            cy.get('@password').type(password)
        }

        cy.contains('button', 'Entrar').click()
    }

    noticeShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)

    }

    noticeShouldBeInvalid(message) {
        cy.get('.alert')
            .should('be.visible')
            .find('.alert-error')
            .should('have.text', message)
    }

    alertShouldBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)
    }

    requiredFields(emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 2)
            .and(($smal) => {
                expect($smal.get(0).textContent).to.equal(emailMessage)
                expect($smal.get(1).textContent).to.equal(passwordMessage)
            })
    }
}

export default new LoginPage()
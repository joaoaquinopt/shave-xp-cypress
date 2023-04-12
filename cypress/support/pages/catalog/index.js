import header from "../../components/header"

class CatalogPage {

    constructor() {
        this.header = header
    }

    professionalService(name, confirmShaver) {
        cy.contains('figcaption h3', name)
            .get('figcaption p')
            .should('have.text', confirmShaver)
            .should('be.visible')
    }

    selectServiceName(name) {
        cy.contains('.catalog-item h3', name)
            .should('be.visible')
            .click()
    }

}

export default new CatalogPage()
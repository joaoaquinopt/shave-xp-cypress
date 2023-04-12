import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import data from '../fixtures/order.json'
import catologPage from '../support/pages/catalog'
import confirmOrderPage from '../support/pages/order'


describe('pedido', () => {

    context('quando estou logado', () => {

        before(() => {
            const user = data.customer
            cy.createUser(user)
            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name) //Checkpoint para garantir que estou logado          
        })

        it('devo conseguir solicitar serviços', () => {

            shaversPage.selectShaver(data.shaver.name)
            catologPage.professionalService(data.shaver.name, data.shaver.confirmShaver)

            catologPage.selectServiceName(data.service.description)

            confirmOrderPage.confirmOrder()
            confirmOrderPage.finishOrder()

        })
    })
})
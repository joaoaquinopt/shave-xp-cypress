
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

// Existe outra maneira de trabalhar com a fixture, mas utilizando o próprio JS, fazer o import do fixture
import data from '../fixtures/users-login.json'

describe('login', () => {

    // contexto ele é como se fosse um grupo
    context('quando submeto o formulário', () => {
        it('deve logar com sucesso', () => {
            // Ao fazer o import da Fixture, ao invés de passar a massa de teste aqui, iria apontar para a fixture, como:
            // const user = data
            const user = data.success
            cy.createUser(user)
            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

            //Eu posso obter a massa de testes de outra maneira, caso eu tenha muita massa, na opção fixtures
            //O código ficaria mais ou menos descrito abaixo, usariamos o comando cy.fixture

            // cy.fixture('users-login').then((data) => {
            //     loginPage.submit(data.email, data.password)
            //     shaversPage.header.userShouldBeLoggedIn(data.name)
            // })

        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpwd
            loginPage.submit(user.email, user.password)
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('não deve logar com email não cadastrado', () => {
            const user = data.invemail
            loginPage.submit(user.email, user.password)
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        // it('não deve logar com email inválido', () => {

        //     const user = {
        //         name: 'Joao',
        //         email: 'joao1234.com',
        //         password: '123456'
        //     }

        //     loginPage.submit(user.email, user.password)

        //     const message = 'Informe um email válido'
        //     loginPage.noticeShouldBeInvalid(message)

        // })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
            // cy.contains('.alert-error', 'E-mail é obrigatório')
            //     .should('be.visible')

            // cy.contains('.alert-error', 'Senha é obrigatória')
            //     .should('be.visible')
        })
    })

    context('senha muito curta', () => {
        data.shortpwd.forEach((p) => {
            //it.only(`não deve logar com a senha: ${p}´, () => {
            it('não deve logar com a senha' + p, () => {
                loginPage.submit('aquino@yahoo.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('validar email em formato incorreto', () => {
        data.wrongpwd.forEach((e) => {
            //it.only('não deve logar com a senha' + p, () => {
            it(`não deve logar com a senha: ${e}`, () => {
                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })


    })
})
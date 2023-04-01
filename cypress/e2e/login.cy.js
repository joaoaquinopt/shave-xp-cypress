
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    // contexto ele é como se fosse um grupo
    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {

            const user = {
                name: 'Joao',
                email: 'aquino@yahoo.com',
                password: 'pwd123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {

            const user = {
                name: 'Joao',
                email: 'aquino@yahoo.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {

            const user = {
                name: 'Joao',
                email: 'joao@1234.com',
                password: '123456'
            }

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

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {

            //it.only(`não deve logar com a senha: ${p}´, () => {
            it('não deve logar com a senha' + p, () => {
                loginPage.submit('aquino@yahoo.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('validar email em formato incorreto', () => {

        const emails = [
            'joao.com.br',
            'joao@com',
            'joao&com.br',
            '@gmail.com',
            'joao@',
            '@',
            '123456',
            '@#$%.com',
            'xpto124'
        ]

        emails.forEach((e) => {

            //it.only('não deve logar com a senha' + p, () => {
            it(`não deve logar com a senha: ${e}`, () => {

                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })


    })
})
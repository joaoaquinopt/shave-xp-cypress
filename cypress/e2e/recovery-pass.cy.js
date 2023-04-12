import fpPage from "../support/pages/forgot-password"
import rpPage from "../support/pages/reset-pass"
import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"

describe('esqueci minha senha', () => {
    
    it('deve poder solicitar o resgate de senha', () => {
        
        const user = {
            name: 'Joao Esquecido',
            email: 'joao@gmail.com',
            password: 'pwd123',
            is_shaver: false
        }

        cy.createUser(user)

        fpPage.go()
        fpPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        fpPage.noticeShoulBe(message)

    })

context('quando o usuário solicita recuperar a senha', ()=> {

    const user = {
        name: 'Joao Esquecido',
        email: 'joao@gmail.com',
        password: 'pwd123',
        is_shaver: false
    }

    beforeEach(() => {
        cy.createUser(user)
        cy.recoveryPass(user.email)
        cy.getToken(user.email)
    });

    it('deve poder recuperar/alterar a senha esquecida', () => {
        rpPage.go(Cypress.env('passToken'))
        rpPage.submit('abc123', 'abc123')
        rpPage.noticeShoulBe('Agora você já pode logar com a sua nova senha secreta.')
    })

    afterEach(() => {
        loginPage.submit(user.email, 'abc123')
        shaversPage.header.userShouldBeLoggedIn(user.name)
    });
})
})
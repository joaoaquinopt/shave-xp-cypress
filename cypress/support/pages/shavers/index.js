
import header from "../../components/header"

// Não é uma herança, o this é importar e criando ele dentro do construtor da class, o this é para criar um objecto dentro da class
// Na automação o meu código vai seguir o reflexo visual do meu software

class ShaversPage {
    constructor() {
        this.header = header 
    }
}

export default new ShaversPage()


const Sicredi = require('./sicredi')
const Funcoes = require('./funcoes')

class Bancos {
    constructor(configjson) {
        this.config = configjson;
        this.funcoes = new Funcoes();
        this.classBanco = null;
        this.DetectaBanco();
    }

    getBanco() {
        return this.classBanco;
    }

    DetectaBanco() {
        switch(this.config.banco) {
            case '748':
                this.classBanco = new Sicredi(this.config);
        }
    };
}

module.exports = Bancos;
const Funcoes = require('./funcoes')

class Sicredi {
    constructor(configjson) {
        this.config = configjson;
        this.funcoes = new Funcoes();
        this.byte = '2';
        this.InicializaDados();
    }

    InicializaDados() {
        this.config.nossonumero = this.MontaNossoNumero();
        this.config.localpagamento = 'PAGÁVEL PREFERENCIALMENTE NAS COOPERATIVAS DE CRÉDITO DO Sicredi'
    }

    Sequencial() {
        return this.funcoes.completaString(this.funcoes.somenteNumero(this.config.seunumero),'0',5,1)
    }

    MontaAgenciaCodigoBeneficiario() {
        return this.config.agencia + '.' + 
               this.config.postobeneficiario + '.' +
               this.config.cedente;
    }

    MontaNossoNumero() {
        //2 primeiros dígitos ano atual
        var ano = this.funcoes.doisDigitosAno();
        var digitoverificador = this.CalculaDigitoVerificador(this.Sequencial());
        
        return ano + '/' + this.byte + this.Sequencial() + '-' + digitoverificador;
    }

    CalculaDigitoVerificador(sequencial) {
        var agregador = this.config.agencia +
                        this.config.postobeneficiario + 
                        this.config.cedente +
                        this.funcoes.doisDigitosAno() +
                        this.byte +
                        sequencial;

        console.log(agregador);

        var resultado = this.funcoes.ResultadoMultiplicador(agregador,2,9,0);

        var digito = resultado % 11;

        if ((digito == 10) || (digito == 11)) {
            digito = 0;
        }

        return digito;
    }

    MontaLinhaDigitavel() {
        var campo1 = this.config.banco + 
                     '91.' + 
                     this.config.carteira + 
                     this.funcoes.somenteNumero(this.config.nossonumero.substring(0,3)) + 
                     CalculaDigitoLinhaDigitavel(campo1);

        var campo2 = this.funcoes.somenteNumero(this.config.nossonumero.substring(3,5)) +
                     '.' +
                     this.funcoes.somenteNumero(this.config.nossonumero.substring(5,1)) +
                     this.config.agencia +
                     CalculaDigitoLinhaDigitavel(campo2);

        var campo3 = this.config.postobeneficiario +
                     this.config.cedente.substring(0,3) +
                     '.' +
                     this.config.cedente.substring(3,2) +
                     '10'

        //var LinhaDigitavel = campo1 + ' ' + campo2 + ' ' + 

    }

    CalculaDigitoLinhaDigitavel(campo) {
        peso = 2;
        resultado = 0;

        for (var i=campo.length; i>0; i--) {
            resultadomultiplicacao = (campo.substring(i-1,i) * peso);

            if (resultadomultiplicacao >= 10) {
                resultadomultiplicacao = resultadomultiplicacao.substring(0,1) + resultadomultiplicacao.substring(1,1);
            }

            resultado = resultado + resultadomultiplicacao;

            peso = peso == 2 ? 3 : 2;
        }

        return RetornaMultiploMaisProximo(resultado, 10) - resultado;
    }

    RetornaMultiploMaisProximo(numero, encontrar) {
        multiplomaisproximo = false;
        somador = 0;

        while(multiplomaisproximo == false) {
            somador+=encontrar;

            if (somador > numero) {
                multiplomaisproximo = true;
                return somador;
            }
        }
    }
}

module.exports = Sicredi;
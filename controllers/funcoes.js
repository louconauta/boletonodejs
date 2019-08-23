class Funcoes {
    completaString(texto,charadd,tamanho,direcao) {
        var completar = '';

        if (texto.length < tamanho) {
            for(var i=0; i< (tamanho - texto.length); i++) {
                completar = completar + charadd;
            }

            if (direcao == 0) {
                texto = texto + completar;
            } else {
                texto = completar + texto;
            }
        }

        return texto;
    }

    somenteNumero(texto) {
        return texto.match(/\d+/g).map(Number);
    }

    doisDigitosAno() {
        return new Date().getFullYear().toString().substring(2,4);
    }

    ResultadoMultiplicador(texto, pesoinicial, pesofinal, direcao) {
        var resultado = 0;
        var peso = pesoinicial;

        if (direcao == 0) {
            //direita para esquerda
            for (var i=texto.length; i>0; i--) {
                resultado = resultado + (texto.substring(i-1,i) * peso);
                
                if (pesofinal == false) {
                    if (peso < pesofinal) {
                        peso++;
                    } else {
                        peso = pesoinicial;
                    }
                }
            }
        } else {
            //esquerda para direita
            for (var i=0; i<texto.length; i++) {
                resultado = resultado + (texto.substring(i,i+1) * peso);
                
                if (pesofinal == false) {
                    if (peso < pesofinal) {
                        peso++;
                    } else {
                        peso = pesoinicial;
                    }
                }
            }
        }

        return resultado;
    }
}

module.exports = Funcoes;
var express = require('express'), 
    stylus = require('stylus'), 
    nib = require('nib'),
    app = express();

var Bancos = require('./controllers/bancos')

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
    { src: __dirname + '/public', compile: compile }
))

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {

    var titlejson = {
		logotipo:'sicredi.png',
        textosuperior:'RECIBO DO PAGADOR',
        localpagamento:'Local do Pagamento',
        vencimento:'Vencimento',
        beneficiario:'Beneficiário',
        agenciacodigobeneficiario:'Agência/Código Beneficiário',
        datadocumento:'Data do Documento',
        numerodocumento:'Número do Documento',
        especiedocumento:'Espécie do Documento',
        aceite:'Aceite',
        dataprocessamento:'Data de Processamento',
        nossonumero:'Nosso Número',
        usobanco:'Uso do Banco',
        carteira:'Carteira',
        especie:'Espécie',
        quantidade:'Quantidade',
        valor:'Valor',
        valordocumento:'(=) Valor do Documento',
        instrucoes:'Instruções (Todas as informações deste bloqueto são de exclusiva responsabilidade do beneficiário)',
        descontoabatimento:'(-) Desconto/Abatimento',
        outrasdeducoes:'(-) Outras deduções',
        jurosmulta:'(+) Juros / Multa',
        outrosacrescimos:'(+) Outros acréscimos',
        valorcobrado:'(=) Valor Cobrado',
        pagador:'Pagador',
        sacadoravalista:'Sacador / Avalista',
        codigobaixa:'Código de Baixa:'
    }

    var dadosjson = {
        banco:'748',
        bancodigito:'X',
        localpagamento:'',
        vencimento:'15/09/2019',
        beneficiario:'NOME DO BENEFICIÁRIO',
        agenciacodigobeneficiario:'',
        datadocumento:'06/05/2014',
        numerodocumento:'123456/1',
        especiedocumento:'DM',
        aceite:'NÃO',
        dataprocessamento:'06/05/2014',
        seunumero:'1',
        usobanco:'Teste',
        carteira:'1',
        especie:'REAL',
        quantidade:'Teste',
        valor:'Teste',
        valordocumento:'100,00',
        instrucoes:'',
        descontoabatimento:'Teste',
        outrasdeducoes:'Teste',
        jurosmulta:'Teste',
        outrosacrescimos:'Teste',
        valorcobrado:'Teste',
        pagador:'NOME DO PAGADOR - 000.000.000-01\nRUA FICTÍCIA\nPORTO ALEGRE RS 90000-000',
        sacadoravalista:'Teste',
        codigobaixa:'Teste',
        cedente:'00092',
        agencia:'3954',
        postobeneficiario:'02',
        nossonumero:'',
        linhadigitavel:''
    }

    var bancos = new Bancos(dadosjson);
    //console.log(bancos.getBanco());

    res.render('index',
    { 
        title : titlejson,
        data : dadosjson
    })
})

app.listen(3000)
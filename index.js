const formatarMoeda = valor => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(valor);

let artigosSelecionados = [];
let todosArtigos = {};

$(document).ready(() => {

function aplicarArtigo(codigo, meses, multa, fianca, alerta = '') {

    if (!artigosSelecionados.includes(codigo)) {

        artigosSelecionados.push(codigo);

        let mesesOriginal = Number($('#meses').data('rawOriginal')) || 0;
        let multaTotal = Number($('#multa').data('raw')) || 0;
        let fiancaTotal = Number($('#fianca').data('raw')) || 0;

        mesesOriginal += meses;
        multaTotal += multa;
        fiancaTotal += fianca;

        $('#TotalArtigos').html(artigosSelecionados.join(', '));

        $('#meses')
            .data('rawOriginal', mesesOriginal)
            .data('raw', mesesOriginal)
            .html(mesesOriginal);

        $('#multa')
            .data('raw', multaTotal)
            .html(formatarMoeda(multaTotal));

        $('#fianca')
            .data('raw', fiancaTotal)
            .html(formatarMoeda(fiancaTotal));
    }

    if (alerta) alert(alerta);
}

function aplicarArtigosCategoria(categoria, artigos) {

    for (const [codigo, dados] of Object.entries(artigos)) {

        todosArtigos[codigo] = dados;

        $(`.${categoria}[data-codigo="${codigo}"]`).off('click').on('click', () => {

            aplicarArtigo(
                codigo,
                dados.meses || 0,
                dados.multa || 0,
                dados.fianca || 0,
                dados.alerta
            );

        });

    }
}

const infracoesLeves = {
    "53": { nome: "Pousar Aeronaves em local proibido", multa: 14000 },
    "54": { nome: "Poluição sonora", multa: 6900 },
    "56": { nome: "Danos a terceiros", multa: 12000 },
    "108": { nome: "Direção perigosa", multa: 6500 },
    "162": { nome: "Sem habilitação", multa: 5000 },
    "172": { nome: "Estacionar em local proibido", multa: 2500 },
    "244": { nome: "Sem capacete", multa: 1500 }
};

const crimesMedios = {
    "02": { nome: "Uso de máscara", fianca: 4000, meses: 10 },
    "19": { nome: "Porte de arma branca", fianca: 5500, meses: 10 },
    "102": { nome: "Fuga", fianca: 2500, meses: 10 },
    "139": { nome: "Calúnia, difamação e injúria", fianca: 6000, meses: 10 },
    "147": { nome: "Ameaça", fianca: 7000, meses: 15 },
    "150": { nome: "Invasão", fianca: 3300, meses: 10 },
    "165": { nome: "Dirigir sob efeito de álcool/drogas", fianca: 4500, meses: 10 },
    "173": { nome: "Racha / corrida ilegal", fianca: 5100, meses: 10 },
    "251-2": { nome: "Colete balístico", fianca: 4900, meses: 10 },
    "287": { nome: "Apologia ao crime", fianca: 6100, meses: 5 },
    "289": { nome: "Dinheiro sujo", fianca: 2000, meses: 5 },
    "330": { nome: "Desobediência", fianca: 8000, meses: 10 },
    "331": { nome: "Desacato", fianca: 13000, meses: 10 },
    "333": { nome: "Tentativa de suborno", fianca: 6000, meses: 15 }
};

const crimesGraves = {
    "14": { nome: "Mal uso de arma", fianca: 5000, meses: 20 },
    "33": { nome: "Tráfico de drogas", fianca: 4200, meses: 10 },
    "129": { nome: "Lesão corporal", fianca: 4000, meses: 10 },
    "157-2": { nome: "Furto", fianca: 6000, meses: 10 },
    "157-3": { nome: "Roubo caixa registradora", fianca: 2900, meses: 10 },
    "157-4": { nome: "Roubo caixa eletrônico", fianca: 4000, meses: 10 },
    "158": { nome: "Extorsão", fianca: 5200, meses: 10 },
    "180": { nome: "Receptação", fianca: 5000, meses: 10 },
    "251": { nome: "Explosivos", fianca: 3300, meses: 5 },
    "288": { nome: "Associação criminosa", fianca: 3500, meses: 10 },
    "298": { nome: "Falsificação documentos", fianca: 3500, meses: 10 },
    "299": { nome: "Falsidade ideológica", fianca: 4000, meses: 10 },
    "334": { nome: "Contrabando", fianca: 4000, meses: 10 },
    "342": { nome: "Falso testemunho", fianca: 10000, meses: 10 },
    "358": { nome: "Obstrução de justiça", fianca: 5000, meses: 15 },
    "520": { nome: "Multas pendentes", fianca: 4000, meses: 10 }
};

const crimesGravissimos = {
    "15": { nome: "Arma baixo calibre", meses: 10 },
    "16": { nome: "Arma alto calibre", meses: 20 },
    "16-1": { nome: "Arma restrita", meses: 30 },
    "18": { nome: "Tráfico de armas", meses: 20 },
    "57": { nome: "Munições", meses: 10 },
    "59": { nome: "Roubo banco", meses: 20 },
    "60": { nome: "Roubo joalheria", meses: 20 },
    "92-1": { nome: "Simulacro", meses: 10 },
    "129-1": { nome: "Tentativa de homicídio", meses: 10 },
    "148": { nome: "Sequestro", meses: 20 },
    "148-1": { nome: "Extorsão mediante sequestro", meses: 25 },
    "157-1": { nome: "Roubo", meses: 15 },
    "157-5": { nome: "Homicídio", meses: 25 },
    "157-6": { nome: "Latrocínio", meses: 30 },
    "171": { nome: "Estelionato", meses: 10 },
    "351": { nome: "Fuga da prisão", meses: 15 }
};

aplicarArtigosCategoria('infracaoLeve', infracoesLeves);
aplicarArtigosCategoria('crimeMedio', crimesMedios);
aplicarArtigosCategoria('crimeGrave', crimesGraves);
aplicarArtigosCategoria('crimeGravissimo', crimesGravissimos);

});

function clean() {

    $('#name,#cpf').val('');
    $('#TotalArtigos').html('');

    $('#multa').html('').data('raw',0);
    $('#meses').html('').data('raw',0).data('rawOriginal',0);
    $('#fianca').html('').data('raw',0);

    artigosSelecionados = [];
    }

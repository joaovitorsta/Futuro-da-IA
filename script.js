const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.getElementById("caixa-perguntas");
const caixaAlternativas = document.getElementById("caixa-alternativas");
const caixaResultado = document.getElementById("caixa-resultado");
const textoResultado = document.getElementById("texto-resultado");
const conteudoQuiz = document.getElementById("conteudo-quiz");
const barraProgresso = document.getElementById("barra-progresso");
const textoPasso = document.getElementById("texto-passo");
const porcentagemProgresso = document.getElementById("porcentagem-progresso");
const botaoReiniciar = document.getElementById("botao-reiniciar");

const perguntas = [
    {
        enunciado: "Em pleno ano de 2049, você decide pesquisar maneiras eficientes de aplicar a inteligência artificial no seu cotidiano. Qual é o seu primeiro passo?",
        alternativas: [
            {
                texto: "Busco compreender como extrair dados e informações úteis com o auxílio das ferramentas inteligentes.",
                afirmacao: "Você conseguiu utilizar a IA para buscar informações úteis com eficácia."
            },
            {
                texto: "Deixo que a inteligência artificial assuma todas as minhas demandas rotineiras desde o início.",
                afirmacao: "Infelizmente passou a utilizar a IA para fazer todas suas tarefas."
            }
        ]
    },
    {
        enunciado: "Ao notar os impactos da tecnologia ao seu redor, você percebe que muitos colegas de trabalho enfrentam dilemas éticos no uso dos sistemas. Como você reage?",
        alternativas: [
            {
                texto: "Sua preocupação com as pessoas motiva a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética.",
                afirmacao: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética."
            },
            {
                texto: "Prefiro focar apenas nas minhas próprias tarefas e deixar que cada um descubra seu caminho sozinho.",
                afirmacao: "Você optou por uma postura isolada diante dos desafios coletivos da tecnologia."
            }
        ]
    },
    {
        enunciado: "Analisando o cenário ao seu redor, você repara que diversas pessoas ao seu redor ainda sentem dificuldades com as tecnologias mais básicas.",
        alternativas: [
            {
                texto: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes.",
                afirmacao: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes."
            },
            {
                texto: "Acredito que quem não se atualizar sozinho deve ficar para trás no mercado.",
                afirmacao: "Você demonstrou pouca empatia pelas dificuldades tecnológicas alheias."
            }
        ]
    },
    {
        enunciado: "Com o passar dos meses, o volume de tarefas automatizadas cresce vertiginosamente na sua rotina profissional e pessoal.",
        alternativas: [
            {
                texto: "Mantenho um equilíbrio rígido, usando a máquina apenas como suporte e mantendo minha autonomia criativa.",
                afirmacao: "Você preservou sua independência intelectual frente às inovações."
            },
            {
                texto: "Delego absolutamente tudo para os algoritmos sem me preocupar em verificar ou praticar os processos.",
                afirmacao: "e agora se sente dependente da IA para tudo."
            }
        ]
    },
    {
        enunciado: "Chegando ao ápice da sua jornada em 2049, qual balanço você faz sobre a sua convivência com as inteligências artificiais?",
        alternativas: [
            {
                texto: "A tecnologia deve caminhar lado a lado com a nossa humanidade, ética e aprendizado constante.",
                afirmacao: "Construindo um futuro onde a tecnologia amplia as potencialidades humanas sem apagar a nossa essência."
            },
            {
                texto: "Entrego o controle total da minha autonomia intelectual para os sistemas automatizados.",
                afirmacao: "Perdendo a capacidade de agir de forma independente sem o respaldo digital."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function atualizaProgresso() {
    const total = perguntas.length;
    const progresso = (atual / total) * 100;
    barraProgresso.style.width = `${progresso}%`;
    porcentagemProgresso.textContent = `${Math.round(progresso)}%`;
    if (atual < total) {
        textoPasso.textContent = `Etapa ${atual + 1} de ${total}`;
    } else {
        textoPasso.textContent = "Concluído";
    }
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    atualizaProgresso();
    perguntaAtual = perguntas[atual];

    conteudoQuiz.classList.remove("animado");
    void conteudoQuiz.offsetWidth;
    conteudoQuiz.classList.add("animado");

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    let indice = 0;
    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.classList.add("opcao-btn");

        const letra = String.fromCharCode(65 + indice);
        botao.innerHTML = `<span class="opcao-indicador">${letra}</span><span>${alternativa.texto}</span>`;

        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
        indice++;
    }
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    atualizaProgresso();
    conteudoQuiz.classList.add("oculto");
    caixaResultado.classList.remove("oculto");
    caixaResultado.classList.add("animado");
    textoResultado.textContent = historiaFinal.trim();
}

function reiniciar() {
    atual = 0;
    historiaFinal = "";
    caixaResultado.classList.add("oculto");
    conteudoQuiz.classList.remove("oculto");
    mostraPergunta();
}

botaoReiniciar.addEventListener("click", reiniciar);

mostraPergunta();

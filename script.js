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
        enunciado: "Em 2049, você decide explorar as tecnologias do cotidiano. Ao buscar dados para suas demandas diárias, como você procede?",
        alternativas: [
            {
                texto: "Conseguiu utilizar a IA para buscar informações úteis de forma ágil e consciente.",
                afirmacao: "Você conseguiu utilizar a IA para buscar informações úteis."
            },
            {
                texto: "Recuso o uso de assistentes digitais e tento resolver tudo de forma puramente manual sem suporte.",
                afirmacao: "Você optou por ignorar as ferramentas digitais desde o início."
            }
        ]
    },
    {
        enunciado: "Observando os impactos da automação nas profissões, surgem discussões profundas sobre a ética no uso dos sistemas. Qual é a sua atitude?",
        alternativas: [
            {
                texto: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética.",
                afirmacao: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética."
            },
            {
                texto: "Prefiro me isolar e focar apenas nas minhas próprias obrigações individuais.",
                afirmacao: "Você adotou uma postura totalmente individualista diante dos dilemas coletivos."
            }
        ]
    },
    {
        enunciado: "Caminhando pela comunidade, você percebe que boa parte das pessoas ao seu redor ainda não sabe operar softwares e tecnologias fundamentais.",
        alternativas: [
            {
                texto: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes.",
                afirmacao: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes."
            },
            {
                texto: "Acredito que cada indivíduo deve aprender por conta própria sem precisar de auxílio externo.",
                afirmacao: "Você preferiu não estender apoio educacional aos que tinham dificuldades."
            }
        ]
    },
    {
        enunciado: "Com o avanço dos algoritmos, torna-se extremamente tentador delegar absolutamente todas as decisões cotidianas para a máquina.",
        alternativas: [
            {
                texto: "Infelizmente passou a utilizar a IA para fazer todas suas tarefas e agora se sente dependente da IA para tudo.",
                afirmacao: "Infelizmente passou a utilizar a IA para fazer todas suas tarefas e agora se sente dependente da IA para tudo."
            },
            {
                texto: "Mantenho um limite rigoroso, usando a tecnologia apenas como apoio e preservando minha autonomia cognitiva.",
                afirmacao: "Você protegeu firmemente sua autonomia intelectual frente aos sistemas."
            }
        ]
    },
    {
        enunciado: "Ao chegar ao final desta jornada temporal em 2049, qual balanço define a sua coexistência com a inteligência artificial?",
        alternativas: [
            {
                texto: "A inovação deve caminhar lado a lado com a empatia, a ética e o desenvolvimento humano constante.",
                afirmacao: "Consolidando um legado onde o avanço tecnológico engrandece a humanidade sem apagar sua essência."
            },
            {
                texto: "Entrego o controle absoluto da minha capacidade de ação e pensamento diretamente aos algoritmos.",
                afirmacao: "Encerrando sua trajetória totalmente submisso ao controle operacional das máquinas."
            }
        ]
    }
];

let passoAtual = 0;
let trilhaHistorico = "";

function atualizarProgresso() {
    const total = perguntas.length;
    const porcentagem = (passoAtual / total) * 100;
    barraProgresso.style.width = `${porcentagem}%`;
    porcentagemProgresso.textContent = `${Math.round(porcentagem)}%`;
    
    if (passoAtual < total) {
        textoPasso.textContent = `Etapa ${passoAtual + 1} de ${total}`;
    } else {
        textoPasso.textContent = "Concluído";
    }
}

function carregarPergunta() {
    if (passoAtual >= perguntas.length) {
        mostrarResultado();
        return;
    }

    atualizarProgresso();
    const perguntaAtual = perguntas[passoAtual];

    conteudoQuiz.classList.remove("animar");
    void conteudoQuiz.offsetWidth;
    conteudoQuiz.classList.add("animar");

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    let indice = 0;
    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.classList.add("botao-opcao");

        const letra = String.fromCharCode(65 + indice);
        botao.innerHTML = `
            <span class="letra-indicador">${letra}</span>
            <span class="texto-opcao">${alternativa.texto}</span>
        `;

        botao.addEventListener("click", () => selecionarResposta(alternativa));
        caixaAlternativas.appendChild(botao);
        indice++;
    }
}

function selecionarResposta(opcao) {
    trilhaHistorico += opcao.afirmacao + " ";
    passoAtual++;
    carregarPergunta();
}

function mostrarResultado() {
    atualizarProgresso();
    conteudoQuiz.classList.add("oculto");
    caixaResultado.classList.remove("oculto");
    caixaResultado.classList.add("animar");
    textoResultado.textContent = trilhaHistorico.trim();
}

function reiniciarJornada() {
    passoAtual = 0;
    trilhaHistorico = "";
    caixaResultado.classList.add("oculto");
    conteudoQuiz.classList.remove("oculto");
    carregarPergunta();
}

botaoReiniciar.addEventListener("click", reiniciarJornada);

carregarPergunta();

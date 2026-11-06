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
        enunciado: "Em 2049, ao buscar formas eficientes de lidar com as demandas do cotidiano, você decide como interagir com as novas tecnologias. Qual é a sua abordagem inicial?",
        alternativas: [
            {
                texto: "Busco integrar os recursos tecnológicos de forma inteligente para otimizar minhas buscas por dados e otimizar o tempo.",
                afirmacao: "Você conseguiu utilizar a IA para buscar informações úteis."
            },
            {
                texto: "Ignoro as facilidades digitales e tento resolver tudo de forma 100% manual e tradicional desde o início.",
                afirmacao: "Você optou por recusar qualquer suporte digital, mantendo-se totalmente analógico."
            }
        ]
    },
    {
        enunciado: "Diante dos impactos da automação no ambiente profissional, surgem debates urgentes sobre a ética e a preservação do trabalho humano. Como você se posiciona?",
        alternativas: [
            {
                texto: "Mobilizo meus colegas e lidero encontros de debate para garantir que a tecnologia seja usada de maneira justa e responsável.",
                afirmacao: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética."
            },
            {
                texto: "Prefiro focar apenas nas minhas próprias demandas, deixando que os outros trabalhadores lidem com seus próprios desafios.",
                afirmacao: "Você adotou uma postura distante em relação aos dilemas coletivos da sociedade."
            }
        ]
    },
    {
        enunciado: "Caminhando pela comunidade, você percebe que boa parte das pessoas ainda encontra barreiras profundas para operar sistemas básicos do dia a dia.",
        alternativas: [
            {
                texto: "Crio oficinas e tutorias voluntárias de design e pintura digital para ensinar iniciantes a dominarem as ferramentas fundamentais.",
                afirmacao: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes."
            },
            {
                texto: "Acredito que cada indivíduo deve se virar por conta própria para aprender a lidar com as inovações tecnológicas.",
                afirmacao: "Você preferiu não estender apoio pedagógico àqueles que enfrentavam barreiras tecnológicas."
            }
        ]
    },
    {
        enunciado: "Com o passar dos anos, a tentação de delegar absolutamente todas as decisões cotidianas para os algoritmos torna-se imensa.",
        alternativas: [
            {
                texto: "Delego cada parcela do meu raciocínio e das minhas obrigações diretamente para os sistemas automatizados.",
                afirmacao: "Infelizmente passou a utilizar a IA para fazer todas suas tarefas e agora se sente dependente da IA para tudo."
            },
            {
                texto: "Mantenho um rigoroso filtro crítico, utilizando a tecnologia estritamente como apoio e preservando minha autonomia cognitiva.",
                afirmacao: "Você protegeu firmemente sua independência intelectual diante dos sistemas inteligentes."
            }
        ]
    },
    {
        enunciado: "Ao atingir o ápice da sua jornada temporal em 2049, qual balanço define a sua relação definitiva com a inteligência artificial?",
        alternativas: [
            {
                texto: "A inovação deve caminhar de mãos dadas com a empatia, a solidariedade e o pensamento crítico humano.",
                afirmacao: "Consolidando um legado onde o avanço digital engrandece a humanidade sem apagar sua essência."
            },
            {
                texto: "Entrego o controle absoluto da minha capacidade de discernimento e ação diretamente às máquinas.",
                afirmacao: "Encerrando sua trajetória submisso ao controle operacional dos algoritmos."
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
        textoPasso.textContent = "Jornada Concluída";
    }
}

function carregarPergunta() {
    if (passoAtual >= perguntas.length) {
        mostrarResultado();
        return;
    }

    atualizarProgresso();
    const perguntaAtual = perguntas[passoAtual];

    conteudoQuiz.classList.remove("animar-fade");
    void conteudoQuiz.offsetWidth;
    conteudoQuiz.classList.add("animar-fade");

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    let indice = 0;
    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.classList.add("botao-alternativa");

        const letra = String.fromCharCode(65 + indice);
        botao.innerHTML = `
            <span class="indicador-letra">${letra}</span>
            <span class="texto-alternativa">${alternativa.texto}</span>
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
    conteudoQuiz.classList.add("escondido");
    caixaResultado.classList.remove("escondido");
    caixaResultado.classList.add("animar-fade");
    textoResultado.textContent = trilhaHistorico.trim();
}

function reiniciarJornada() {
    passoAtual = 0;
    trilhaHistorico = "";
    caixaResultado.classList.add("escondido");
    conteudoQuiz.classList.remove("escondido");
    carregarPergunta();
}

botaoReiniciar.addEventListener("click", reiniciarJornada);

carregarPergunta();

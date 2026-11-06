const elementoPrincipal = document.querySelector(".container-central");
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
        enunciado: "Em 2049, você se depara com a necessidade de otimizar sua rotina e buscar dados importantes de forma rápida. Como você decide proceder com o uso das novas tecnologias?",
        alternativas: [
            {
                texto: "Conseguiu utilizar a IA para buscar informações úteis de maneira estratégica e consciente para o seu dia a dia.",
                afirmacao: "Você conseguiu utilizar a IA para buscar informações úteis."
            },
            {
                texto: "Decido ignorar os assistentes inteligentes e tento fazer tudo de maneira totalmente analógica, sem suporte tecnológico.",
                afirmacao: "Você optou por rejeitar o auxílio digital logo no início, isolando-se das facilidades modernas."
            }
        ]
    },
    {
        enunciado: "Observando o impacto da automação no ambiente profissional e social, surgem diversos dilemas sobre a moralidade e o emprego correto das ferramentas digitais. Qual é o seu posicionamento?",
        alternativas: [
            {
                texto: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética.",
                afirmacao: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética."
            },
            {
                texto: "Prefiro concentrar meus esforços apenas nas minhas próprias tarefas, sem me envolver com discussões coletivas sobre ética tecnológica.",
                afirmacao: "Você adotou uma postura individualista frente aos dilemas éticos da sociedade."
            }
        ]
    },
    {
        enunciado: "Caminhando pela comunidade, você percebe que muitas pessoas ao seu redor encontram barreiras severas para interagir com softwares básicos e recursos tradicionais.",
        alternativas: [
            {
                texto: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes.",
                afirmacao: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes."
            },
            {
                texto: "Acredito que cada indivíduo deve buscar seu próprio aprendizado tecnológico sem a necessidade de apoio externo.",
                afirmacao: "Você preferiu não intervir na curva de aprendizado digital daqueles que encontravam dificuldades."
            }
        ]
    },
    {
        enunciado: "Com o passar dos anos em 2049, a facilidade de gerar respostas automáticas e soluções instantâneas torna-se cada vez mais tentadora no seu cotidiano.",
        alternativas: [
            {
                texto: "Infelizmente passou a utilizar a IA para fazer todas suas tarefas e agora se sente dependente da IA para tudo.",
                afirmacao: "Infelizmente passou a utilizar a IA para fazer todas suas tarefas e agora se sente dependente da IA para tudo."
            },
            {
                texto: "Estabeleço limites claros, utilizando os algoritmos estritamente como ferramentas de apoio e preservando minha autonomia cognitiva.",
                afirmacao: "Você manteve uma postura de autonomia intelectual, resistindo à tentação da dependência tecnológica."
            }
        ]
    },
    {
        enunciado: "Chegando ao marco final da sua jornada temporal em 2049, qual reflexão resume o seu legado diante da revolução da inteligência artificial?",
        alternativas: [
            {
                texto: "A tecnologia deve servir para elevar o potencial humano, exigindo equilíbrio, empatia e constante senso crítico.",
                afirmacao: "Consolidando um futuro onde o progresso tecnológico caminha lado a lado com a solidariedade e a autonomia humana."
            },
            {
                texto: "Entrego o controle completo das minhas decisões diárias aos sistemas automatizados, abdicando da minha iniciativa própria.",
                afirmacao: "Encerrando sua trajetória com total submissão operacional aos algoritmos."
            }
        ]
    }
];

let passoAtual = 0;
let perguntaAtiva;
let trilhaHistorico = "";

function atualizarBarraProgresso() {
    const totalEtapas = perguntas.length;
    const calculoPorcentagem = (passoAtual / totalEtapas) * 100;
    barraProgresso.style.width = `${calculoPorcentagem}%`;
    porcentagemProgresso.textContent = `${Math.round(calculoPorcentagem)}%`;
    
    if (passoAtual < totalEtapas) {
        textoPasso.textContent = `Etapa ${passoAtual + 1} de ${totalEtapas}`;
    } else {
        textoPasso.textContent = "Jornada Concluída";
    }
}

function exibirProximaPergunta() {
    if (passoAtual >= perguntas.length) {
        exibirTelaResultado();
        return;
    }

    atualizarBarraProgresso();
    perguntaAtiva = perguntas[passoAtual];

    conteudoQuiz.classList.remove("animar-transicao");
    void conteudoQuiz.offsetWidth;
    conteudoQuiz.classList.add("animar-transicao");

    caixaPerguntas.textContent = perguntaAtiva.enunciado;
    caixaAlternativas.innerHTML = "";
    construirBotoesAlternativas();
}

function construirBotoesAlternativas() {
    let indiceAlternativa = 0;
    for (const opcao of perguntaAtiva.alternativas) {
        const botaoOpcao = document.createElement("button");
        botaoOpcao.classList.add("botao-opcao-estilizado");

        const identificadorLetra = String.fromCharCode(65 + indiceAlternativa);
        botaoOpcao.innerHTML = `<span class="marcador-letra">${identificadorLetra}</span><span class="texto-opcao-conteudo">${opcao.texto}</span>`;

        botaoOpcao.addEventListener("click", () => registrarEscolha(opcao));
        caixaAlternativas.appendChild(botaoOpcao);
        indiceAlternativa++;
    }
}

function registrarEscolha(opcaoEscolhida) {
    trilhaHistorico += opcaoEscolhida.afirmacao + " ";
    passoAtual++;
    exibirProximaPergunta();
}

function exibirTelaResultado() {
    atualizarBarraProgresso();
    conteudoQuiz.classList.add("escondido");
    caixaResultado.classList.remove("escondido");
    caixaResultado.classList.add("animar-transicao");
    textoResultado.textContent = trilhaHistorico.trim();
}

function reiniciarJornada() {
    passoAtual = 0;
    trilhaHistorico = "";
    caixaResultado.classList.add("escondido");
    conteudoQuiz.classList.remove("escondido");
    exibirProximaPergunta();
}

botaoReiniciar.addEventListener("click", reiniciarJornada);

exibirProximaPergunta();

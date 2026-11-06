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
        enunciado: "Em pleno ano de 2049, você precisa otimizar sua rotina e buscar dados altamente complexos. Como você decide direcionar o uso das ferramentas inteligentes?",
        alternativas: [
            {
                texto: "Aproveito o potencial analítico dos sistemas para extrair dados úteis e acelerar minhas demandas diárias.",
                afirmacao: "Você conseguiu utilizar a IA para buscar informações úteis."
            },
            {
                texto: "Delego de olhos fechados absolutamente todas as minhas obrigações e tomadas de decisão para os algoritmos.",
                afirmacao: "Infelizmente passou a utilizar a IA para fazer todas suas tarefas e agora se sente dependente da IA para tudo."
            }
        ]
    },
    {
        enunciado: "Observando o impacto da automação em massa, o mercado de trabalho sofre abalos profundos e dilemas morais eclodem entre os profissionais. Qual é a sua atitude?",
        alternativas: [
            {
                texto: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética.",
                afirmacao: "Sua preocupação com as pessoas motivou a criar um grupo de estudos entre trabalhadores para discutir meios de utilização de IA de forma ética."
            },
            {
                texto: "Mantenho-me isolado e focado exclusivamente no meu progresso individual, ignorando os dilemas coletivos.",
                afirmacao: "Você optou por uma postura individualista diante das crises sociais geradas pela tecnologia."
            }
        ]
    },
    {
        enunciado: "Caminhando pelos centros urbanos, você nota que uma enorme parcela da população ainda sofre para operar tecnologias básicas e ferramentas analógicas tradicionais.",
        alternativas: [
            {
                texto: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes.",
                afirmacao: "Notou também que muitas pessoas não sabem ainda utilizar as ferramentas tradicionais e decidiu compartilhar seus conhecimentos de design utilizando ferramentas de pintura digital para iniciantes."
            },
            {
                texto: "Acredito que a adaptação natural é problema de cada um e decido não prestar nenhum tipo de suporte voluntário.",
                afirmacao: "Você preferiu não estender auxílio educacional àqueles que enfrentavam barreiras tecnológicas."
            }
        ]
    },
    {
        enunciado: "O ecossistema digital ao seu redor evoluiu exponencialmente, trazendo facilidades extremas mas também o risco latente da inércia mental.",
        alternativas: [
            {
                texto: "Estabeleço limites rígidos, utilizando a inteligência artificial estritamente como suporte técnico e mantendo meu raciocínio ativo.",
                afirmacao: "Você preservou sua autonomia cognitiva e pensamento crítico frente aos sistemas."
            },
            {
                texto: "Permito que a máquina pense por mim em todas as esferas, abdicando completamente do esforço mental autônomo.",
                afirmacao: "E acabou aprofundando uma dependência crônica de soluções sintéticas automatizadas."
            }
        ]
    },
    {
        enunciado: "Chegando ao marco final da sua trajetória em 2049, qual veredito define a sua coexistência com a inteligência artificial?",
        alternativas: [
            {
                texto: "A tecnologia deve atuar como multiplicadora do potencial humano, guiada pela ética, empatia e constante aprendizado.",
                afirmacao: "Consolidando um futuro equilibrado onde a humanidade e a inovação caminham em perfeita harmonia."
            },
            {
                texto: "Submeto meu livre-arbítrio por completo ao controle operacional e centralizado dos algoritmos.",
                afirmacao: "Entregando o comando total da própria jornada à automação cega."
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
        const numeroFormatado = String(passoAtual + 1).padStart(2, '0');
        const totalFormatado = String(total).padStart(2, '0');
        textoPasso.textContent = `Etapa ${numeroFormatado} de ${totalFormatado}`;
    } else {
        textoPasso.textContent = "Sincronização Concluída";
    }
}

function carregarPergunta() {
    if (passoAtual >= perguntas.length) {
        mostrarResultado();
        return;
    }

    atualizarProgresso();
    const perguntaAtual = perguntas[passoAtual];

    conteudoQuiz.classList.remove("animar-transicao");
    void conteudoQuiz.offsetWidth;
    conteudoQuiz.classList.add("animar-transicao");

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    let indice = 0;
    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.classList.add("alternativa-botao");

        const letra = String.fromCharCode(65 + indice);
        botao.innerHTML = `
            <span class="alternativa-letra">${letra}</span>
            <span class="alternativa-texto">${alternativa.texto}</span>
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
    caixaResultado.classList.add("animar-transicao");
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

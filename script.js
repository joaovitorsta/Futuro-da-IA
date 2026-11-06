const interfacePrincipal = document.querySelector(".container-app");
const painelPergunta = document.getElementById("painel-pergunta");
const painelOpcoes = document.getElementById("painel-opcoes");
const areaConclusao = document.getElementById("area-conclusao");
const paragrafoConclusao = document.getElementById("paragrafo-conclusao");
const areaInterativa = document.getElementById("area-interativa");
const preenchimentoAvanco = document.getElementById("preenchimento-avanco");
const indicadorEtapa = document.getElementById("indicador-etapa");
const indicadorPercentual = document.getElementById("indicador-percentual");
const btnReiniciar = document.getElementById("btn-reiniciar");

const bancoDeDados = [
    {
        textoPergunta: "No ano de 2049, o mundo está completamente integrado aos sistemas inteligentes. Ao observar as demandas do seu dia a dia, qual é a sua primeira iniciativa?",
        respostas: [
            {
                conteudo: "Decido pesquisar e aplicar ferramentas virtuais para filtrar dados e gerenciar minhas tarefas rotineiras.",
                consequencia: "No início de 2049, você decidiu otimizar sua rotina buscando ativamente soluções em inteligência artificial para localizar informações valiosas e organizar seu dia."
            },
            {
                conteudo: "Tento me adaptar utilizando pequenos assistentes virtuais para resolver dúvidas rápidas que surgem no cotidiano.",
                consequencia: "No início de 2049, você decidiu otimizar sua rotina buscando ativamente soluções em inteligência artificial para localizar informações valiosas e organizar seu dia."
            }
        ]
    },
    {
        textoPergunta: "O uso dessas tecnologias começa a gerar insegurança no seu ambiente de trabalho. Muitas pessoas temem ser substituídas. Como você age diante disso?",
        respostas: [
            {
                conteudo: "Reúno meus colegas de trabalho e fundo um grupo de debates para discutir a implementação ética dessas ferramentas.",
                consequencia: "Sua empatia e preocupação com o próximo o motivaram a fundar um grupo de estudos com outros trabalhadores, promovendo debates cruciais sobre a aplicação moral e ética dessas novas tecnologias."
            },
            {
                conteudo: "Proponho encontros semanais no escritório para acalmar a equipe e estudar os limites morais das máquinas.",
                consequencia: "Sua empatia e preocupação com o próximo o motivaram a fundar um grupo de estudos com outros trabalhadores, promovendo debates cruciais sobre a aplicação moral e ética dessas novas tecnologias."
            }
        ]
    },
    {
        textoPergunta: "Durante esses encontros, você repara que a maioria não domina sequer os softwares básicos. Sendo alguém criativo, qual é a sua contrib

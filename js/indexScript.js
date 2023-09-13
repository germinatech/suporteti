//Variaveis e constantes
const popup = document.querySelector("#popup")
const pcont = document.querySelector("#textoContador")
const cooldownChamado = 30 //Variavel que dita o tempo do cooldown (em segundos)
//Muda o texto do elemento com id #sala para mostrar qual sala o usuário está
document.querySelector('#sala').textContent = `Você está na sala: ${localStorage.getItem('sala')}`

// Funções
//Função para criar problema e envia-lo á uma planilha, recebe como parametro um problema
const criarProblema = problema => {
  //Capturando a sala pelo parametro da URL
  const sala = localStorage.getItem('sala')

  //Armazenando data e hora atual
  var dataHoraAtual = new Date();
  var horario = dataHoraAtual.getHours() + ":" + dataHoraAtual.getMinutes() + ":" + dataHoraAtual.getSeconds();
  var mes = dataHoraAtual.getMonth()+1
  var data = dataHoraAtual.getDate() + "/" + mes + "/" + dataHoraAtual.getFullYear();
  var msg = "chamado enviado pelo Site Suporte TI"
  
  //Criando a mensagem que será enviada á planilha
  const mensagem = {
    Sala: sala,
    Problema: problema,
    Hora: horario,
    Data: data, 
    Aviso: msg
  };

  //Enviando a mensagem a planilha
  fetch("https://sheetdb.io/api/v1/s43vascv96nsa", //Link da planilha do sheetSB do google sheets 
  { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mensagem)
  })

  //Tratando possiveis erros
    .then(response => {
      if (response.ok) {
        console.log('Problema criado com sucesso!');
      } else {
        console.error('Erro ao criar o problema:', response.status);
      }
    })
    .catch(error => {
      console.error('Erro na solicitação:', error);
    });
}

const contador = () => {
  let cont = 0;
  pcont.style.display = 'block';
  // Definir o intervalo para aumentar o contador a cada 1 segundo
  const interval = setInterval(() => {
    cont++;

    //Calcula o tempo
    tempo = cooldownChamado-cont
    minutos = Math.floor(tempo/60)
    segundos = tempo%60

    // Mostrar o contador atualizado
    pcont.textContent = `Você pode chamar a TI novamente em: ${minutos}min ${segundos}s`

    // Se o contador atingir 10 minutos (600s), para o intervalo
    if (cont === cooldownChamado) {
      clearInterval(interval);
      pcont.style.display = 'none'
    }
  }, 1000);
}
// Função para mostrar pop-up
const abrirPopup = () =>  popup.style.display = 'block';
const fecharPopup = () => popup.style.display = 'none'

//Criando função para cooldown. A função atualiza uma variável do armazenamento local chamada authProblema. Ela define o valor como 1.
const cooldown = () => {
  localStorage.setItem('authProblema', '1')
}

const enviarProblema = (mensagem) => {
  //Define um intervalo para não dar bug
  setTimeout(() => {
    //Verifica se pode enviar o problema
    if (localStorage.getItem('authProblema') === '1') {
      //Cria o problema e mostra o popup
      criarProblema(mensagem);
      abrirPopup();
      contador()

      //Reseta o autenticador do envio de problemas
      localStorage.setItem('authProblema', '0');
    }
  }, 100);
}

//Define inicialmente o valor de authProblema como 1.
cooldown()

//A cada 1min, executa a função cooldown.
setInterval(cooldown, cooldownChamado*1000+3000);

//Verifica se o usuário fez login
if (localStorage.getItem('auth') !== '1'){
  window.location.href = 'login.html'
}

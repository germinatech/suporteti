//Função para capturar os dados do login e valida-los 
function capturarLogin(event) {
  const handleLogin = complemento => {
    //Cria as senhas
    const basePass = 'sala.'
    const password = basePass+complemento
    
    //Valida a senha
    if (codigo === password){
      localStorage.setItem('auth', '1')

      //Abre a pagina principal
      window.open('index.html', '_blank');

      //Salva a sala em uma variavel no localStorage
      localStorage.setItem('sala', complemento.toUpperCase())
    }
}
  event.preventDefault();

  //Captura o valor que o usuário coloca na pagina de login
  const codigo = document.querySelector('#acesscode').value
  
  //Lista dos complementos possiveis (salas existentes)
  const salas = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', 'P14','S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14'];

  //Cria possibilidades de senha para cada item da lista
  for (const sala of salas) {
    handleLogin(sala);
  }

}

// Adiciona função para quando clicar no botão de submit capturar login
document.querySelector('#subLogin').addEventListener('click', capturarLogin);

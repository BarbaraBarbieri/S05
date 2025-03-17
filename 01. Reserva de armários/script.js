// objeto do usuário
const usuario = { nome: "Bárbara", matricula: "140", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, dataReserva: null, dataEntrega: null, acessivel: false },
  { id: 2, formato: "padrao", status: true, dataReserva: null, dataEntrega: null, acessivel: false },
  { id: 3, formato: "padrao", status: true, dataReserva: null, dataEntrega: null, acessivel: false },
  { id: 4, formato: "padrao", status: true, dataReserva: null, dataEntrega: null, acessivel: true },
  { id: 5, formato: "padrao", status: true, dataReserva: null, dataEntrega: null, acessivel: true },
  { id: 6, formato: "duplo", status: true, dataReserva: null, dataEntrega: null, acessivel: false },
  { id: 7, formato: "duplo", status: true, dataReserva: null, dataEntrega: null, acessivel: true },
  { id: 8, formato: "duplo", status: true, dataReserva: null, dataEntrega: null, acessivel: true },
];

// função para reserva do armário, incluindo as regras
function reservarArmario() {

  // obter tipo de armário selecionado pelo usuário no html
  let tipoSelecionado = document.getElementById("tipoArmario").value;

  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);

  // caso não exista armário disponível, retorna para o usuário mensagem
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }

  // caso exista armário(s) disponíveil, seguimos sorteando uma opção
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

  // depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id).status = false;

  // obtemos data e hora atuais e atualizamos a data de reserva do armário
  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva;

  // calculamos a data e hora para entrega das chaves (24h depois) e atualizamos a data de entrega do armário
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega;

  // finalmente, mudamos a pendencia do usuário para verdadeira
  usuario.pendencia = true;

  // imprimimos uma mensagem de reserva para o usuário
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!\nData de entrega: ${dataEntrega.toLocaleString()}`;

  console.log(usuario);
  console.log(armarios);
}
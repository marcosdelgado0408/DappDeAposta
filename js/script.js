// ENDEREÇO EHTEREUM DO CONTRATO
// var contractAddress = "0x813D75228541D0c27Db4071CC56FED029bCFA9b7"; // Weverson Owner
var contractAddress = "0x45AF03e7093657fAdE4CE452a0694b3E8e09b87a"; // Marcos Owner
//var contractAddress = "0x27FCe6302bf9916A6880f3cA3a8636d3050DaC0f"; // TESTE CRONOMETRO



// Inicializa o objeto DApp
document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad() {
  DApp.init();
}

// Nosso objeto DApp que irá armazenar a instância web3
const DApp = {
  web3: null,
  contracts: {},
  account: null,

  init: function () {
    return DApp.initWeb3();
  },

  // Inicializa o provedor web3
  initWeb3: async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ // Requisita primeiro acesso ao Metamask
          method: "eth_requestAccounts",
        });
        DApp.account = accounts[0];
        window.ethereum.on('accountsChanged', DApp.updateAccount); // Atualiza se o usuário trcar de conta no Metamaslk
      } 
      catch (error) {
        console.error("Usuário negou acesso ao web3!");
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    } 
    else {
      console.error("Instalar MetaMask!");
      return;
    }
    return DApp.initContract();
  },

  // Atualiza 'DApp.account' para a conta ativa no Metamask
  updateAccount: async function() {
    DApp.account = (await DApp.web3.eth.getAccounts())[0];
    atualizaInterface();
  },

  // Associa ao endereço do seu contrato
  initContract: async function () {
    DApp.contracts.Contrato = new DApp.web3.eth.Contract(abi, contractAddress);
    return DApp.render();
  },

  // Inicializa a interface HTML com os dados obtidos
  render: async function () {
    inicializaInterface();
  },
};


// *** MÉTODOS (de consulta - view) DO CONTRATO ** //

function verCampeao() {
  return DApp.contracts.Contrato.methods.viewWinner().call({ from: DApp.account });
}


function ehdono(){
  return DApp.contracts.Contrato.methods.isOwner().call({ from: DApp.account });
}

function verGanhos(){
  return DApp.contracts.Contrato.methods.viewPrize().call({ from: DApp.account });
}

function verValorApostado(){
  return DApp.contracts.Contrato.methods.seeMyBetAmount().call({ from: DApp.account });
}

function verCavaloApostado(){
  return DApp.contracts.Contrato.methods.seeMyBetHorse().call({ from: DApp.account });
}

function verApostaMinima(){
  return DApp.contracts.Contrato.methods.viewMinimumBet().call({ from: DApp.account });
}


// *** MÉTODOS (de escrita) DO CONTRATO ** //


function betOnHorse() { //function betOnHorse(uint horseNumber) public payable
  let horseNumber = document.getElementById("NumCavalo").value;
  let amount = document.getElementById("amount").value; // em wei por enquento
  return DApp.contracts.Contrato.methods.betOnHorse(horseNumber).send({ from: DApp.account, value: amount }).then(atualizaInterface);;
}

function setWinner(){
  return DApp.contracts.Contrato.methods.setWinner().send({from: DApp.account}).then(atualizaInterface);;

}

function withDraw(){ // function withDraw() external onlyOwner
  return DApp.contracts.Contrato.methods.withDraw().send({from: DApp.account}).then(atualizaInterface);;
}



// *** ATUALIZAÇÃO DO HTML *** //

function inicializaInterface() {
    document.getElementById("apostar").onclick = betOnHorse;
    document.getElementById("setWinner").onclick = setWinner;
    document.getElementById("withDraw").onclick = withDraw;

    atualizaInterface();

    DApp.contracts.Contrato.getPastEvents("mostrarAposta", { fromBlock: 0, toBlock: "latest" }).then((result) => registraEventos(result));
    DApp.contracts.Contrato.events.mostrarAposta((error, event) => registraEventos([event]));

  }

function atualizaInterface() {
 
  verApostaMinima().then((result) => {
    document.getElementById("apostaMinima").innerHTML = result;
  });

  document.getElementById("endereco").innerHTML = DApp.account;

  verGanhos().then((result) => {
    document.getElementById("ganhoEstimado").innerHTML = result;
  });

  verCavaloApostado().then((result) => {
    document.getElementById("cavaloApostado").innerHTML = result;
  });

  verValorApostado().then((result) => {
    document.getElementById("valorApostado").innerHTML = result;
  });

  document.getElementById("apostasEncerradas").style.display = "none";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("resetButton").style.display = "none";
  document.getElementById("setWinner").style.display = "none";
  document.getElementById("withDraw").style.display = "none";
  ehdono().then((result) => {
  
    if(result){
      document.getElementById("setWinner").style.display = "block";
      document.getElementById("withDraw").style.display = "block";
    }
  
  });
  verCampeao().then((result) => {
    if(result != 0){
      document.getElementById("apostasEncerradas").style.display = "block";
      document.getElementById("startButton").style.display = "block";
      document.getElementById("resetButton").style.display = "block";
    }
  });

}

function registraEventos(eventos){
  let table = document.getElementById("events");

  eventos.forEach(evento => {
    
    let tr = document.createElement("tr");
   
    let td1 = document.createElement("td");
    td1.innerHTML = "<a href='https://ropsten.etherscan.io/address/"+ evento["returnValues"]["addr"] +"' style= 'color: SpringGreen'; >" + evento["returnValues"]["addr"] + "</a>";
    let td2 = document.createElement("td");
    td2.innerHTML = evento["returnValues"]["amount"];
    let td3 = document.createElement("td");  
    td3.innerHTML = evento["returnValues"]["horseNumber"];
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);

  });

}




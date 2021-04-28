// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0x9896751E2812f679EE75643D5f1213e1a9AEaba1";

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



// *** MÉTODOS (de escrita) DO CONTRATO ** //


function betOnHorse() { //function betOnHorse(uint horseNumber) public payable
  let horseNumber = document.getElementById("NumCavalo").value;
  let amount = document.getElementById("amount").value; // em whei por enquento
  return DApp.contracts.Contrato.methods.betOnHorse(horseNumber).send({ from: DApp.account, value: amount }).then(atualizaInterface);;
}





// *** ATUALIZAÇÃO DO HTML *** //

function inicializaInterface() {
    document.getElementById("apostar").onclick = betOnHorse;

    atualizaInterface();
}

function atualizaInterface() {
 
  verCampeao().then((result) => {
    document.getElementById("campeao-atual").innerHTML = result;
  });

  document.getElementById("endereco").innerHTML = DApp.account;


  document.getElementById("startButton").style.display = "none";
  document.getElementById("resetButton").style.display = "none";
  ehdono().then((result) => {
  
    if(result){
      document.getElementById("startButton").style.display = "block";
      document.getElementById("resetButton").style.display = "block";
    }
  
  });


}

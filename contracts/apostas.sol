
pragma  solidity  ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

contract Bet{
    
    address owner; // endereço do dono do contrato
    
    struct BettedHorse{
        uint amount; // valor da aposta
        uint horseNumber; //numero do cavalo apostado
    }
    uint winner; // numero do cavalo vencedor
    uint horseQuantity; // quantidade de cavalos
    
    mapping(address => BettedHorse) bets;
    address[] players;

    constructor(){
        owner = msg.sender;
        horseQuantity = 5;
    }
    
    modifier onlyOwner {
		require(msg.sender == owner, "Somente o dono do contrato pode invocar essa funcao!");
		_;
	}
    
    event mostrarAposta(uint amount, uint horseNumber);
    
    function checkPlayerExists(address player) public view returns(bool){
        for(uint i=0; i < players.length; i++){
            if(players[i] == player){
                return true;
            }
        }
        return false;
    }

    function betOnHorse(uint horseNumber) public payable{
        
        require(!checkPlayerExists(msg.sender)); // so é possivel 1 aposta por endereço
        
        require(horseNumber < horseQuantity); // nao e possivel apostar em cavalos que nao estajam disponiveis
        
        require(msg.value > 0); // nao e possivel apostar sem dinheiro
        
        bets[msg.sender].amount = msg.value;
        bets[msg.sender].horseNumber = horseNumber;
        
        players.push(msg.sender);
        
        emit mostrarAposta(msg.value, horseNumber);
    }
    
    
    function setWinner() public onlyOwner{
        winner = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % horseQuantity + 1;
    }
    
    
    function viewWinner() public view returns(uint){
        return winner;
    }
    
    function withDraw() external onlyOwner{
        address addr;
        
        for(uint i=0;i<players.length;i++){
            addr = players[i];
            
            if(bets[addr].horseNumber == winner){
                address payable payableAddr = payable(addr);
                payableAddr.transfer(bets[addr].amount);
            }
            delete bets[addr];
        }
        winner = 0;
        delete players;
    }
    
    function isOwner() public view returns (bool){
    	return msg.sender == owner;
    }
    
    function seeMyBetAmount() public view returns(uint){
        return bets[msg.sender].amount;
    }
    function seeMyBetHorse() public view returns(uint){
        return bets[msg.sender].horseNumber;
    }
}
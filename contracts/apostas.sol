
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
    address[] addresses;

    constructor(){
        owner = msg.sender;
        horseQuantity = 5;
    }
    
    modifier onlyOwner {
		require(msg.sender == owner, "Somente o dono do contrato pode invocar essa funcao!");
		_;
	}
    
    event mostrarAposta(uint amount, uint horseNumber);
    
    

    function betOnHorse(uint horseNumber) public payable{
        
        require(horseNumber < horseQuantity); // nao e possivel apostar em cavalos que nao estajam disponiveis
        
        require(msg.value > 0); // nao e possivel apostar sem dinheiro
        
        BettedHorse memory cavaloApostado;
        
        cavaloApostado.amount = msg.value;
        cavaloApostado.horseNumber = horseNumber;
        
        bets[msg.sender] = cavaloApostado;
        
        addresses.push(msg.sender);
        
        emit mostrarAposta(msg.value, horseNumber);
        
    }
    
    
    function setWinner() public onlyOwner{
        winner = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % horseQuantity;
    }
    
    
    function viewWinner() public view returns(uint){
        return winner;
    }
    
    
    
    function withDraw() external onlyOwner{
        address addr;
        
        for(uint i=0;i<addresses.length;i++){
            addr = addresses[i];
            
            if(bets[addr].horseNumber == winner){
                address payable payableAddr = payable(addr);
                payableAddr.transfer(bets[addr].amount);
            }
           
        }
        
    }
    
    function isOwner() public view returns (bool){
    	return msg.sender == owner;
    }
    
    
}

pragma  solidity  ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

contract Bet{
    
    address owner; // endereço do dono do contrato
    
    struct BettedHorse{
        uint amount; // valor da aposta
        uint horseNumber; //numero do cavalo apostado
    }
    uint winner; // numero do cavalo vencedor

    mapping(address => BettedHorse) bets;
    address[] players;
    uint minimumBet = 100000000000000;

    constructor(){
        owner = msg.sender;
    }
    
    modifier onlyOwner {
		require(msg.sender == owner, "Somente o dono do contrato pode invocar essa funcao!");
		_;
	}
    
    event mostrarAposta(address addr, uint amount, uint horseNumber);
    event mostrarVencedor(uint horseNumber);
    
    function checkPlayerExists(address player) public view returns(bool){
        for(uint i=0; i < players.length; i++){
            if(players[i] == player){
                return true;
            }
        }
        return false;
    }

    function betOnHorse(uint horseNumber) public payable{
        require(winner != 0);
        require(!checkPlayerExists(msg.sender)); // so é possivel 1 aposta por endereço
        
        require(horseNumber < 6 && horseNumber != 0); // nao e possivel apostar em cavalos que nao estajam disponiveis
        
        require(msg.value >= minimumBet); // nao e possivel apostar sem dinheiro
        
        bets[msg.sender].amount = msg.value;
        bets[msg.sender].horseNumber = horseNumber;
        
        players.push(msg.sender);
        emit mostrarAposta(msg.sender, msg.value, horseNumber);
    }
    
    
    function setWinner() public onlyOwner{
        winner = (uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 5)+1;
    }
    
    
    function viewWinner() public view returns(uint){
        return winner;
    }
    
    function withDraw() external onlyOwner{
        require(winner != 0);
        for(uint i=0;i<players.length;i++){
            
            if(bets[players[i]].horseNumber == winner){
                address payable payableAddr = payable(players[i]);
                payableAddr.transfer(prize(players[i]));
            }
        }
        for(uint i=0;i<players.length; i++){
            delete bets[players[i]];
        }
        emit mostrarVencedor(winner);
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
    
    function prize(address player) private view returns(uint){
        uint myHorseTotalBets = 0;
        uint otherHorsesTotalBets = 0;
        address addr;
        for(uint i=0;i<players.length;i++){
            addr = players[i];
            if(bets[addr].horseNumber == bets[player].horseNumber){
                myHorseTotalBets += bets[addr].amount;
            }
            else{
                otherHorsesTotalBets += bets[addr].amount;
            }
        }
        return ((bets[player].amount * (10000 + (otherHorsesTotalBets * 10000 / myHorseTotalBets))) / 10000); 
    }
    
    function viewPrize() public view returns(uint){
        if(!checkPlayerExists(msg.sender)){
            return 0;
        }
        else{
            return prize(msg.sender);
        }
    }
    
    function viewMinimumBet() public view returns(uint){
        return minimumBet;
    }
}
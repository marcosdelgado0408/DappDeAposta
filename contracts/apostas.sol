
pragma  solidity  ^0.7.0;

// SPDX-License-Identifier: GPL-3.0

contract Bet{
    
    address owner; // endereço do dono do contrato
    
    struct BettedHorse{
        uint amount; // valor da aposta
        uint horseNumber; //numero do cavalo apostado
    }
    uint winner; // numero do cavalo vencedor
    //uint horseQuantity; // quantidade de cavalos
    
    mapping(uint => uint) totalBets;
    
    mapping(address => BettedHorse) bets;
    address[] players;

    constructor(){
        owner = msg.sender;
        emptyTotalBets();
    }
    
    modifier onlyOwner {
		require(msg.sender == owner, "Somente o dono do contrato pode invocar essa funcao!");
		_;
	}
    
    event mostrarAposta(address addr, uint amount, uint horseNumber);
    
    function checkPlayerExists(address player) public view returns(bool){
        for(uint i=0; i < players.length; i++){
            if(players[i] == player){
                return true;
            }
        }
        return false;
    }
    function emptyTotalBets() internal{
        for(uint i=1; i<6; i++){
            totalBets[i] = 0;
        }
    }

    function betOnHorse(uint horseNumber) public payable{
        
        require(!checkPlayerExists(msg.sender)); // so é possivel 1 aposta por endereço
        
        require(horseNumber < 6); // nao e possivel apostar em cavalos que nao estajam disponiveis
        
        require(msg.value > 0); // nao e possivel apostar sem dinheiro
        
        bets[msg.sender].amount = msg.value;
        bets[msg.sender].horseNumber = horseNumber;
        
        totalBets[horseNumber] += msg.value;
        
        players.push(msg.sender);
        emit mostrarAposta(msg.sender, msg.value, horseNumber);
    }
    
    
    function setWinner() public onlyOwner{
        winner = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 6;
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
                payableAddr.transfer(reward(payableAddr));
            }
            delete bets[addr];
        }
        emptyTotalBets();
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
    
    function reward(address player) public view returns(uint){
        uint myHorse = bets[player].horseNumber;
        uint rwd = bets[player].amount / totalBets[myHorse];
        uint totalBetOtherHorses = 0;
        for(uint i = 1; i<6; i++){
            if(i != myHorse){
                totalBetOtherHorses += totalBets[i];
            }
        }
        rwd *= totalBetOtherHorses;
        rwd += bets[player].amount;
        return rwd;
    }
    
    function viewReward() public view returns(uint){
        return reward(msg.sender);
    }
    
}
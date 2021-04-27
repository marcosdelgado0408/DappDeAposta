
pragma  solidity  ^0.7.0;

contract  owner {

    address owner;

    constructor() {
        owner =  msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Somente o dono do contrato pode invocar essa funcao!");
        _;
    }
}



contract Bet is owner{
    
     struct BettedHorse{
        uint amount;
        uint horseNumber;
    }
    
    uint[] horses; /*cada cavalo tera um numero*/ /*MUITO ARRIACAO ISSO NAO PRECISA*/
    mapping(address => BettedHorse) bets;
    address[] addresses;

    constructor() public{
        horses.push(1);
        horses.push(2);
        horses.push(3);
        horses.push(4);
        horses.push(5);
    }
    

    function betOnHorse(uint horseNumber) public payable{
        
        require(horseNumber < horses.length); // nao e possivel apostar em cavalos que nao estajam disponiveis
        
        BettedHorse memory cavaloApostado;
        
        cavaloApostado.amount = msg.value;
        cavaloApostado.horseNumber = horseNumber;
        
        bets[msg.sender] = cavaloApostado;
        
        
        // horseNumbers[horseNumber].push(msg.sender);
        addresses.push(msg.sender);
        
    }
    
    
    function setWinner() public view returns(uint){
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % horses.length;
        return random;
    }
    
    function withDraw() external{
        uint winner = setWinner();
        address addr;
        
        for(uint i=0;i<addresses.length;i++){
            addr = addresses[i];
            
            if(bets[addr].horseNumber == winner){
                address payable payableAddr = payable(addr);
                payableAddr.transfer(bets[addr].amount);
            }
           
        }
        
    }
    
    
    
    
}
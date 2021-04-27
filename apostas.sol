
pragma  solidity  ^0.5.0;

contract  owner {

    address owner;

    constructor() public {
        owner =  msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Somente o dono do contrato pode invocar essa função!");
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
    mapping(uint => address[]) horseNumbers;
    address[] addresses;
    
    constructor() public{
        horses.push(1);
        horses.push(2);
        horses.push(3);
        horses.push(4);
        horses.push(5);
    }
    

    function betOnHorse(uint horseNumber) public payable{
        
        require(horseNumber > horses.length); // nao e possivel apostar em cavalos que nao estajam disponiveis
        
        BettedHorse memory bettedHorse;
        
        bettedHorse.amount = msg.value;
        bettedHorse.horseNumber = horseNumber;
        
        bets[msg.sender] = bettedHorse;
        
        
        horseNumbers[horseNumber].push(msg.sender);
        addresses.push(msg.sender);
        
    }
    
    
    function setWinner() public view returns(uint){
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % horses.length;
        return random;
    }
    
    function withDraw() external{
        uint winner = setWinner();
        
        for(uint i=0;i<addresses.length;i++){
            address addr = addresses[i];
            uint betterAmount = bets[addr].amount;
            
            address[] memory enderecos = horseNumbers[winner];
           
            for(uint j=0;j<enderecos.length;j++){
                address payable fodase = enderecos[i];
                enderecos[i].transfer(betterAmount);
            }
            
            
        }
        
    }
    
    
    
    
}
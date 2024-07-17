// Construção de objeto (player), com seus atributos
const player1 ={
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

const player2 ={
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}

/* função de rolar o dado, math.floor é para arredondar, math.random é o aleatório de 0 ou 1, 
multiplicado por 6 para obter os resultados do dado*/
async function rollDice(){
   return Math.floor(Math.random() * 6) + 1;
}


async function getRandomBlock(){
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.25:
            result = "RETA"
            break;
        case random < 0.50:
            result = "CURVA"
            break;
            case random < 0.75:
            result = "CONFRONTO COM BOMBA"
            break;        
        default:
            result = "CONFRONTO COM CASCO"
    }

    return result
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
} 

async function playRaceEngine(character1,character2){

    //define a variavel e o valor inicial; valor final; incremento ou decremento
    for(let round = 1; round <=5; round ++ ){
        console.log(`🏁 Rodada ${round}`);

        //Sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

          // rolar os dados
let diceResult1 = await rollDice();
let diceResult2 = await rollDice();

//teste de habilidade
let totalTestSkill1 = 0;
let totalTestSkill2 = 0;

if(block === "RETA"){
totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

await logRollResult(
    character1.NOME,
    "velocidade",
    diceResult1,
    character1.VELOCIDADE
);

await logRollResult(
    character2.NOME,
    "velocidade",
    diceResult2,
    character2.VELOCIDADE
);
}
if(block === "CURVA"){
   totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
   totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

   await logRollResult(
    character1.NOME,
    "manobrabilidade",
    diceResult1,
    character1.MANOBRABILIDADE
);

   await logRollResult(
    character2.NOME,
    "manobrabilidade",
    diceResult2,
    character2.MANOBRABILIDADE
);

}
if(block === "CONFRONTO COM CASCO"){
    let powerResult1 = diceResult1 + character1.PODER;
    let powerResult2 = diceResult2 + character2.PODER;

    console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
    

    await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
    );
    
       await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
    );


    if(powerResult1 > powerResult2){
        character2.PONTOS--;
        character1.PONTOS++;
        console.log(`${character1.NOME} Venceu o confronto e ganhou um ponto 🎖️! ${character2.NOME} Perdeu 1 ponto`)
    }

    if(powerResult2 > powerResult1){
        character1.PONTOS--;
        character2.PONTOS++;
        console.log(`${character2.NOME} Venceu o confronto e ganhou um ponto 🎖️! ${character1.NOME} Perdeu 1 ponto`)
    }

console.log(powerResult1 === powerResult2 ? "Confronto Empatado! Nenhum ponto foi perdido":"")

}
if(block === "CONFRONTO COM BOMBA"){
    let powerResult1_1 = diceResult1 + character1.PODER;
    let powerResult2_2 = diceResult2 + character2.PODER;

    console.log(`${character1.NOME} Confrontou com ${character2.NOME}! 🥊`)

    await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
    );

    await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
    );

    if(powerResult1_1 > powerResult2_2 && character2.PONTOS > 0 ){
        character2.PONTOS-2;
        character1.PONTOS++;
        console.log(`${character1.NOME} Venceu o confronto e ganhou 1 ponto 🎖️! ${character2.NOME} Perdeu 2 pontos`)
    }

    if(powerResult2_2 > powerResult1_1 && character1.PONTOS > 0 ){
        character1.PONTOS-2;
        character2.PONTOS++;
        console.log(`${character2.NOME} Venceu o confronto e ganhou 1 ponto 🎖️! ${character1.NOME} Perdeu 2 pontos`)
    }

console.log(powerResult1_1 === powerResult2_2 ? "Confronto Empatado! Nenhum ponto foi perdido":"")

}

// Verificando o vencedor
if(totalTestSkill1 > totalTestSkill2){
    console.log(`${character1.NOME} Marcou um ponto!`);
    character1.PONTOS++;
}else if(totalTestSkill2 > totalTestSkill1){
    console.log(`${character2.NOME} Marcou um ponto!`);
    character2.PONTOS++;
}

console.log("--------------------------------------------------");

    }

  
}


async function declareWinner(character1,character2){

    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS}`);
    console.log(`${character2.NOME}: ${character2.PONTOS}`);

if(character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} Venceu a corrida! Parabéns`)
else if(character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} Venceu a corrida! Parabéns`)
else{
    console.log("A corrida terminou em empate!")
}

}

//função auto invocável, ou seja, toda vez que o arquivo js rodar, a função será executada. OBS: 
(async function main(){
console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando ...\n`);

//chamando uma função dentro da outra (encadeamento) e passando os objetos para que seja executada
await playRaceEngine(player1,player2);
await declareWinner(player1,player2);

})();
function diceRoll(){
    var dice1 = Math.ceil(Math.random()*6);
    var dice2 = Math.ceil(Math.random()*6);

    document.querySelector(".img1").setAttribute("src",`./images/dice${dice1}.png`);
    document.querySelector(".img2").setAttribute("src",`./images/dice${dice2}.png`);

    if(dice1 > dice2){
        document.querySelector("#conclusion").innerHTML = "Player 1 Wins";
    }
    else {
        document.querySelector("#conclusion").innerHTML = "Player 2 Wins";
    }
}
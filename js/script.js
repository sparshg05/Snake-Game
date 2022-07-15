//Game Constants
let inputDir= {x:0 , y:0};               //Initial position of snake
const foodSound= new Audio("food.mp3");
const gameOverSound= new Audio("gameover.mp3");
const moveSound= new Audio("move.mp3");
const musicSound= new Audio("music.mp3");
let speed=5;
let lastPaintTime=0;
let score=0;
let snakeArr = [
    {x:13 , y:15}
]
food = {x:5 , y:10};

//Game Functions
function main(ctime){                        //ctime=currentTime
    window.requestAnimationFrame(main);                       //To make game loop
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){                   //Controlling the fps otherwise it will execute very fastly
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snakeArr){
    //If snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y){                //when head collides with any of the remaining segment
            return true;
        }
    }
    //if snake crosses the boundary of the box
    if(snakeArr[0].x<=0 || snakeArr[0].x>=18 || snakeArr[0].y<=0 || snakeArr[0].y>=18){
        return true;
    }
}

function gameEngine(){
    //Part1: Updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over!!! Press any key to start again.");
        snakeArr=[{x:13, y:15}];                              //Regenerating the snake again
        // musicSound.play();
        score=0;
    }

    //If u have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){                    //When coordinates of snake head equals food coordinates
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Hiscore : " + hiscoreval;
        }
        scoreBox.innerHTML="Score : " + score;                                        //Displaying the score 
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x , y: snakeArr[0].y+inputDir.y})            //Inserts new element in start of array
        let a=2;
        let b=16;
        food = {x: Math.round(a + (b-a)*Math.random()) , y: Math.round(a + (b-a)*Math.random())}                            //This formula is used to generate random number btw A & B
    }                
    
    //Moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};              //3 dots are used to create a new object otherwise everyone will point to the same object
    }
 
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
 
    //Part2: Display the snake and food
    //Display the snake
    board.innerHTML="";                                           //Making the board empty
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');                  //To traversse in the array objects, an elment is created
        snakeElement.style.gridRowStart = e.y;                     //To take snake to a particular row n column
        snakeElement.style.gridColumnStart = e.x;
        if(index ===0){
            snakeElement.classList.add("head");                       //Adding the head class to the snakeElement
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);                          //Appending to the element board
    });

    //Display the food
    foodElement = document.createElement('div');                  
    foodElement.style.gridRowStart = food.y;                     
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}



//Main logic starts here
let hiscore= localStorage.getItem("hiscore");                  //Getting the value from local storage
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))       //Converting hiscore to string and then storing it
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore : " + hiscore;
}

window.requestAnimationFrame(main);             //when rendering animation and it contains a method as argument. //It is preffered over "setInterval" bcoz gives higher FPS,can render continuously

//Listening to the event as any key is pressed
window.addEventListener('keydown',e=>{              //1st arguement= Event , 2nd arg= Arrow func           
    inputDir = {x:0 , y:1};                      //Start the game
    moveSound.play();
//To get which key is pressed
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;            
    
        default:
            break;
    }
});
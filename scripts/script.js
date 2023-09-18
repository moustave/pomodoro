const timer = document.getElementById("timer");
const bottle = document.getElementById("bottle");
const play = document.getElementById("play");
const sauces = document.getElementsByClassName("sauce");
const workTime = 25*60;
const pauseTime = 5*60;

let tick = 0;
let currentInterval;
let advancement = 1;

let isGoing = false
let isWorking = true
let time = 25*60;

timer.textContent = `${Math.floor(time/60)}:${(time%60)<10?"0":""}${time%60}`;

function updateDisplay()
{
    timer.textContent = `${Math.floor(time/60)}:${(time%60)<10?"0":""}${time%60}`;
    if (isWorking)
    {
        advancement = time / workTime;
    }
    else
    {
        advancement = time / pauseTime;
    }
}

function update()
{
    time -=1;
    updateDisplay();
}

function reset()
{
    isGoing = false;
        play.classList.remove("fa-xmark");
        play.classList.add("fa-xplay");
        clearInterval(currentInterval);
        time = 25*60;
}

function buttonPressed() {
    if (isGoing)
    {
        reset();
        updateDisplay();
    }
    else
    {
        isGoing = true;
        play.classList.remove("fa-xplay");
        play.classList.add("fa-xmark");
        currentInterval = setInterval(() => update(),10);
    }
}


function wave(res, amp, temporalPeriod, wavePeriod)
{
    //res is the resolution. = how many points are gonna be computed to draw the waves
    //amp is the amplitude of the waves.
    //temporalPeriod is how fast each point is moving
    //wavePeriod is how much the X position of a point influences the 
    console.log(tick)
    tick += 1;
    let maxHeight = bottle.offsetHeight;
    //even though width must be the same as the height... just in case
    let width = bottle.offsetWidth;
    let incr = width/res;
    console.log(bottle.offsetHeight)
    for (let i = 0; i < sauces.length; i++)
    {
        //the height of the sauce
        let height = (maxHeight - Math.floor(advancement*maxHeight));
        //make the waves fully visible even when full
        height += amp;
        //path is a csv path, using to mask the sauce. 
        let path = `M`;
        for (let j = 0; j<=res; j++)
        {
            let y = height;
            y += amp*Math.sin(wavePeriod*j + temporalPeriod * tick/1000);

            path += `${Math.round(j*incr)},${y} L`;
        }
        path += "500,500 L0,500 Z";
        console.log(path)
        //path = "M0,100 C150,200 350,0 500,100 L500,500 L0,550 Z"
        //path = "M0,0 T64,100 T128,100 T192,100 T256,100 T320,100 L500,500 L0,500 Z"
        let sauce = sauces[i];
        sauce.style.clipPath = `path('${path}')`;
    }
}

setInterval(() => wave(50,20,54,0.2),20)

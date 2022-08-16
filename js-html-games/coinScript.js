const slider = document.getElementById('slider');
const counter = [0, 0];

function createEverything() {

    const imgList = document.createElement('ul');
    const img = document.createElement('img');
    const result = document.createElement('p');
    
    result.innerHTML = "Results: _______";
    img.setAttribute('src', "./animation/frame_00_delay-0.07s.gif");
    slider.appendChild(imgList);
    imgList.appendChild(img);
    imgList.appendChild(result);

    function setImgNum(num, target) {
        if (num < 10) {
            target.setAttribute('src', `./animation/frame_0${num}_delay-0.07s.gif`);
        } 
        else {
            target.setAttribute('src', `./animation/frame_${num}_delay-0.07s.gif`);
        }
    }
    
    const SPEED = 10;
    
    function run(n, start, end) {
        let count = start;
        let lastCount = 0;
        function next(last) {
            if (count < last) {
                setImgNum(count, img)
                // console.log("count", count);
                count++;
            }
            else if (count === last && lastCount !== n) {
                // console.log("lastCount is ", lastCount)
                count = 0;
                lastCount++;
            }
        }
        setInterval(function() {next(end)}, SPEED);
    }
    
    function genResult() {
        const flipResult = Math.random();
        if (flipResult < 0.5) {
            console.log("heads");
            return "heads";
        } 
        else {
            console.log("tails");
            return "tails";
        }
    }
    
    switch (genResult()) {
        case "heads":
            run(1, 0, 9);
            counter[0]++;
            result.innerHTML = `Results: <strong>heads</strong>`;
            break;
        case "tails":
            run(1, 9, 17);
            counter[1]++;
            result.innerHTML = `Results: <strong>tails</strong>`;
        break;
    }
}

document.getElementById("coinform").addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById("numTimes").value;
    const error = document.getElementById("error");
    const counts = document.getElementById("counter");
    slider.textContent = '';
    if (input.length > 0 && !isNaN(input)) {
        for (let i = 0; i < Number(input); i++) {
            createEverything();
        }
        error.innerHTML = "";
        counts.style.display = "inline-block";
        counts.innerHTML = `Heads: <strong>${counter[0]}</strong> Tails: <strong>${counter[1]}</strong>`
        counter[0] = 0;
        counter[1] = 0;
    }
    else {
        error.innerHTML = "Please enter a number.";
    }
    console.log(input);
})

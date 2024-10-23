const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
let startAngle = 0;
let arc = Math.PI / 6;
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function drawRouletteWheel(names) {
    if (canvas.getContext) {
        const numOptions = names.length;
        const arc = 2 * Math.PI / numOptions;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.font = "16px Arial";
        
        for (let i = 0; i < numOptions; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = i % 2 === 0 ? "#FFCC00" : "#FF9900";
            ctx.beginPath();
            ctx.arc(250, 250, 250, angle, angle + arc, false);
            ctx.arc(250, 250, 0, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            
            ctx.save();
            ctx.translate(250 + Math.cos(angle + arc / 2) * 150, 250 + Math.sin(angle + arc / 2) * 150);
            ctx.rotate(angle + arc / 2);
            ctx.fillStyle = "black";
            ctx.fillText(names[i], -ctx.measureText(names[i]).width / 2, 0);
            ctx.restore();
        }
    }
}

function rotateWheel() {
    spinAngleStart += (spinTime / spinTimeTotal) * spinAngleStart;
    startAngle += spinAngleStart * Math.PI / 180;
    drawRouletteWheel(currentNames);
    
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
    } else {
        spinTimeout = setTimeout('rotateWheel()', 30);
    }
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcSize = 360 / currentNames.length;
    const index = Math.floor((360 - (degrees % 360)) / arcSize);
    document.getElementById('result').innerText = "Kết quả: " + currentNames[index];
}

function spin() {
    const namesInput = document.getElementById('names').value;
    if (namesInput.trim() === "") {
        alert("Vui lòng nhập tên!");
        return;
    }
    currentNames = namesInput.split(',');
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
}

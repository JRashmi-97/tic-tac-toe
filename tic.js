let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-game");
let msg = document.querySelector(".msg-container");
let para = document.querySelector("#msg");

let playerOName = prompt("Enter the name of Plater X", "playerX");
let playerXName = prompt("Enter the name of Plater O", "playerO");

let turnO = true; // playerX, playerO
const winArrPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msg.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overriding a marked box
        if (turnO) {
            box.innerText = "O"; // Mark the clicked box as O
            box.style.color = "#FFEB3B"; // Set color for O (blue)
            turnO = false;
        } else {
            box.innerText = "X"; // Marked as X
            box.style.color = "black"; // Set color for X (red)
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = ""; // Reset color when the box is empty
    }
};

const showWinner = (winner) => {
    let winnerName = winner === "X" ? playerXName : playerOName;
    para.innerText = `Congratulations, Winner is  ${winnerName} player ${winner}` ;
  
    msg.classList.remove("hide");
    disabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winArrPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }

    // Check for draw if all boxes are filled
    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }

    if (isDraw) {
        para.innerText = "It's a draw!";
        msg.classList.remove("hide");
        disabledBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

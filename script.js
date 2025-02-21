function generateMatrix() {
    const size = document.getElementById("size").value;
    const container = document.getElementById("matrix-container");
    container.innerHTML = "";

    for (let k = 1; k <= 2; k++) {
        let matrixDiv = document.createElement("div");
        matrixDiv.classList.add("matrix");
        matrixDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let input = document.createElement("input");
                input.type = "number";
                input.classList.add(`matrix${k}`);
                input.dataset.row = i;
                input.dataset.col = j;
                matrixDiv.appendChild(input);
            }
        }
        container.appendChild(matrixDiv);
    }
}

function getMatrix(className) {
    const size = document.getElementById("size").value;
    let matrix = Array.from({ length: size }, () => Array(size).fill(0));

    document.querySelectorAll(`.${className}`).forEach((el) => {
        let row = el.dataset.row, col = el.dataset.col;
        matrix[row][col] = Number(el.value);
    });

    return matrix;
}

function performOperation(operation) {
    const size = document.getElementById("size").value;
    let matrix1 = getMatrix("matrix1");
    let matrix2 = getMatrix("matrix2");
    let resultMatrix = [];

    try {
        switch (operation) {
            case 'add':
                resultMatrix = math.add(matrix1, matrix2);
                break;
            case 'subtract':
                resultMatrix = math.subtract(matrix1, matrix2);
                break;
            case 'multiply':
                resultMatrix = math.multiply(matrix1, matrix2);
                break;
            case 'scalar':
                let scalar = prompt("Enter scalar value:");
                resultMatrix = matrix1.map(row => row.map(val => val * Number(scalar)));
                break;
            case 'transpose':
                resultMatrix = math.transpose(matrix1);
                break;
            case 'determinant':
                resultMatrix = [[math.det(matrix1).toFixed(2)]];
                break;
            case 'inverse':
                resultMatrix = math.inv(matrix1).map(row => row.map(val => val.toFixed(2)));
                break;
            default:
                alert("Invalid operation!");
                return;
        }
        displayResult(resultMatrix);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

function displayResult(matrix) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = matrix.map(row => row.join(" ")).join("<br>");
}

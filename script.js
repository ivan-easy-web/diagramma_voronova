// Привязка элементов из html

const container = document.getElementById("inputContainer")
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")


// Инициализация переменных 

let stationPoints = []
let inputCounter = 1


// Создаем новый блок ввода

let createInput = (n) => {
    let input = document.createElement("div")
    input.className = "input"

    let labelX = document.createElement("label").appendChild(document.createTextNode("Точка " + n + ". X: "))

    let inputX = document.createElement("input")
    inputX.className = "x_input"
    inputX.setAttribute('value', Math.floor(Math.random() * 500))

    let labelY = document.createElement("label").appendChild(document.createTextNode("Y: "))

    let inputY = document.createElement("input")
    inputY.className = "y_input"
    inputY.setAttribute('value', Math.floor(Math.random() * 500))

    input.appendChild(labelX)
    input.appendChild(inputX)
    input.appendChild(labelY)
    input.appendChild(inputY)

    return input
}


// Считываем координаты точек из инпутов

let getStationPoints = () => {
    let stationPoints = []

    let inputs = document.getElementsByClassName("input")
    for (let input of inputs) {
        let x = Number(input.getElementsByClassName('x_input')[0].value)
        if ((x < 0) || (x > 500)) {
            alert("Координаты точек должны быть в пределах от 0 до 500")
            return
        }

        let y = Number(input.getElementsByClassName('y_input')[0].value)
        if ((y < 0) || (y > 500)) {
            alert("Координаты точек должны быть в пределах от 0 до 500")
            return
        }

        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        stationPoints.push({x: x, y: y, color: color})
    }

    let radiusInput = document.getElementById("radiusInput")
    let maxRadius = Number(radiusInput.value)

    if ((maxRadius < 50)) {
        alert("Радиус действия станции должен быть не меньше 50")
        return
    }

    stationPoints.maxRadius = maxRadius

    return stationPoints
}


// Обработка нажатия на кнопку Добавить

const addButton = document.getElementById("addButton")

addButton.addEventListener('click', () => {
    inputCounter++
    let newInput = createInput(inputCounter)
    container.appendChild(newInput)
})


// Обработка нажатия на кнопку Обновить 

const drawButton = document.getElementById("drawButton")

drawButton.addEventListener('click', () => {
    stationPoints = getStationPoints()
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawDiagram()
    drawStations()
    console.log(stationPoints)
})



// Функции для отрисовки


// Рисуем точку в канвас

let drawPoint = (x, y, r = 1, color = "black") => {
    context.fillStyle = color
    context.fillRect(x,y,r,r)
} 


// Считаем рассточние от точки до точки

let getDistance = (point1, point2) => {
    let x = point1.x - point2.x
    let y = point1.y - point2.y

    return Math.sqrt(x * x + y * y)
}


// Ищем ближайшую станцию к точке

let findClosestPoint = (point) => {
    let closestPoint = {x: 0, y: 0, color: "black"}
    let minDistance = 100000

    stationPoints.forEach((stationPoint) => {
        let distance = getDistance(point, stationPoint)
        if (distance < minDistance) {
            closestPoint = stationPoint
            minDistance = distance
        }
    })

    if (minDistance > stationPoints.maxRadius) {
        closestPoint = {x: 0, y: 0, color: "white"}
    }

    return closestPoint
}


//Рисуем области

let drawDiagram = () => {
    for (let ypos = 1; ypos < 500; ypos++) {
        for (let xpos = 1; xpos < 500; xpos++) {
            let point = {x: xpos, y: ypos}
            let closestPoint = findClosestPoint(point)
    
            drawPoint(point.x, point.y, 1, closestPoint.color)
        }
    }
}


// Рисуем станции

let drawStations = () => {
    stationPoints.forEach((point) => {
        drawPoint(point.x, point.y, 5)
    })
}


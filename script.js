let stationPoints = [
    {x: 100, y: 200, color: "red"}, 
    {x: 200, y: 100, color: "blue"}, 
    {x: 300, y: 100, color: "white"}, 
    {x: 100, y: 400, color: "green"}, 
    {x: 400, y: 200, color: "yellow"}
] 

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const maxRadius = 100

let drawPoint = (x, y, r = 1, color = "black") => {
    context.fillStyle = color
    context.fillRect(x,y,r,r)
} 

let getDistance = (point1, point2) => {
    let x = point1.x - point2.x
    let y = point1.y - point2.y

    return Math.sqrt(x * x + y * y)
}

let findClosestPoint = (point) => {
    let closestPoint = {x: 0, y: 0, color: "black"}
    let minDistance = 1000

    stationPoints.forEach((stationPoint) => {
        let distance = getDistance(point, stationPoint)
        if (distance < minDistance) {
            closestPoint = stationPoint
            minDistance = distance
        }
    })

    if (minDistance > maxRadius) {
        closestPoint = {x: 0, y: 0, color: "black"}
    }

    return closestPoint
}

for (let ypos = 1; ypos < 500; ypos++) {
    for (let xpos = 1; xpos < 500; xpos++) {
        let point = {x: xpos, y: ypos}
        let closestPoint = findClosestPoint(point)

        drawPoint(point.x, point.y, 1, closestPoint.color)
    }
}

stationPoints.forEach((point) => {
    drawPoint(point.x, point.y, 5)
})

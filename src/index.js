import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';

const width = 8;
const candyColors = [
    'blue',
    'green',
    'orange',
    'yellow',
    'purple',
    'red'
]

const App = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
    const [squareBeingDragged, setSquareBeingDragged] = useState(null);
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);

    //check for column and row of FOUR
    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
                columnOfFour.forEach(square => currentColorArrangement[square] = '')
            }
        }
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

            if (notValid.includes(i)) continue

            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
                rowOfFour.forEach(square => currentColorArrangement[square] = '')
            }
        }
    }

    //check for column and row of THREE
    const checkForColumnOfThree = () => {
        for (let i = 0; i < 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
                columnOfThree.forEach(square => currentColorArrangement[square] = '')
            }
        }
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

            if (notValid.includes(i)) continue

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
                rowOfThree.forEach(square => currentColorArrangement[square] = '')
            }
        }
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArrangement[i] === '') {
                let randomNumber = Math.floor(Math.random() * candyColors.length)
                currentColorArrangement[i] = candyColors[randomNumber]
            }

            if ((currentColorArrangement[i + width]) === '') {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = ''
            }
        }
    }

    //Start to drag candies
    const dragStart = (ev) => {
        console.log(ev.target)
        console.log('drag start')
        setSquareBeingDragged(ev.target)
    }

    const dragDrop = (ev) => {
        console.log(ev.target)
        console.log('drag drop')
        setSquareBeingReplaced(ev.target)
    }

    const dragEnd = (ev) => {
        console.log('drag end')

        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor

        console.log('squareBeingDraggedId', squareBeingDraggedId);
        console.log('squareBeingReplacedId', squareBeingReplacedId);


    }


    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangement(randomColorArrangement)
    }
    useEffect(() => {
        createBoard();

    }, [])

    useEffect(() => {
        const time = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(time)

    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

    //console.log(currentColorArrangement);

    return (
        <div className="app">
            <div className="game">
                {currentColorArrangement.map((candyColor, index) => (
                    <img
                        key={index}
                        style={{ backgroundColor: candyColor }}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(ev) => ev.preventDefault()}
                        onDragEnter={(ev) => ev.preventDefault()}
                        onDragLeave={(ev) => ev.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                ))}

            </div>
        </div>
    )
};




const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);

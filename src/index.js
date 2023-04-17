import ReactDOM from "react-dom/client";
import React, { useState } from 'react';
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
    const [currentColorArrangement, setCurrentColorArrangement] = useState([])




    const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        console.log(randomColorArrangement)
    }
    createBoard();




};




const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <HashRouter>
        <App />
    </HashRouter>
);

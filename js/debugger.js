"use strict"

const Debugger = {
    showStates() {
        console.table(board.map(row => row.map((cell => cell.state))));
    },
    showIds() {
        console.table(board.map(row => row.map((cell => cell.id))));
    }
}
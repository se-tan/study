"use strict";
class Game {
    constructor() {
        this.pieces = Game.makePieces();
    }
    static makePieces() {
        return {};
    }
}
class Piece {
    constructor(color, file, rank) {
        this.color = color;
        this.position = new Position(file, rank);
    }
    moveTo(position) {
        this.position = position;
    }
}
class Position {
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
    }
    distanceForm(position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
        };
    }
}
class King extends Piece {
    canMoveTo(position) {
        let distance = this.position.distanceForm(position);
        return distance.rank < 2 && distance.file < 2;
    }
}
class Sets {
    has(value) {
        return true;
    }
    add(value) {
        return this;
    }
}
class MutableSets extends Sets {
    delete(value) {
        return false;
    }
}

/* 駒の色 */
type Color = 'Black' | 'White';

/* チェス盤の横軸 */
type File_ = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

/* チェス盤の縦軸 */
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/* チェスのゲーム */
class Game {
  private pieces = Game.makePieces();
  private static makePieces() {
    return {};
  }
}

/* 駒 */
abstract class Piece {
  protected position: Position;
  constructor(private readonly color: Color, file: File_, rank: Rank) {
    this.position = new Position(file, rank);
  }
  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}

/* 駒の位置(座標) */
class Position {
  constructor(private file: File_, private rank: Rank) {}
  distanceForm(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
    };
  }
}

class King extends Piece {
  canMoveTo(position: Position) {
    let distance = this.position.distanceForm(position);
    return distance.rank < 2 && distance.file < 2;
  }
}
// class Queen extends Piece {}
// class Bishop extends Piece {}
// class Knight extends Piece {}
// class Rook extends Piece {}
// class Pawn extends Piece {}

/* Type this */
class Sets {
  has(value: number): boolean {
    return true;
  }
  add(value: number): this {
    return this;
  }
}

class MutableSets extends Sets {
  delete(value: number): boolean {
    return false;
  }
}

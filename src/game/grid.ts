import Cell from './cell';
import Color from './colors';

type SpecialCallbackFunc = (c: Cell) => {};

export default class Grid {
  public cells: Cell[][] = [];

  private gridSize: number = 0;

  constructor(layout: number[][]) {
    this.gridSize = layout[0].length;
    for (let x = 0; x < this.gridSize; x += 1) {
      this.cells[x] = [];
    }

    let first = true;
    for (let y = 0; y < this.gridSize; y += 1) {
      for (let x = 0; x < this.gridSize; x += 1) {
        if (layout[y][x] === 1) {
          this.cells[x][y] = new Cell(x, y);
          if (first) {
            this.cells[x][y].color = Color.Any;
            this.cells[x][y].owned = true;
          } else {
            this.cells[x][y].randomizeColor();
          }
          first = false;
        }
      }
    }

    if (this.gridSize > 0) {
      this.placeSpecial((c) => c.lock = true);
      this.placeSpecial((c) => c.key = true);
      this.placeSpecial((c) => c.randomize = true);
    }
  }

  public get cellList(): Cell[] {
    return (([] as Cell[]).concat(...this.cells))
      .filter((cell) => cell !== undefined);
  }

  public getCell(x: number, y: number): Cell | undefined {
    return (y >= 0 && y < this.gridSize && x >= 0 && x < this.gridSize) ? this.cells[x][y] : undefined;
  }

  public neighbors(x: number, y: number): Cell[] {
    return [
      this.getCell(x, y - 1),
      this.getCell(x - 1, y),
      this.getCell(x + 1, y),
      this.getCell(x, y + 1),
    ].filter((c) => c != null) as Cell[];
  }

  public get owned(): Cell[] {
    return this.cellList.filter(
      (c: Cell) => c.owned,
    );
  }

  public getByColor(color: Color): Cell[] {
    return this.cellList.filter(
      (c: Cell) => c.color === color,
    );
  }

  public getByColorUnOwned(color: Color): Cell[] {
    return this.cellList.filter(
      (c: Cell) => c.color === color && !c.owned,
    );
  }

  public getByOtherColor(color: Color): Cell[] {
    return this.cellList.filter(
      (c: Cell) => c.color !== color,
    );
  }

  public colorize(color: Color): Cell[] {
    const filled: Cell[] = [];
    this.owned
      .forEach((cell) => {
        cell.color = color;
        this.neighbors(cell.x, cell.y)
          .forEach((neighbor) => {
            if (neighbor.color === color && neighbor.lock === false && neighbor.owned === false) {
              neighbor.owned = true;
              filled.push(neighbor);
            }
          });
      });
    return filled;
  }

  public randomize() {
    this.cellList
      .forEach((c) => {
        c.randomize = false;
        if (!c.owned) {
          c.randomizeColor();
        }
      });
  }

  public unlock() {
    this.cellList
      .forEach((c) => {
        c.lock = false;
        c.key = false;
      });
  }

  private get nonSpecialCells(): Cell[] {
    return this.cellList.filter(
      (c: Cell) => !c.owned && c.color !== Color.Any && !c.isSpecial,
    );
  }

  private placeSpecial(callback: SpecialCallbackFunc) {
    const nonSpecials = this.nonSpecialCells;
    callback(nonSpecials[Math.floor(Math.random() * nonSpecials.length)]);
  }
}

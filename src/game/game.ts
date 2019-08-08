import Grid from './grid';
import Cell from './cell';
import Color from './colors';
import {
  hasKey,
  hasRandomize,
} from './cell-list';

export default class Game {
  public grid: Grid = new Grid([[]]);
  public turn: number = 0;

  constructor(layout: number[][]) {
    this.grid = new Grid(layout);
  }

  public placeColor(color: Color) {
    let cells: Cell[] = [];
    do {
      cells = this.grid.colorize(color);
      if (hasKey(cells)) {
        this.grid.unlock();
      }
      if (hasRandomize(cells)) {
        this.grid.randomize();
      }
    } while (cells.length > 0);
    this.turn += 1;
  }
}

import Grid from './grid';
import Cell from './cell';
import Color, { Colors } from './colors';
import {
  hasKey,
  hasRandomize,
} from './cell-list';

export enum GameState {
  Playing,
  Won,
  Lost,
}

export default class Game {
  public grid: Grid = new Grid([[]]);
  public turnsLeft: number = 25;
  public state: GameState = GameState.Playing;
  public targetColor: Color = Color.Any;

  constructor(layout: number[][]) {
    this.grid = new Grid(layout);
    this.targetColor = Colors[Math.floor(Math.random() * Colors.length)];
  }

  public placeColor(color: Color) {
    let cells: Cell[] = [];
    let iterations = 0;

    do {
      cells = this.grid.colorize(color);
      if (hasKey(cells)) {
        this.grid.unlock();
      }
      if (hasRandomize(cells)) {
        this.grid.randomize();
      }
      iterations += 1;
    } while (cells.length > 0 && iterations < 100);

    this.turnsLeft--;

    if (this.hasLost) {
      this.state = GameState.Lost;
    } else if (this.hasWon) {
      this.state = GameState.Won;
    } else if (this.turnsLeft <= 0) {
      this.state = GameState.Lost;
    }
  }

  private get hasWon(): boolean {
    return this.grid.getByOtherColor(this.targetColor).length === 0;
  }

  private get hasLost(): boolean {
    return (
      this.grid.getByOtherColor(this.targetColor).length > 0 &&
      this.grid.getByColorUnOwned(this.targetColor).length === 0
    );
  }
}

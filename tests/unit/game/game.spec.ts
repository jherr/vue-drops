import Color from '@/game/colors';
import Grid from '@/game/grid';
import Game from '@/game/game';

const colorMap: any = {
  A: Color.Any,
  B: Color.Blue,
  G: Color.Green,
  b: Color.LightBlue,
  R: Color.Red,
  Y: Color.Yellow,
  P: Color.Pink,
};

export const createGrid = (template: string): {
  grid: Grid,
  layout: number[][],
} => {
  // Parse out the template
  const layout: number[][] = [];
  const colors: Color[][] = [];
  template.split(/\n/).forEach((line, y) => {
    layout.push([]);
    colors.push([]);
    line.split('').forEach((char) => {
      if (char !== '-') {
        layout[y].push(1);
        colors[y].push(colorMap[char]);
      } else {
        layout[y].push(0);
        colors[y].push(Color.None);
      }
    });
  });

  // Create the grid, recolor and remove specials
  const grid = new Grid(layout);
  grid.unlock();
  colors.forEach((row, y) => {
    row.forEach((color, x) => {
      const cell = grid.getCell(x, y);
      if (color !== Color.None) {
        cell!.color = color;
        cell!.randomize = false;
      }
    });
  });

  return {
    grid,
    layout,
  };
};

describe('Game', () => {
  it('should initiatize', () => {
    const { grid, layout } = createGrid(
`ABB
BBB
BB-`);
    const game = new Game(layout);
    game.grid = grid;
    game.placeColor(Color.Red);
    expect(grid.getByColor(Color.Red).length).toBe(1);
  });

  it('should handle locks', () => {
    const { grid, layout } = createGrid(
`ABB
BBR
BB-`);
    const game = new Game(layout);
    game.grid = grid;
    grid.getCell(1, 0)!.lock = true;
    grid.getCell(1, 1)!.key = true;
    game.placeColor(Color.Blue);
    expect(grid.getByColor(Color.Blue).length).toBe(7);
  });

  it('should handle randomize', () => {
    const { grid, layout } = createGrid(
`ABB
BBR
BB-`);
    const game = new Game(layout);
    game.grid = grid;
    grid.getCell(1, 0)!.randomize = true;
    game.placeColor(Color.Blue);
    expect(grid.getByColor(Color.Blue).length).not.toBe(7);
  });
});

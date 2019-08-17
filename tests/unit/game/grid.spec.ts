import Color from '@/game/colors';
import Grid from '@/game/grid';

const colorMap: any = {
  B: Color.Blue,
  G: Color.Green,
  b: Color.LightBlue,
  R: Color.Red,
  Y: Color.Yellow,
  P: Color.Pink,
};

export const createGrid = (template: string): Grid => {
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
  const g = new Grid(layout);
  g.unlock();
  colors.forEach((row, y) => {
    row.forEach((color, x) => {
      const cell = g.getCell(x, y);
      if (color !== Color.None) {
        cell!.color = color;
        cell!.randomize = false;
      }
    });
  });
  return g;
};

export const matchesOwned = (grid: Grid, owned: string): boolean => {
  let match = true;
  owned.split(/\n/).forEach((line, y) => {
      line.split('').forEach((char, x) => {
        const cell = grid.getCell(x, y);
        if (char === '*') {
          if (cell!.owned === false) {
            match = false;
          }
        } else if (char === '-') {
          if (cell!.owned) {
            match = false;
          }
        }
      });
  });
  return match;
};

describe('Grid', () => {
  it('should initiatize', () => {
    const g = createGrid(
`BBB
BBR
BB-`);
    expect(g.owned.length).toBe(1);
    expect(g.getByColor(Color.Red).length).toBe(1);
    expect(g.getByOtherColor(Color.Red).length).toBe(7);
    expect(matchesOwned(g,
`*--
---
-- `)).toBe(true);
    expect(matchesOwned(g,
`-*-
**-
-- `)).toBe(false);
  });

  it('should colorize', () => {
    const g = createGrid(
`BBB
BBB
BBR`);

    g.colorize(Color.Blue);
    expect(matchesOwned(g,
`**-
*--
---`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesOwned(g,
`***
**-
*--`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesOwned(g,
`***
***
**-`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesOwned(g,
`***
***
**-`)).toBe(true);
  });

  it('should colorize around a pattern', () => {
    const g = createGrid(
`BBB
--B
BBR`);

    g.colorize(Color.Blue);
    expect(matchesOwned(g,
`**-
  -
---`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesOwned(g,
`***
  -
---`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesOwned(g,
`***
  *
---`)).toBe(true);
  });

  it('should randomize', () => {
    const g = createGrid(
`BBB
BBB
BBB`);
    g.randomize();
    expect(g.getByColor(Color.Blue).length).not.toBe(9);
  });
});

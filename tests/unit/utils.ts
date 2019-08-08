import Grid from '@/game/grid';
import Color from '@/game/colors';

const colorMap: any = {
  'B': Color.Blue,
  'G': Color.Green,
  'b': Color.LightBlue,
  'R': Color.Red,
  'Y': Color.Yellow,
  'P': Color.Pink,
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
      if (color !== Color.None && cell) {
        cell.color = color;
        cell.randomize = false;
      }
    });
  })
  return g;
}

export const matchesUsed = (grid: Grid, used: string): boolean => {
  let match = true;
  used.split(/\n/).forEach((line, y) => {
      line.split('').forEach((char, x) => {
        const cell = grid.getCell(x, y);
        if (cell) {
          if (char === '*') {
            if (cell.used === false) {
              match = false;
            }
          } else if (char === '-') {
            if (cell.used) {
              match = false;
            }
          }
        }
      });
  });
  return match;
}

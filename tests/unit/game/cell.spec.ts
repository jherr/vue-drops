import Cell from '@/game/cell';
import Color from '@/game/colors';

describe('cell', () => {
  it('should pick a random color', () => {
    const cell = new Cell(0, 0);
    cell.randomizeColor();
    expect(cell.color).not.toBe(Color.Any);
  });

  it('should tell if a cell is special', () => {
    const cell = new Cell(0, 0);
    expect(cell.isSpecial).not.toBe(true);
    cell.lock = true;
    expect(cell.isSpecial).toBe(true);
  });
});

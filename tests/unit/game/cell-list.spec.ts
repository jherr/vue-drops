import Cell from '@/game/cell';
import {
  hasLock,
  hasKey,
  hasRandomize,
} from '@/game/cell-list';

describe('CellList', () => {
  it('finds lock', () => {
    const lock = new Cell(1, 1);
    lock.lock = true;
    const cl = [
      lock,
      new Cell(0, 0),
      new Cell(1, 0),
    ];
    expect(hasLock(cl)).toBe(true);
    expect(hasKey(cl)).toBe(false);
    expect(hasRandomize(cl)).toBe(false);
    expect(hasLock([
      new Cell(0, 0),
      new Cell(1, 0),
    ])).toBe(false);
  });

  it('finds key', () => {
    const key = new Cell(1, 1);
    key.key = true;
    const cl = [
      key,
      new Cell(0, 0),
      new Cell(1, 0),
    ];
    expect(hasLock(cl)).toBe(false);
    expect(hasKey(cl)).toBe(true);
    expect(hasRandomize(cl)).toBe(false);
    expect(hasKey([
      new Cell(0, 0),
      new Cell(1, 0),
    ])).toBe(false);
  });

  it('finds randomize', () => {
    const randomize = new Cell(1, 1);
    randomize.randomize = true;
    const cl = [
      randomize,
      new Cell(0, 0),
      new Cell(1, 0),
    ];
    expect(hasLock(cl)).toBe(false);
    expect(hasKey(cl)).toBe(false);
    expect(hasRandomize(cl)).toBe(true);
    expect(hasRandomize([
      new Cell(0, 0),
      new Cell(1, 0),
    ])).toBe(false);
  });
});

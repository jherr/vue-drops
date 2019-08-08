import Cell from './cell';

export const hasLock = (cells: Cell[]) =>
  cells.filter((c) => c.lock === true).length > 0;
export const hasKey = (cells: Cell[]) =>
  cells.filter((c) => c.key === true).length > 0;
export const hasRandomize = (cells: Cell[]) =>
  cells.filter((c) => c.randomize === true).length > 0;

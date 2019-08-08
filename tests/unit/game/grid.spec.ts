import Color from '@/game/colors';
import { createGrid, matchesUsed } from '../utils';

describe('Grid', () => {
  it('should initiatize', () => {
    const g = createGrid(
`BBB
BBR
BB-`
    );
    expect(g.used.length).toBe(1);
    expect(g.getByColor(Color.Red).length).toBe(1);
    expect(g.getByOtherColor(Color.Red).length).toBe(7);
    expect(matchesUsed(g,
`*--
---
-- `)).toBe(true);
    expect(matchesUsed(g, 
`-*-
**-
-- `)).toBe(false);
  });

  it('should colorize', () => {
    const g = createGrid(
`BBB
BBB
BBR`
    );

    g.colorize(Color.Blue);
    expect(matchesUsed(g, 
`**-
*--
---`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesUsed(g, 
`***
**-
*--`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesUsed(g, 
`***
***
**-`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesUsed(g, 
`***
***
**-`)).toBe(true);
  });

  it('should colorize around a pattern', () => {
    const g = createGrid(
`BBB
--B
BBR`
    );

    g.colorize(Color.Blue);
    expect(matchesUsed(g, 
`**-
  -
---`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesUsed(g, 
`***
  -
---`)).toBe(true);

    g.colorize(Color.Blue);
    expect(matchesUsed(g, 
`***
  *
---`)).toBe(true);
  });

  it('should randomize', () => {
    const g = createGrid(
`BBB
BBB
BBB`
    );
    g.randomize();
    expect(g.getByColor(Color.Blue).length).not.toBe(9);
  });
});

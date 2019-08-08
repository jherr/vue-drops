import Color from './colors';

export default class Cell {
  public color: Color = Color.None;
  public used: boolean = false;
  public key: boolean = false;
  public lock: boolean = false;
  public randomize: boolean = false;

  constructor(
    public x: number,
    public y: number,
  ) {
  }

  public randomizeColor() {
    const options = [
      Color.Blue,
      Color.Green,
      Color.LightBlue,
      Color.Pink,
      Color.Red,
      Color.Yellow,
    ];
    this.color = options[Math.ceil(Math.random() * options.length)];
  }

  public get isSpecial(): boolean {
    return this.key || this.lock || this.randomize;
  }
}

import { colord, Colord } from "colord";
import { ColorAllocator } from "../src/core/configuration/ColorAllocator";
import {
  blue,
  red,
  teal,
  purple,
  yellow,
  orange,
  green,
  botColor
} from "../src/core/configuration/Colors";

describe("ColorAllocator - uniqueness across many players", () => {

  const baseColors: Colord[] = [
    colord(blue),
    colord(red),
    colord(teal),
    colord(purple),
    colord(yellow),
    colord(orange),
    colord(green),
    colord(botColor),
  ];
  const fallbackColors: Colord[] = [
    colord({ r: 255, g: 255, b: 255 }),
    colord({ r: 0, g: 0, b: 0 }),
    colord({ r: 128, g: 128, b: 128 }),
  ];
  const allocator = new ColorAllocator(baseColors, fallbackColors);

  test("every player gets a unique color (even with more players than base colors)", () => {
    const numPlayers = baseColors.length + fallbackColors.length + 10; // go beyond available colors
    const assignedColors = new Set<string>();

    for (let i = 0; i < numPlayers; i++) {
      const color = allocator.assignColor(`player_${i}`);
      assignedColors.add(color.toHex());
    }

    expect(assignedColors.size).toBe(numPlayers);
  });
});

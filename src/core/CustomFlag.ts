import { COSMETICS } from "./CosmeticSchemas";

const ANIMATION_DURATIONS: Record<string, number> = {
  rainbow: 4000,
  "bright-rainbow": 4000,
  "copper-glow": 3000,
  "silver-glow": 3000,
  "gold-glow": 3000,
  neon: 3000,
  lava: 6000,
  water: 6200,
};

export function renderPlayerFlag(flag: string, target: HTMLElement) {
  if (!flag.startsWith("!")) return;

  const code = flag.slice("!".length);
  const layers = code.split("_").map((segment) => {
    const [layerKey, colorKey] = segment.split("-");
    return { layerKey, colorKey };
  });

  target.innerHTML = "";
  target.style.overflow = "hidden";
  target.style.position = "relative";
  target.style.aspectRatio = "3/4";

  for (const { layerKey, colorKey } of layers) {
    const layerName = COSMETICS.flag.layers[layerKey]?.name ?? layerKey;

    const mask = `/flags/custom/${layerName}.svg`;
    if (!mask) continue;

    const layer = document.createElement("div");
    layer.style.position = "absolute";
    layer.style.top = "0";
    layer.style.left = "0";
    layer.style.width = "100%";
    layer.style.height = "100%";

    const colorValue = COSMETICS.flag.color[colorKey]?.color ?? colorKey;
    const isSpecial =
      !colorValue.startsWith("#") &&
      !/^([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(colorValue);

    if (isSpecial) {
      const duration = ANIMATION_DURATIONS[colorValue] ?? 5000;
      const now = performance.now();
      const offset = now % duration;
      if (!duration) console.warn(`No animation duration for: ${colorValue}`);
      layer.classList.add(`flag-color-${colorValue}`);
      layer.style.animationDelay = `-${offset}ms`;
    } else {
      layer.style.backgroundColor = colorValue;
    }

    layer.style.maskImage = `url(${mask})`;
    layer.style.maskRepeat = "no-repeat";
    layer.style.maskPosition = "center";
    layer.style.maskSize = "contain";

    layer.style.webkitMaskImage = `url(${mask})`;
    layer.style.webkitMaskRepeat = "no-repeat";
    layer.style.webkitMaskPosition = "center";
    layer.style.webkitMaskSize = "contain";

    target.appendChild(layer);
  }
}

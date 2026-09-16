export interface SneakerCustomizationState {
  modelId: string;
  modelName: string;
  presetName?: string;
  exportedAt: string;
  colorways: {
    baseMesh: string;
    laces: string;
    sole: string;
    accents: string;
    innerLining: string;
    tongue: string;
  };
  materials: {
    roughness: number;
    metalness: number;
    texturePreset: 'matte' | 'leather' | 'suede' | 'glossy';
  };
}

/**
 * Serializes and triggers a direct browser download of the active 3D customization recipe.
 */
export function downloadSneakerConfigJSON(
  state: SneakerCustomizationState,
  filename?: string
): void {
  const jsonPayload = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonPayload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename || `kixtra-custom-design-${Date.now()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/**
 * Captures a high-resolution snapshot from the WebGL canvas element.
 */
export function downloadCanvasRenderSnapshot(
  canvas: HTMLCanvasElement,
  filename?: string
): void {
  const dataURL = canvas.toDataURL('image/png');
  const anchor = document.createElement('a');
  anchor.href = dataURL;
  anchor.download = filename || `kixtra-render-${Date.now()}.png`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

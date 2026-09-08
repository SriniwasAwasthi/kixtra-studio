import test from 'node:test';
import assert from 'node:assert/strict';

// 3D Sneaker Customizer material & configuration tests
const DEFAULT_SNEAKER_CONFIG = {
  parts: {
    sole: { color: '#ffffff', material: 'rubber' },
    upper: { color: '#1a1a1a', material: 'leather' },
    laces: { color: '#ff3366', material: 'cotton' },
    swoosh: { color: '#00f2fe', material: 'metallic' }
  },
  basePrice: 120
};

function calculateCustomizerPrice(config, premiumMaterials = ['leather', 'metallic']) {
  let surcharge = 0;
  for (const part of Object.values(config.parts)) {
    if (premiumMaterials.includes(part.material)) {
      surcharge += 15;
    }
  }
  return config.basePrice + surcharge;
}

test('Sneaker Customizer: initializes with all essential parts', () => {
  const parts = Object.keys(DEFAULT_SNEAKER_CONFIG.parts);
  assert.ok(parts.includes('sole'));
  assert.ok(parts.includes('upper'));
  assert.ok(parts.includes('laces'));
  assert.equal(parts.length, 4);
});

test('Sneaker Customizer: calculates premium material surcharges', () => {
  // 2 premium materials (leather, metallic) = +$30
  const totalPrice = calculateCustomizerPrice(DEFAULT_SNEAKER_CONFIG);
  assert.equal(totalPrice, 150);
});

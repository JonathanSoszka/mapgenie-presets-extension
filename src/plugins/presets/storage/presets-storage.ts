import { storage } from "../../../common/storage/storage";
import { Preset, PresetsStore } from "../store/presets-store";


export function loadPresets() {
  return storage.load<Record<string, Preset>>("presets") || {};
}

export function persistState(state: PresetsStore) {
  const { activePreset, presets } = state;
  storage.save("presets", presets);

  if (activePreset) {
    storage.save("active-preset", activePreset);
  } else {
    storage.remove("active-preset");
  }
}

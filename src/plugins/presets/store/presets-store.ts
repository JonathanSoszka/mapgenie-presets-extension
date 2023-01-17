import { create } from "zustand";
import { MapGenieToolsError } from "../../../common/errors/map-genie-tools-error";

import { activatePresetSelections } from "../map-genie/map-genie";
import { loadPresets, persistState } from "../storage/presets-storage";

export type Preset = {
  name: string;
  selections: PresetSelections;
};

export type PresetSelections = {
  name: string;
  clickableElementId: string;
}[];

export type PresetsStore = {
  presets: Record<string, Preset>;
  activePreset?: Preset;
  setPresets: (presets: Record<string, Preset>) => void;
  setActivePreset: (preset: Preset | undefined) => void;
  addPreset: (preset: Preset) => void;
  updatePreset: (Preset: Preset, newSelections: PresetSelections) => void;
  deletePreset: (preset: Preset) => void;
};

export const usePresetsStore = create<PresetsStore>()((set, get) => ({
  presets: loadPresets(),
  activePreset: undefined,

  // Mutators
  setPresets(updatedPresets: Record<string, Preset>) {
    set({ presets: updatedPresets });
    persistState(get());
  },

  setActivePreset: (preset: Preset | undefined) => {
    set({ activePreset: preset });
    persistState(get());
    if (preset) {
      activatePresetSelections(preset);
    }
  },

  // Actions
  addPreset: (preset: Preset) => {
    console.log("ADDING PRESET");
    const { presets, setActivePreset, setPresets } = get();

    if (presets[preset.name]) {
      throw new MapGenieToolsError(
        "A Preset with that name already exists",
        true
      );
    }

    setPresets({ ...presets, [preset.name]: preset });
    setActivePreset(preset);
  },

  updatePreset(preset: Preset, newSelections: PresetSelections) {
    const { presets, setPresets } = get();

    setPresets({
      ...presets,
      [preset.name]: { name: preset.name, selections: newSelections },
    });
  },

  deletePreset: (preset: Preset) => {
    const { presets, activePreset, setPresets, setActivePreset } = get();

    delete presets[preset.name];

    setPresets(presets);

    if (preset == activePreset) {
      setActivePreset(undefined);
    }
  },
}));

import { storage } from "../../../core/storage/storage";
import {
  getActiveSelections,
  activatePresetSelections,
} from "../utility/map-genie";
import { Presets, Preset } from "../types";
import { useState } from "react";
import { recordValues } from "../../../core/utility/record";

function getUserPresets() {
  return storage.load<Presets>("presets") || {};
}

function updateUserPresets(presets: Presets) {
  storage.save("presets", presets);
}

export function PresetsManager() {
  const [presetName, setPresetName] = useState<string>("");
  const [presets, setPresets] = useState<Presets>(getUserPresets());
  const [activePreset, setActivePreset] = useState<Preset | undefined>(
    storage.load("active-preset")
  );

  function savePreset(name = "default") {
    const newPreset = { name, selections: getActiveSelections() };
    const updatedPresets = {
      ...presets,
      [presetName]: newPreset,
    };
    setPresets(updatedPresets);
    updateUserPresets(updatedPresets);
    setActivePreset(newPreset)
  }

  function updateActivePreset(preset: Preset | undefined) {
    setActivePreset(preset);
    storage.save("active-preset", preset);
    setPresetName(preset?.name || "");

    if (preset) {
      storage.save("active-preset", preset);
      activatePresetSelections(preset);
    }
    else{
      storage.remove("active-preset")
    }
  }

  function deleteActivePreset() {
    if (!activePreset) {
      return;
    }
    const updatedPresets = { ...presets };
    delete updatedPresets[activePreset.name];
    setPresets(updatedPresets);
    updateUserPresets(updatedPresets);
    updateActivePreset(undefined);
  }

  return (
    <div>
      <div>Presets</div>
      <div>
        <input
          type="text"
          placeholder="Preset Name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
        />
        <button onClick={() => savePreset(presetName)}>Save Selections</button>
      </div>
      <div>
        <div>Saved Presets:</div>
        <div>
          {recordValues(presets).map((preset) => (
            <button
              onClick={() => updateActivePreset(preset)}
              style={{
                color: preset.name === activePreset?.name ? "green" : "black",
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            deleteActivePreset();
          }}
        >
          Delete Selected Preset
        </button>
      </div>
    </div>
  );
}

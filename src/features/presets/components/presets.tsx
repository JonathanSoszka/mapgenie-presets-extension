import { getActiveSelections } from "../map-genie/map-genie";
import { useState } from "react";
import { usePresetsStore } from "../store/presets-store";
import { recordValues } from "../../common/utility/record";

export function PresetsManager() {
  const [presetName, setPresetName] = useState<string>("");
  const {
    activePreset,
    presets,
    setActivePreset,
    addPreset,
    updatePreset,
    deletePreset,
  } = usePresetsStore();

  function savePreset(name = "default") {
    const newPreset = { name, selections: getActiveSelections() };
    addPreset(newPreset);
  }

  function updateActivePresetSelections() {
    if (!activePreset) {
      return;
    }
    updatePreset(activePreset, getActiveSelections());
  }

  function deleteActivePreset() {
    if (!activePreset) {
      return;
    }
    deletePreset(activePreset);
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
      {recordValues(presets).length > 0 && (
        <div>
          <div>Saved Presets:</div>
          <div>
            {recordValues(presets).map((preset) => (
              <button
                onClick={() => setActivePreset(preset)}
                style={{
                  color: preset.name === activePreset?.name ? "green" : "black",
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {activePreset && (
        <div>
          <div>{`Active Preset: ${activePreset?.name}`}</div>
          <div>
            <button
              onClick={() => {
                updateActivePresetSelections();
              }}
            >
              Update Selected Preset
            </button>
            <button
              onClick={() => {
                deleteActivePreset();
              }}
            >
              Delete Selected Preset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

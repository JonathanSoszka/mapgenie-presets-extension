import { getActiveSelections } from "../map-genie/map-genie";
import { usePresetsStore } from "../store/presets-store";
import { recordValues } from "../../../common/utility/record";

export function PresetsManager() {
  const {
    activePreset,
    presets,
    setActivePreset,
    addPreset,
    updatePreset,
    deletePreset,
  } = usePresetsStore();

  function savePreset() {
    const name = window.prompt("Preset Name");
    if (!name) {
      return;
    }

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

    const confirmed = window.confirm(
      `Are you sure you want to delete ${activePreset.name}`
    );

    if (!confirmed) {
      return;
    }

    deletePreset(activePreset);
  }

  return (
    <div>
      <div style={{ fontSize: "18px", opacity: "0.9", padding: "0 6" }}>
        Presets
      </div>
      <div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => savePreset()}
        >
          New Preset
        </button>
      </div>
      <hr />
      {recordValues(presets).length > 0 && (
        <div>
          <div>
            {recordValues(presets).map((preset) => (
              <div
                style={{
                  paddingLeft: "10px",
                  paddingBottom: "5px",
                  fontSize: "16px",
                  opacity: preset.name === activePreset?.name ? 1 : 0.6,
                  cursor: "pointer",
                }}
              >
                <span>
                  <span onClick={() => setActivePreset(preset)}>
                    {preset.name}
                  </span>

                  {preset.name === activePreset?.name && (
                    <span>
                      <button
                        onClick={() => updateActivePresetSelections()}
                        className="btn btn-outline-secondary"
                        style={{ marginLeft: "6px", fontSize: "10px" }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteActivePreset()}
                        className="btn btn-outline-secondary"
                        style={{ marginLeft: "6px", fontSize: "10px" }}
                      >
                        Delete
                      </button>
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <hr />
        </div>
      )}
    </div>
  );
}

import { storage } from "../../../core/storage/storage";
import { div, button, p, input, renderIf } from "../../../core/ui/components";
import { bindable } from "../../../core/ui/reactivity";
import {
  getActiveSelections,
  activatePresetSelections,
} from "../utility/map-genie";
import { Presets, Preset } from "../types";
import { presetButtons } from "./preset-buttons";

export function PresetsManager() {
  const presets: Presets = storage.load("presets") || {};
  let activePreset: Preset | undefined = storage.load("active-preset");
  let presetNameInput = bindable<string>();

  const presetsContainer = div([]);
  function render() {
    presetsContainer.innerHTML = "";
    presetsContainer.appendChild(
      div([
        input("Preset Name", { bindTo: presetNameInput }),
        button("Save", {
          onClick: () => {
            saveSelectionsAsPreset();
          },
        }),
        div([p("Saved Presets:")]),
        presetButtons({
          presets,
          activePreset,
          onPresetSelected: (p) => {
            setActivePreset(p);
          },
        }),
        renderIf(
          activePreset,
          div([
            div([p(`Selected Preset: ${activePreset?.name}`)]),
            div([
              button("Update", {
                onClick: () => updatePresetSelections(activePreset),
              }),
              button("Delete", {
                onClick: () => deletePreset(activePreset),
              }),
            ]),
          ])
        ),
      ])
    );
  }

  render();

  function setActivePreset(preset: Preset | undefined) {
    activePreset = preset;
    render();
    if (activePreset) {
      activatePresetSelections(activePreset);
      storage.save("active-preset", activePreset);
    } else {
      storage.remove("active-preset");
    }
  }

  function setPreset({ name, selections }: Preset) {
    presets[name] = {
      name,
      selections,
    };
    render();
    storage.save("presets", presets);
  }

  /**Updates the active preset with the current selections */
  function updatePresetSelections(preset: Preset | undefined) {
    if (!preset) {
      return;
    }

    setPreset({ name: preset.name, selections: getActiveSelections() });
  }

  function deletePreset(preset: Preset | undefined) {
    if (!preset) {
      return;
    }

    if (preset == activePreset) {
      setActivePreset(undefined);
    }

    delete presets[preset.name];
    render();
  }

  function saveSelectionsAsPreset() {
    const name = presetNameInput.value || "Default";

    if (presets[name] != undefined) {
      return;
    }

    const newPreset = { name, selections: getActiveSelections() };

    setPreset(newPreset);

    setActivePreset(newPreset);

    presetNameInput.value = "";
  }
  return { presetsContainer };
}

function component(elementCreator: () => HTMLElement) {
  const elements = document.createElement("div");

  const render = () => {
    elements.innerHTML = "";
    elements.innerHTML = elementCreator().innerHTML;
  };

  return { elements, render };
}

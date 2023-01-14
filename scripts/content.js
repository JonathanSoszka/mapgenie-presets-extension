const _state = getPersistedState();

const panel = document.querySelector(".panel");
const categories = document.querySelector("#sidebar-categories-wrapper");

const deletePreset = document.createElement("button");
deletePreset.innerHTML = "Delete Preset";
deletePreset.onclick = () => deleteActivePreset();

const presetsContainer = document.createElement("div");

const input = document.createElement("input");
input.placeholder = "Preset Name";

const saveSelections = document.createElement("button");
saveSelections.innerHTML = "Save Selections";
saveSelections.onclick = () => console.log(savePreset(input.value));

panel.insertBefore(saveSelections, categories);
panel.insertBefore(input, categories);
panel.insertBefore(presetsContainer, categories);
panel.insertBefore(deletePreset, categories);

function getActiveSelections() {
  const selectionElements = [...document.querySelectorAll(".category-visible")];
  const selections = selectionElements.map((node) => ({
    name: node.querySelector(".title").textContent,
    id: node.id,
  }));
  return selections;
}

loadPresetButtonsUI();

// Persistence
function getPersistedState() {
  const defaultState = {
    activePreset: "",
    presets: [],
  };

  try {
    return (
      JSON.parse(localStorage.getItem("tarkov-extension-state")) ?? defaultState
    );
  } catch (err) {
    return defaultState;
  }
}

function persistState() {
  localStorage.setItem("tarkov-extension-state", JSON.stringify(_state));
  loadPresetButtonsUI();
}

function savePreset(name) {
  const newPreset = {
    name: name || "Default",
    selections: getActiveSelections(),
  };
  const presets = _state.presets;
  console.log(_state);
  /////
  let existingPresetIndex = presets.findIndex((p) => p.name == name);
  if (existingPresetIndex >= 0) {
    // Update Existing
    console.log("Updating");
    presets[existingPresetIndex] = newPreset;
  } else {
    presets.push(newPreset);
  }
  ///
  persistState();

  //   const presetButton = document.createElement("button");
  //   presetButton.innerHTML = name;
  //   presetButton.onclick = () => loadPreset(name);
  //   presetsContainer.appendChild(presetButton);
}

function loadPreset(presetName) {
  _state.activePreset = presetName;
  const presets = _state.presets;
  const presetToLoad = presets.find((p) => p.name == presetName);

  if (!presetToLoad) {
    return;
  }

  document.querySelector("#hide-all").click();

  for (const selection of presetToLoad.selections) {
    const selectionButton = document.querySelector(`#${selection.id}`);
    selectionButton.click();
  }
  persistState();
}

function loadPresetButtonsUI() {
  presetsContainer.innerHTML = "<div>Presets</div>";
  const presets = _state.presets;

  if (!presets) {
    return;
  }

  for (const preset of presets) {
    const presetButton = document.createElement("button");
    presetButton.innerHTML = preset.name;
    presetButton.onclick = () => loadPreset(preset.name);
    presetsContainer.appendChild(presetButton);
  }
}

function deleteActivePreset() {
  const activePreset = _state.activePreset;
  if (!activePreset) return;

  const presets = _state.presets;
  const activePresetIndex = presets.findIndex((p) => p.name == activePreset);
  presets.splice(activePresetIndex, 1);
  persistState();
}

function setActivePreset(presetName) {
  activePreset = presetName;
}

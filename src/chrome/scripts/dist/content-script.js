(() => {
  // src/core/storage/storage.ts
  var storage = {
    save(key, data) {
      localStorage.setItem(`mapgenie-tools:${key}`, JSON.stringify(data));
    },
    load(key) {
      const data = localStorage.getItem(`mapgenie-tools:${key}`);
      if (!data)
        return void 0;
      return JSON.parse(data);
    },
    remove(key) {
      localStorage.removeItem(`mapgenie-tools:${key}`);
    }
  };

  // src/core/ui/components.ts
  function div(children) {
    const div2 = document.createElement("div");
    if (children) {
      for (const child of children) {
        if (child)
          div2.appendChild(child);
      }
    }
    return div2;
  }
  function p(text) {
    const p2 = document.createElement("p");
    p2.innerHTML = text;
    return p2;
  }
  function button(text, options) {
    const button2 = document.createElement("button");
    button2.innerHTML = text;
    if (!options)
      return button2;
    if (options.onClick) {
      button2.addEventListener("click", options.onClick);
    }
    if (options.color) {
      button2.style.color = options.color;
    }
    return button2;
  }
  function input(placeholder, { bindTo }) {
    const input2 = document.createElement("input");
    input2.placeholder = placeholder;
    input2.addEventListener("change", function(e) {
      bindTo.value = this.value;
    });
    return input2;
  }
  function renderIf(condition, element, elseElement) {
    if (condition) {
      return element;
    }
    if (elseElement)
      return elseElement;
  }

  // src/core/ui/reactivity.ts
  function bindable(initalValue) {
    return {
      value: initalValue
    };
  }

  // src/features/presets/utility/map-genie.ts
  function getActiveSelections() {
    const selectionElements = [...document.querySelectorAll(".category-visible")];
    const selections = selectionElements.map((node) => ({
      name: node?.querySelector(".title")?.textContent || "",
      clickableElementId: node.id
    }));
    return selections;
  }
  function activatePresetSelections(preset) {
    const hideAllButton = document?.querySelector(
      "#hide-all"
    );
    hideAllButton.click();
    for (const selection of preset.selections) {
      const selectionButton = document.querySelector(
        `#${selection.clickableElementId}`
      );
      selectionButton.click();
    }
  }

  // src/core/utility/record.ts
  function recordValues(record) {
    return Object.values(record);
  }

  // src/features/presets/components/preset-buttons.ts
  function presetButtons(props) {
    const { presets, activePreset, onPresetSelected } = props;
    return div(
      recordValues(presets).map(
        (preset) => presetButton({
          preset,
          isActive: preset.name == activePreset?.name,
          onClick: (preset2) => onPresetSelected(preset2)
        })
      )
    );
  }
  function presetButton(props) {
    const { preset, isActive, onClick } = props;
    const { name, selections } = preset;
    return button(name, {
      onClick: () => {
        onClick(preset);
      },
      color: isActive ? "green" : "black"
    });
  }

  // src/features/presets/components/presets.ts
  function presetModule() {
    const presets = storage.load("presets") || {};
    let activePreset = storage.load("active-preset");
    let presetNameInput = bindable();
    const presetsContainer2 = div([]);
    function render() {
      presetsContainer2.innerHTML = "";
      presetsContainer2.appendChild(
        div([
          input("Preset Name", { bindTo: presetNameInput }),
          button("Save", {
            onClick: () => {
              saveSelectionsAsPreset();
            }
          }),
          div([p("Saved Presets:")]),
          presetButtons({
            presets,
            activePreset,
            onPresetSelected: (p2) => {
              setActivePreset(p2);
            }
          }),
          renderIf(
            activePreset,
            div([
              div([p(`Selected Preset: ${activePreset?.name}`)]),
              div([
                button("Update", {
                  onClick: () => updatePresetSelections(activePreset)
                }),
                button("Delete", {
                  onClick: () => deletePreset(activePreset)
                })
              ])
            ])
          )
          // div(
          //   activePreset
          //     ? [
          //         div([p(`Selected Preset: ${activePreset?.name}`)]),
          //         div([
          //           button("Update", {
          //             onClick: () => updatePresetSelections(activePreset),
          //           }),
          //           button("Delete", {
          //             onClick: () => deletePreset(activePreset),
          //           }),
          //         ]),
          //       ]
          //     : []
          // ),
        ])
      );
    }
    render();
    function setActivePreset(preset) {
      activePreset = preset;
      render();
      if (activePreset) {
        activatePresetSelections(activePreset);
        storage.save("active-preset", activePreset);
      } else {
        storage.remove("active-preset");
      }
    }
    function setPreset({ name, selections }) {
      presets[name] = {
        name,
        selections
      };
      render();
      storage.save("presets", presets);
    }
    function updatePresetSelections(preset) {
      if (!preset) {
        return;
      }
      setPreset({ name: preset.name, selections: getActiveSelections() });
    }
    function deletePreset(preset) {
      if (!preset) {
        return;
      }
      if (preset == activePreset) {
        setActivePreset(void 0);
      }
      delete presets[preset.name];
      render();
    }
    function saveSelectionsAsPreset() {
      const name = presetNameInput.value || "Default";
      if (presets[name] != void 0) {
        return;
      }
      const newPreset = { name, selections: getActiveSelections() };
      setPreset(newPreset);
      setActivePreset(newPreset);
      presetNameInput.value = "";
    }
    return { presetsContainer: presetsContainer2 };
  }

  // src/extension.ts
  var mapGenieContainerElement = document.querySelector(
    ".panel"
  );
  var mapGenieHookElement = document.querySelector(
    "#sidebar-categories-wrapper"
  );
  var rootElement = document.createElement("div");
  mapGenieContainerElement?.insertBefore(rootElement, mapGenieHookElement);
  var contentElement = document.createElement("div");
  rootElement.appendChild(contentElement);
  var { presetsContainer } = presetModule();
  contentElement.appendChild(presetsContainer);

  // src/chrome/scripts/content-script.ts
  presetModule();
})();

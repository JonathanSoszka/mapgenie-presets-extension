import { presetModule } from "./features/presets/components/presets"

const mapGenieContainerElement = document.querySelector(
  ".panel"
);

const mapGenieHookElement = document.querySelector(
  "#sidebar-categories-wrapper"
);


const rootElement = document.createElement("div");

mapGenieContainerElement?.insertBefore(rootElement, mapGenieHookElement);



const contentElement = document.createElement("div");
rootElement.appendChild(contentElement);

const {presetsContainer} = presetModule()
contentElement.appendChild(presetsContainer)









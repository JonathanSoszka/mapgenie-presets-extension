import { MapGenieToolsError } from "./map-genie-tools-error";

export function handleError(error: MapGenieToolsError){
  const {message, isOperational} = error
  if (isOperational) {
    window.alert(message);
  } else {
    console.error(message);
  }
}
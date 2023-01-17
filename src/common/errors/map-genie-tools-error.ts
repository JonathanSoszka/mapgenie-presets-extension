import { handleError } from "./handle-error";
export class MapGenieToolsError extends Error {
  /**Operation errors are errors born from anticipated system behavior such as 'a user put in an invalid input'.
   * A Non-Operation error is an error born form an unexpected exception being thrown somewhere in the code. */
  public isOperational: boolean;
  constructor(message: string, isOperational: boolean) {
    super(message);
    this.isOperational = isOperational;

    handleError(this);
  }
}

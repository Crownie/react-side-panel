
export class ExitEvent {
  private defaultPrevented: boolean = false;

  preventDefault() {
    this.defaultPrevented = true;
  }

  isDefaultPrevented() {
    return this.defaultPrevented;
  }
}

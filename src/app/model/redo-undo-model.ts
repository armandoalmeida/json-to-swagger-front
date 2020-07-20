export class RedoUndoModel {
  initialVersion: number;
  currentVersion: number;
  lastVersion: number;

  onDidChangeModelContent(versionId: number) {
    // undoing
    if (versionId < this.currentVersion) {
      this.enableRedoButton();
      // no more undo possible
      if (versionId === this.initialVersion) {
        this.disableUndoButton();
      }
    } else {
      // redoing
      if (versionId <= this.lastVersion) {
        // redoing the last change
        if (versionId == this.lastVersion) {
          this.disableRedoButton();
        }
      } else { // adding new change, disable redo when adding new changes
        this.disableRedoButton();
        if (this.currentVersion > this.lastVersion) {
          this.lastVersion = this.currentVersion;
        }
      }
      this.enableUndoButton();
    }
    this.currentVersion = versionId;
  }

  undo() {
    // editor.trigger('aaaa', 'undo', 'aaaa');
    // editor.focus();
  }

  redo() {
    // editor.trigger('aaaa', 'redo', 'aaaa');
    // editor.focus();
  }

  enableUndoButton() {
    // document.getElementById("undoButton").disabled = false;
  }

  disableUndoButton() {
    // document.getElementById("undoButton").disabled = true;
  }

  enableRedoButton() {
    // document.getElementById("redoButton").disabled = false;
  }

  disableRedoButton() {
    // document.getElementById("redoButton").disabled = true;
  }

}

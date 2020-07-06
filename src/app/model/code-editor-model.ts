import {CodeModel} from "@ngstack/code-editor";
import {v4 as uuid} from 'uuid';
import {CodeEditorType} from "./code-editor-type";


export class CodeEditorModel {
  id: string;
  type: CodeEditorType;
  codeModel: CodeModel;
  contentChanged: boolean;
  options = {
    contextmenu: true,
    wordWrap: true,
    minimap: {enable: true}
  };

  constructor(type: CodeEditorType, content: string) {
    this.id = uuid();
    this.type = type
    this.updateCodeModel(type, content);
    this.contentChanged = false;
  }

  updateContent(content: string) {
    this.updateCodeModel(this.type, content);
  }

  private updateCodeModel(type: CodeEditorType, content: string) {
    this.codeModel = {
      language: type.toLowerCase(),
      uri: this.id + '.' + type.toLowerCase(),
      value: content
    }
  }
}

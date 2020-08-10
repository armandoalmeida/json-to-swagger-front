import {v4 as uuid} from 'uuid';
import {CodeEditorType} from "./code-editor-type";
import ICodeEditorViewState = monaco.editor.ICodeEditorViewState;
import ITextModel = monaco.editor.ITextModel;


export class CodeEditorModel {
  id: string;
  type: CodeEditorType;
  editorModel: any;
  viewState: any;
  editorContent: string;
  contentChanged: boolean;
  options = {
    theme: 'vs-dark',
    language: 'text',
    contextmenu: true,
    wordWrap: true,
    minimap: {enable: true}
  };

  constructor(type: CodeEditorType, content: string) {
    this.id = uuid();
    this.type = type
    this.options.language = type.toLowerCase();
    this.updateContent(content);

    this.contentChanged = false;
  }

  updateViewState(viewState: any, model: any) {
    this.viewState = viewState;
    this.editorModel = model;
  }

  updateContent(content: string) {
    this.editorContent = content;
  }

}

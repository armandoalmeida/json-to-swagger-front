import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CodeEditorModel} from "./model/code-editor-model";
import {CodeEditorType} from "./model/code-editor-type";
import {environment} from '../environments/environment';
import ICodeEditor = monaco.editor.ICodeEditor;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'json-to-swagger-front';
  files: CodeEditorModel[] = []
  activeId: string;
  // editorInstance: ICodeEditor;
  currentCodeModel: CodeEditorModel;
  jsonFile: CodeEditorModel;
  yamlFile: CodeEditorModel;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/example_code.json').subscribe(data => {
      this.jsonFile = new CodeEditorModel(CodeEditorType.JSON, JSON.stringify(data, null, 4));
      this.addCodeEditorTab(this.jsonFile);
    });
  }

  onConvert() {
    if (!this.yamlFile) {
      this.yamlFile = new CodeEditorModel(CodeEditorType.YAML, 'converting...');
      this.addCodeEditorTab(this.yamlFile);
    } else {
      this.activeCodeEditorTabById(this.yamlFile.id);
      this.yamlFile.updateContent('converting...');
    }

    this.http.post(environment.jsonToSwaggerApi,
      this.jsonFile.editorContent, {
        headers: {'Content-Type': 'application/json'},
        responseType: "text"
      }).subscribe(data => {
      this.yamlFile.updateContent(data as string)
    });
  }

  addCodeEditorTab(model: CodeEditorModel) {
    this.files.push(model);
    this.activeCodeEditorTabById(model.id);
  }

  activeCodeEditorTabById(fileId: string) {
    let model = this.getCodeModelById(fileId);
    if (model) {
      this.activeId = model.id;
      this.currentCodeModel = model;
    }
  }

  getCodeModelById(fileId: string): CodeEditorModel {
    for (let i = 0; i < this.files.length; i++) {
      let file = this.files[i];
      if (file.id === fileId) {
        return file;
      }
    }
  }

  onInitEditor(editor: ICodeEditor) {
    console.log(editor);

    if (this.currentCodeModel.viewState) {
      editor.setValue(this.currentCodeModel.editorContent);
      // editor.setModel(this.currentCodeModel.editorModel);
      editor.restoreViewState(this.currentCodeModel.viewState);
    }

    editor.onDidBlurEditorText(() => {
      this.updateViewState(editor);
      console.log('onDidBlurEditorText', editor.getModel());
    })

  }

  updateViewState(editor: ICodeEditor) {
    if (editor) {
      if (this.currentCodeModel.type == CodeEditorType.JSON)
        this.jsonFile.updateViewState(editor.saveViewState(), editor.getModel())
      // this.jsonFile.updateEditorModel(editor.getModel());
      if (this.currentCodeModel.type == CodeEditorType.YAML)
        this.yamlFile.updateViewState(editor.saveViewState(), editor.getModel())
      // this.yamlFile.updateEditorModel(editor.getModel());
    }
  }
}

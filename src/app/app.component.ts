import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CodeEditorModel} from "./model/code-editor-model";
import {CodeEditorType} from "./model/code-editor-type";
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'json-to-swagger-front';
  files: CodeEditorModel[] = []
  codeEditorModel: CodeEditorModel;
  activeId: string;
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
      this.yamlFile = new CodeEditorModel(CodeEditorType.YAML, '');
      this.addCodeEditorTab(this.yamlFile);
    }

    this.yamlFile.updateContent('converting...');
    this.activeCodeEditorTabById(this.yamlFile.id);

    this.http.post(environment.jsonToSwaggerApi,
      this.jsonFile.codeModel.value, {
        headers: {'Content-Type': 'application/json'},
        responseType: "text"
      }).subscribe(data => {
      this.yamlFile.updateContent(data as string)
    });
  }

  addCodeEditorTab(yamlModel: CodeEditorModel) {
    this.files.push(yamlModel);
    this.activeCodeEditorTabById(yamlModel.id);
  }

  activeCodeEditorTabById(fileId: string) {
    for (let i = 0; i < this.files.length; i++) {
      let file = this.files[i];
      if (file.id === fileId) {
        this.activeId = file.id;
        this.codeEditorModel = file;
        break;
      }
    }
  }

}

import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CodeModel} from "@ngstack/code-editor";
import {CodeEditorModel} from "../model/code-editor-model";

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements OnInit {
  theme = 'vs-dark';
  @Input() codeEditorModel: CodeEditorModel;

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
    wordWrap: true
  };

  ngOnInit(): void {
  }

  onCodeChanged(value) {
    console.log('CODE', value);
    // TODO eventEmitter
  }


}

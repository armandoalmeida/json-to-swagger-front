import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CodeEditorModel} from "../model/code-editor-model";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements OnInit {
  @Input() tabs: CodeEditorModel[] = [];
  @Output() selectTab: EventEmitter<string> = new EventEmitter<string>();
  @Input() activeId: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onTabClick() {
    this.selectTab.emit(this.activeId);
  }
}

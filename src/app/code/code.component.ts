import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { editor } from 'monaco-editor';
import { CodeService } from '../core/services/code.service';
declare const monaco: any;

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  @Input() code: string = '';
  @Output() codeChange = new EventEmitter()

  editor?: editor.ICodeEditor | editor.IEditor;

  constructor(
    private codeService: CodeService
  ) { }

  ngOnInit(): void {
  }

  codeUpdate(e) {
    this.codeChange.emit(e)
  }

  onEditorInit(e: editor.ICodeEditor | editor.IEditor): void {
    this.editor = e;
    // this.editor.setModel(monaco.editor.createModel("console.log('Hello ng-zorro-antd')", 'typescript'));
    // monaco.languages.registerCompletionItemProvider('cpp', {
    //   provideCompletionItems: function (model, position, context) {
    //     let suggestions: any[] = [];
    //     suggestions.push({
    //       label: 'pinMode',
    //       detail: '设置引脚状态',
    //       insertText: `pinMode(pin, OUTPUT)`,
    //       kind: 1,
    //     });
    //     return { suggestions };
    //   },
    // });
    this.codeService.searchBoardHeaderFile();
  }
}

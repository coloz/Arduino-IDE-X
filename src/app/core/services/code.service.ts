import { Injectable } from '@angular/core';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    if (this.isElectron) {
      this.fs = window.require('fs');
    }
  }

  searchBoardHeaderFile() {
    let fileList = this.fs.readdirSync('C:\\Users\\clz\\AppData\\Local\\Arduino15\\packages\\arduino\\hardware\\avr\\1.8.5\\cores\\arduino')
    console.log(fileList);
    fileList.forEach(file => {
      if (file.includes('.h')) {
        console.log(file);
      }
    })
  }

  readFile(filepath) {
    let content = this.fs.readFileSync(filepath, 'utf-8');
  }
}

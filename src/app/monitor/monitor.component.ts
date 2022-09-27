import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../core/services/config.service';
import { SerialService } from '../core/services/serial.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  @ViewChild("scrollContainer", { read: ElementRef, static: true }) scrollContainer: ElementRef;
  @Input() serial: string;

  dataList = ['']

  get speedList() {
    if (this.configService.config.board != null)
      return this.configService.config.board['serialSpeed']
    return ["9600", "9600"]
  }

  speed = '9600';

  constructor(
    private serialService: SerialService,
    private configService: ConfigService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    let speed = localStorage.getItem('monitor.speed')
    if (speed != null) this.speed = speed
    this.serialService.init(this.configService.config.serial, Number(this.speed));
    this.serialService.output.subscribe(str => {
      if (this.dataList.length > 999) this.clear()
      let dataArray = str.replace('\r', '').split(/\n/)
      this.dataList[this.dataList.length - 1] = this.dataList[this.dataList.length - 1] + dataArray[0]
      if (dataArray.length > 1) {
        for (let index = 1; index < dataArray.length; index++) {
          let data = dataArray[index];
          this.dataList.push(data);
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }
      }
      this.cd.detectChanges()
    })
  }

  changeSpeed() {
    this.serialService.changeSpeed(Number(this.speed))
    localStorage.setItem('monitor.speed', this.speed)
  }

  ngOnDestroy(): void {
    this.serialService.close()
  }

  clear() {
    this.dataList = ['']
  }

  send() {

  }

}

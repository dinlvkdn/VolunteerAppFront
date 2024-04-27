import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit{
  @Input() id: string | undefined;
  @Input() firstName : String | undefined;
  @Input() lastName : String | undefined;
  @Input() description : String | undefined;
  @Input() starsFromBackend : number | undefined;

  starsArray: any[];

  ngOnInit() {
    this.starsArray = Array(this.starsFromBackend).fill(0);
  }
}

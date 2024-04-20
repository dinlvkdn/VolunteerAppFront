import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

let input = Input;

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit{
  maxRating: number = 5;
  maxRatingArray = [];
  @Input() SelectedStar:number=0;
  previousSelection = 0;
  @Output() onRating : EventEmitter<number> = new EventEmitter<number>()
  constructor() {}
  HandleMouseEnter(index:number){
    this.SelectedStar=index+1;
  }

  HandleMouseLeave(){
    if (this.previousSelection !== 0){
      this.SelectedStar = this.previousSelection;
    }
    else{
      this.SelectedStar = 0;
    }
  }

  Rating(index : number){
    this.SelectedStar = index + 1;
    this.previousSelection = this.SelectedStar;
    this.onRating.emit(this.SelectedStar);
  }

  ngOnInit() {
    this.maxRatingArray = Array(this.maxRating).fill(0);
  }
}

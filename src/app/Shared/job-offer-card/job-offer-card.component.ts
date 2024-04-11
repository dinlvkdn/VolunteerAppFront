  import {Component, Input} from '@angular/core';

  @Component({
    selector: 'app-job-offer-card',
    templateUrl: './job-offer-card.component.html',
    styleUrl: './job-offer-card.component.scss'
  })

  export class JobOfferCardComponent {

    @Input() titleJobOffer : String | undefined;
    @Input() cityJobOffer : String | undefined;
    @Input() streetJobOffer : String | undefined;
    @Input() countryJobOffer : String | undefined;
    @Input() dateJobOffer: string | null;
  }

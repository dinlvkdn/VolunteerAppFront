import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-volunteer-card',
  templateUrl: './volunteer-card.component.html',
  styleUrl: './volunteer-card.component.scss'
})
export class VolunteerCardComponent {
  @Input() firstName : String | undefined;
  @Input() lastName : String | undefined;
  @Input() description : String | undefined;
  @Input() dateOfBirth: string | null;
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrl: './organization-card.component.scss'
})
export class OrganizationCardComponent {
  @Input() nameOrganization : string;
  @Input() yearOfFoundation : number;
}

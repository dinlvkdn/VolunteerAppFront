import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.scss'
})
export class WelcomeSectionComponent {
@Input() title : String | undefined;
@Input() info : String | undefined;
@Input() contextButton : String  | undefined;
}

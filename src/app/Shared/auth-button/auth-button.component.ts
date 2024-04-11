import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss'
})

export class AuthButtonComponent {
  @Input() content : String | undefined;
  @Input() type : String | undefined;
  @Input() click : String | undefined;
  @Input() disabled : boolean = false;
}

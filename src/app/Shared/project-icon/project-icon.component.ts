  import {Component, Input} from '@angular/core';

  @Component({
    selector: 'app-project-icon',
    templateUrl: './project-icon.component.html',
    styleUrl: './project-icon.component.scss'
  })
  export class ProjectIconComponent {
    @Input() iconColor: string | undefined;
    @Input() width: string | undefined;
    @Input() height: string | undefined;

    get selectedIconPath(): string {
      if (this.iconColor === 'orange') {
        return '/assets/orange-icon.png';
      } else {
        return '/assets/icon.png';
      }
    }
  }

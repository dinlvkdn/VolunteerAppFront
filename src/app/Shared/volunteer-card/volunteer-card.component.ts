import {Component, Input} from '@angular/core';
import {ResumeService} from "../../core/services/resume.service";
import {catchError, map, of} from "rxjs";
import {ErrorService} from "../../core/services/error.service";

@Component({
  selector: 'app-volunteer-card',
  templateUrl: './volunteer-card.component.html',
  styleUrl: './volunteer-card.component.scss'
})
export class VolunteerCardComponent{
  @Input() firstName : String | undefined;
  @Input() lastName : String | undefined;
  @Input() description : String | undefined;
  @Input() dateOfBirth: string | null;
  @Input() id: string | undefined;
  @Input() titleJobOffer: string | undefined;
  @Input() showButton: boolean = true;
  @Input() showIndicator: boolean = false;
  @Input() indicatorColor: string = 'green';

  constructor(
    private resumeService : ResumeService,
    private errorService : ErrorService
  ) {}
  downloadResume() {
    this.resumeService.downloadResume(this.id)
      .pipe(
        map(response => new Blob([response], { type: response?.type.toString() })),
        catchError(error => {
          this.errorService.handleError(error);
          return of(null);
        })
      )
      .subscribe((pdf: Blob | null) => {
        if (pdf) {
          const url = window.URL.createObjectURL(pdf);
          const link = document.createElement('a');
          link.href = url;
          link.download = this.id;
          link.click();
          window.URL.revokeObjectURL(url);
        }
      });
  }


}

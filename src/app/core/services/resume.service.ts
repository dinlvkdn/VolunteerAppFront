  import { Injectable } from '@angular/core';
  import {Observable, Subject} from 'rxjs';
  import {HttpClient} from '@angular/common/http';
  import { environment } from '../../environment/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class ResumeService {
    result: Subject<boolean> = new Subject<boolean>();

    constructor(private readonly http: HttpClient) {}

    uploadResume(resume: File) {
      const formData = new FormData();
      formData.append('file', resume);
      return this.http.post<any>(environment.apiAddress + '/Volunteer/uploadResume', formData);
    }
    downloadResume(volunteerId : string): Observable<Blob>{
      return this.http
        .get(
          environment.apiAddress + `/Organization/downloadResume/${volunteerId}`,
          { responseType: 'blob' }
        );
    }
  }

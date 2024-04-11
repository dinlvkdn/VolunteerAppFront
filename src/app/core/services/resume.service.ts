  import { Injectable } from '@angular/core';
  import {catchError, subscribeOn} from 'rxjs/operators';
  import { of, Subject } from 'rxjs';
  import {HttpClient, HttpRequest} from '@angular/common/http';
  import { environment } from '../../environment/environment';
  import {Form} from "@angular/forms";

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
    }}


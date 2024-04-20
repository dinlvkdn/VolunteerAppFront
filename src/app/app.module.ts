import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCheckbox} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MatPaginatorModule } from '@angular/material/paginator';
import {SharedModule} from "./Shared/shared.module";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import { OrganizationPageComponent } from './pages/organization-page/organization-page.component';
import { VolunteersPageComponent } from './pages/volunteers-page/volunteers-page.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationPageComponent,
    VolunteersPageComponent,
    PersonalPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckbox,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

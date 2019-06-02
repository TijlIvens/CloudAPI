import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SongListComponent } from './song-list/song-list.component';
import { AdminComponent } from './admin/admin.component';
import { MainListComponent } from './main-list/main-list.component';
import { HeaderComponent } from './header/header.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoginComponent } from './login/login.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("704481721683-d5pnn60fdgc3memf2ocu21540bjs3ivl.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SongListComponent,
    AdminComponent,
    MainListComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "home", component: MainListComponent},
      { path: "admin", component: AdminComponent},
      { path: "login", component: LoginComponent},
      { path: "", redirectTo: "home", pathMatch: "full"},
      { path: "**", component: MainListComponent}
    ]),
    ButtonModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

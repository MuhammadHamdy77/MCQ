import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { ModalComponent } from './components/modal/modal.component';
import { CongratComponent } from './components/congrat/congrat.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
defineElement(lottie.loadAnimation);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [
    NavbarComponent,ModalComponent,CongratComponent
  ],

  imports: [
    MatrialModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    ToastrModule.forRoot(),
    RouterModule,    
    FormsModule,
    BrowserModule
  ],  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  ,
  exports:[
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    MatrialModule,
    CommonModule,
    TranslateModule,
    NavbarComponent
  ]
})
export class SharedModule { 
constructor(){
  defineElement(lottie.loadAnimation);
}
}

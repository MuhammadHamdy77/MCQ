import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AuthModule {

  constructor(){
    defineElement(lottie.loadAnimation);
  }
 }

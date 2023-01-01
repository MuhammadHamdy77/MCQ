import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './components/exam/exam.component';
import { MatrialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
defineElement(lottie.loadAnimation);

@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,MatrialModule,SharedModule
  ] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentModule { 
  constructor(){
    defineElement(lottie.loadAnimation);
  }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewexamComponent } from './components/newexam/newexam.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SharedModule } from '../shared/shared.module';
import { MatrialModule } from 'src/app/shared/material.module';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
defineElement(lottie.loadAnimation);
@NgModule({
  declarations: [
    NewexamComponent,
    StudentsComponent,
    SubjectsComponent 
  ],
  imports: [
    CommonModule,SharedModule,MatrialModule,MatDialogModule,DataTablesModule,BrowserModule
  ] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctorModule { 

  constructor(){
    defineElement(lottie.loadAnimation);
  }
}

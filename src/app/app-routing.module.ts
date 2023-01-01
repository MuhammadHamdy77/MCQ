import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { NewexamComponent } from './doctor/components/newexam/newexam.component';
import { StudentsComponent } from './doctor/components/students/students.component';
import { SubjectsComponent } from './doctor/components/subjects/subjects.component';
import { LoginGuard } from './Guard/login.guard';
import { Login2Guard } from './Guard/login2.guard';
import { ExamComponent } from './student/components/exam/exam.component';





const Routes: Routes = [
  {path:'' , redirectTo:"subjects" , pathMatch: 'full'},
  {path:'login' ,canActivate:[Login2Guard],component:LoginComponent},
  {path:'register' ,canActivate:[Login2Guard],component:RegisterComponent},
  {path:'exam/:id' ,  canActivate:[LoginGuard],  component:ExamComponent},
  {path:'students' ,  canActivate:[LoginGuard],  component:StudentsComponent},
  {path:'subjects' ,  canActivate:[LoginGuard],  component:SubjectsComponent},
  {path:'new-exam' ,  canActivate:[LoginGuard],  component:NewexamComponent},
  {path:'**' , redirectTo:'login' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

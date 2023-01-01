import { AnimationStyleMetadata } from '@angular/animations';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideLeft } from 'src/app/animations/slide-left.animation';
import { slideRight } from 'src/app/animations/slide-right.animation';
import { slideTop } from 'src/app/animations/slide-top.animation';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations:[slideRight,slideLeft,slideTop] ,

})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  students:any[]=[];
  base64:any = '';
  constructor(
    private router: Router,
    private fb:FormBuilder,
    private auth:AuthService,
    private tostar:ToastrService
    ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.getAllUsers();
  }

createForm(){
  this.userForm = this.fb.group({
    username: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required]],
    confirmPassword: ['',[Validators.required]],
    className: ['',[Validators.required]],
    avataruser: ['',[Validators.required]],
  })
}

getPathImage(event:any){
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
  this.base64 = reader.result;
  };
}

submit(){
 const model = {
  username  : this.userForm.value.username,
  email     :this.userForm.value.email,
  password  : this.userForm.value.password,
  className  : this.userForm.value.className,
  avataruser  : this.base64,
 };

 let index = this.students.findIndex(item => item.email == this.userForm.value.email);
 if( index !== -1){
this.tostar.error("Email is Exsit", "" , {
  disableTimeOut: false,
  titleClass: "toastr_title",
  messageClass: "toastr_message",
  timeOut:5000,
  closeButton: true,
})
 }else{
 this.auth.createuser(model).subscribe(res=>{
  this.tostar.success(`Register is Done`, "" , {
    disableTimeOut: false,
    titleClass: "toastr_title",
    messageClass: "toastr_message",
    timeOut:5000,
    closeButton: true,
  });
  this.routeUrl();
})
}
}

getAllUsers(){
  this.auth.getAllUsers('users').subscribe((res:any)=>{
    this.students = res
  })
}
  routeUrl(){
    this.router.navigate(['/', 'login']);
  }


}

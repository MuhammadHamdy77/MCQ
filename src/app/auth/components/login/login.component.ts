import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideLeft } from 'src/app/animations/slide-left.animation';
import { slideRight } from 'src/app/animations/slide-right.animation';
import { slideTop } from 'src/app/animations/slide-top.animation';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[slideRight,slideLeft,slideTop]
})
export class LoginComponent implements OnInit {
  myForm!:FormGroup;
  users:any[]=[];
  roles:string = 'users';

  constructor(
    private router:Router ,
    private fb:FormBuilder,
    private auth:AuthService,
    private tostar:ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.createForm();
  }
  createForm(){
    this.myForm = this.fb.group({
      role: [this.roles],
      email:['' , [Validators.required , Validators.email]],
      password: ['',[Validators.required]],
    })
  }
  roleUser(role:any){
    this.roles = role.target.value;
    this.getAllUsers();
  }


getAllUsers(){
  this.auth.getAllUsers(this.roles).subscribe((res:any)=>{
    this.users = res;
  })
}

  submit(){
    let index = this.users.findIndex(item => item.email == this.myForm.value.email && item.password == this.myForm.value.password  );
    if(index == -1){
   this.tostar.error("invalid Email or password", "" , {
     disableTimeOut: false,
     titleClass: "toastr_title",
     messageClass: "toastr_message",
     timeOut:5000,
     closeButton: true,
   })
    }else{
      const model = {
        username: this.users[index].username,
        role:this.roles,
        userId:this.users[index].id,
        avataruser: this.users[index].avataruser
       }
    this.auth.login(model).subscribe(res=>{
     this.tostar.success(`Login is Done`, "" , {
       disableTimeOut: false,
       titleClass: "toastr_title",
       messageClass: "toastr_message",
       timeOut:5000,
       closeButton: true,
     });
     this.auth.user.next(res);
     this.router.navigate(['/', 'subjects']);
   })
   }
   }



  routeUrl(){
    this.router.navigate(['/', 'register']);
  }

}

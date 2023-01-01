import { Component ,OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Final-Exam';
  loader = true;
  constructor(private auth:AuthService){}
  ngOnInit(): void {
  this.getuserRole();
  
  }

getuserRole(){
this.auth.getRole().subscribe(res=>{
  this.auth.user.next(res)
  
})
}
  
}

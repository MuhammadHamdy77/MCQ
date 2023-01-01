import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
user: any;
date:any;
currentLan!:string;
  constructor( private router:Router , private auth:AuthService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res=>{
      this.user = res;
    });
    this.date = new Date();
    this.currentLan = localStorage.getItem("cuerrentLang") || 'en';
    this.translate.use(this.currentLan)
  }
  logout(){
    const model = {
     }
     this.router.navigate(['/','login']);
    this.auth.logOut(model).subscribe(res=>{
      this.auth.user.next(res);
    }); 
  }


  changeLang(lang:any){
    this.translate.use(lang);
    localStorage.setItem("cuerrentLang" , lang)
  }
}

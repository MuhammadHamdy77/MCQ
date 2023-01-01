import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
allSubjects:any[]=[];
user:any;
  constructor(private DoctorService:DoctorService, private AuthService:AuthService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getuserInfo()
  }



  getAllSubjects(){
    this.DoctorService.getAllSubjects().subscribe((data:any)=>{
     this.allSubjects = data;
     
      
    })
  }


  getuserInfo(){
    this.AuthService.getRole().subscribe((res)=>{
      this.user = res
    })
  }


  deleteSub(i:number){
    let id = this.allSubjects[i].id;
    this.allSubjects.splice(i , 1);
    this.DoctorService.deleteSub(id).subscribe((res:any)=>{
    })
    
  }
}

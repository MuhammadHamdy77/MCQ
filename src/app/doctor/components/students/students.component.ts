import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dtOptions: any = {};
  constructor(private AuthService:AuthService,public translate: TranslateService) { }
allDataUsers:any[]=[];
dtTrigger:any= new Subject();
dataTable:any;
 ngOnInit(): void {
    this.dtOptions = {
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy', 'csv','pdf', 'print',
        {
          extend: 'pdfHtml5',
          text: 'PDF with image',
          orientation: 'landscape',
          pageSize: 'LEGAL'
      }],
    };
    this.getAllUsers();
  }


  getAllUsers(){
    this.AuthService.getAllUsers("users").subscribe((data:any)=>{
      this.allDataUsers = data.map((student:any)=>{
        if(student?.subjects){
          return student?.subjects?.map((sub:any)=>{
            return{
              name: student.username,
              className: student.className,
              subjectName: sub.name,
              degree: sub.degree,
            }
          })

        }else{
          return [{
            name: student.username,
            className: student.className,
            subjectName: '-',
            degree: '-',
          }]
        }

      });

      this.dataTable= [];
      this.allDataUsers.forEach((item:any)=>{
        item.forEach((subItem:any) => {
          this.dataTable.push({
            name: subItem.name,
            className: subItem.className,
            subjectName: subItem.subjectName,
            degree: subItem.degree,
          })
        });
      });
      this.dtTrigger.next();

    })
  }
}

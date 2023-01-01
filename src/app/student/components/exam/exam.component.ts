import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CongratComponent } from 'src/app/shared/components/congrat/congrat.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DoctorService } from '../../../doctor/services/doctor.service';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
date:any;
id:any;
user:any;
userInfo:any;
total:number = 0;
allSubject!:any;
subjectuserData:any[]=[];
resultText:boolean = false;
isExam:boolean = true;
  constructor(private router:ActivatedRoute , 
    private DoctorService:DoctorService,  
    public dialog: MatDialog, 
    private AuthService:AuthService,
    private toastr:ToastrService,
    public translate: TranslateService
    ) {
    this.date  = new Date();
    this.id = this.router.snapshot.paramMap.get("id");
    this.getSub();
   }

  ngOnInit(): void {
    this.getuserInfo();
  }



  getuserInfo(){
    this.AuthService.getRole().subscribe((res)=>{
      this.user = res;
      this.getusersData();
    })
  }

  getusersData(){
    this.AuthService.getUser(this.user.id).subscribe((res:any)=>{
      console.log("res user" , res);
      
      this.userInfo =  res;
      if(res.subjects){
        this.subjectuserData = res.subjects
      }else{
        this.subjectuserData = []
      }
      this.checkValidateExam();
     })
  }

  correctAns(event:any){
    let value = event.value,
        answerIndex = event.source.name;
        this.allSubject.questions[answerIndex].studentAnswer = value;    
  }

  getSub(){
    this.DoctorService.getSubject(this.id ).subscribe(res=>{
      this.allSubject = res;
      
    })
  }

  deleteQue(i:any){
    this.allSubject.questions.splice(i,1);
    const model = {
      name: this.allSubject.name,
      questions :this.allSubject
    }
    this.DoctorService.deleteQuestion(model,this.id).subscribe((data:any)=>{
      this.openDialog();
     });
  }


  checkValidateExam(){
    for(let x in this.subjectuserData){
      if(this.subjectuserData[x].id == this.id){
        this.isExam = false;
        this.total = this.subjectuserData[x].degree;
        if(this.user?.role == 'users'){
          this.toastr.warning(`This Test Has Been Completed this Degree i's ${this.total}`)
        }
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CongratComponent, {
      width: '350px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  getResult(){
    this.total = 0
    for (let i in this.allSubject.questions) {
      if(this.allSubject.questions[i].studentAnswer == this.allSubject.questions[i].correctAnswer){
       this.total++;
      }
    }
    this.resultText = true;
    this.subjectuserData.push(
      {
        name:this.allSubject.name,
        id:this.id,
        degree:this.total
      }
    );

    const model = {
       username : this.userInfo.username,
       email : this.userInfo.email,
       password : this.userInfo.password,
       id : this.userInfo.id,
       className : this.userInfo.className,
       subjects:this.subjectuserData
    }
    
    this.AuthService.updateUser(this.user.id , model).subscribe(res=>{
      this.toastr.success("Exam i's Done ");
      })
    
  }
}

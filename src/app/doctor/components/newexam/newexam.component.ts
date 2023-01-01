import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-newexam',
  templateUrl: './newexam.component.html',
  styleUrls: ['./newexam.component.scss']
})
export class NewexamComponent implements OnInit {
  nameSubject = new FormControl('', Validators.required);
  questions:any[]=[];
  questionForm!:FormGroup;
  correctNumber:any;
  startAdd:boolean = false;
  preview:boolean = false;
  nameSub:any;
  stepperIndex = 0;
  idQue:any;
  constructor(private fb:FormBuilder ,
    private service:AuthService  ,
    private router:Router , 
    private toaster:ToastrService,
    private DoctorService:DoctorService,
    public dialog: MatDialog,
    public translate: TranslateService
    ) { 

 
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.questionForm = this.fb.group({
      question:['',Validators.required],
      answer1:['',Validators.required],
      answer2:['',Validators.required],
      answer3:['',Validators.required],
      answer4:['',Validators.required]
    })
  }

  createQuestion(){
    if(this.correctNumber){
      const model={
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer:this.questionForm.value[this.correctNumber]
      }
      this.questions.push(model);
      this.questionForm.reset();

      
    }else{
      this.toaster.error("please Choose Your Correct Answer This question" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    }
  }

  correctAns(event:any){
    this.correctNumber = event.value;
  }
  start(){
    if(this.nameSubject.valid){
      this.startAdd = true;
      this.nameSub = this.nameSubject.value;
    }else{
      this.toaster.error("please Type question")
    }

  if(this.startAdd){
    this.stepperIndex = 1
  }

  }

  deleteQuestion(){
    this.questionForm.reset();
    this.startAdd = false;
    this.nameSub = "";
    this.stepperIndex = 0;
    this.nameSubject.setValue("")
  }
  clearForm(){
    this.questionForm.reset();
  }
  submit(){
    const model = {
      name: this.nameSub,
      questions :this.questions
    }
    if(this.preview){
      this.stepperIndex = 2
    }else{
      this.DoctorService.addQuestion(model).subscribe((data:any)=>{
        this.preview = true;
        this.idQue = data.id;
        
       });
    }
  }


  deleteQue(index:any){
    this.questions.splice(index,1);
    const model = {
      name: this.nameSub,
      questions :this.questions
    }
    this.DoctorService.deleteQuestion(model,this.idQue).subscribe((data:any)=>{
      // this.toaster.success(`question ${this.idQue} i's Deleted`);
      this.openDialog();
     });
  }



    openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

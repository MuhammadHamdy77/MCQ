import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

addQuestion(data:any){
 return this.http.post(`${environment.baseUrl}subjects`,data)
}
deleteQuestion(data:any,id:any){
  return this.http.put(`${environment.baseUrl}subjects/${id}`,data)
}


getAllSubjects(){
  return this.http.get(`${environment.baseUrl}subjects`)
}


getSubject(id:number) {
  return this.http.get(`${environment.baseUrl}subjects/${id}`)
}

deleteSub(id:any){
  return this.http.delete(`${environment.baseUrl}subjects/${id}`);
}

}

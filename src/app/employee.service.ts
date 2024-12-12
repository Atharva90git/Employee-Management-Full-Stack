import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  Api="http://localhost:9090"
  public saveEmp(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.Api}/save/employee`, employee)
  }

  public getEmp(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.Api}/get/employee`);
  }

  public deleteEmp(emp_id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.Api}/delete/employee/${emp_id}`);

  }

  public getEmpWithId(emp_id: number){
    return this.httpClient.get<Employee>(`${this.Api}/get/employee/${emp_id}`);
  }

  public updateEmp(employee: Employee){
    return this.httpClient.put<Employee>(`${this.Api}/update/employee`, employee);
  }
}

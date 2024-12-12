import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{
  ngOnInit(): void {
  
  }

  dataSource:Employee[]=[]
  constructor(private employeeService: EmployeeService,
    private router: Router
  ){
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmp().subscribe(
      {
      next:(res: Employee[]) =>{
        this.dataSource= res
      },
      error:(err:HttpErrorResponse) =>{
        console.log(err);


      }
    } 
    );
    
  }

  editEmployee(emp_id: number): void {
    this.router.navigate(['employee/',{emp_id: emp_id}]);
  }
  
  deleteEmployee(emp_id: number): void {
      this.employeeService.deleteEmp(emp_id).subscribe(
        {
          next:(res)=>{
            console.log(res);
            this.getEmployees();
          },
          error:(err:HttpErrorResponse) =>{
            console.log(err);
          }
          
  
        }
      );
      
  }

  



  displayedColumns: string[] = ['emp_id', 'emp_name', 'emp_mobno', 'emp_address', 'emp_gender', 'emp_depertment', 'emp_skills', 'edit' , 'delete'];

}

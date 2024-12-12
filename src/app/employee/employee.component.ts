import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  isCreateEmployee: boolean = true;
  employee: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employee = this.activatedRoute.snapshot.data['employee'];
    console.log(this.employee);

    if (this.employee && this.employee.emp_id != '') {
      this.isCreateEmployee = false;
      if (this.employee.emp_skills != '') {
        this.skills = [];
        this.skills = this.employee.emp_skills.split(',');
      }
    } else {
      this.isCreateEmployee = true;
    }
  }
  checked = false;
  unbounded = false;

  selectGender(gender: string): void {
    this.employee.emp_gender = gender;
  }

  dept(department: string): void {
    this.employee.emp_depertment = department;
  }

  skills: string[] = [];

  onSkillchange(event: any): void {
    if (event.checked) {
      this.skills.push(event.source.value);
    } else {
      this.skills.forEach((item, index) => {
        if (item === event.source.value) this.skills.splice(index, 1);
      });
    }

    this.employee.emp_skills = this.skills.toString();
  }

  onSkillchacked(sills: string) {
    return (
      this.employee.emp_skills != null &&
      this.employee.emp_skills.includes(sills)
    );
  }
  saveEmployee(employeeForm: NgForm): void {
    //check we are performing saving employee or updating
    if (this.isCreateEmployee) {
      //if its tru it will run save emp API
      this.employeeService.saveEmp(this.employee).subscribe({
        next: (res: Employee) => {
          console.log(res);
          employeeForm.reset();
          this.employee.emp_gender = '';
          this.router.navigate(['employee/list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      //if its false it will run update emp API
      this.employeeService.updateEmp(this.employee).subscribe({
        next: (res: Employee) => {
          this.router.navigate(['employee/list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    }
  }
}

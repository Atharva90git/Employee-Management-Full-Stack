import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { Observable, of } from "rxjs";
import { Employee } from "./employee.model";

export const EmployeeResolver: ResolveFn<any>=
(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot,
    employeeService: EmployeeService=inject(EmployeeService)
):Observable <Employee>=>{
    const emp_id= route.paramMap.get("emp_id");
    if (emp_id) {
        //return filled form with given employee id
        return employeeService.getEmpWithId(Number(emp_id));
    }
    else{
        //return empty form

        const employee: Employee={
            emp_id: '',
            emp_name: '',
            emp_mobno: '',
            emp_address: '',
            emp_gender: '',
            emp_depertment: '',
            emp_skills: ''
          }

          return of(employee);
    }
}
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { error } from 'console';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {

   constructor() {}
   private readonly router=inject(Router);
   private readonly authService=inject(AuthService);
  isLoading:boolean=false;


  msgsuc!:string;
    
  Register:FormGroup=new FormGroup({
   
name:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
email:new FormControl(null, [Validators.required,Validators.email]),
password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{7,}$/)]),
rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{7,}$/)])



  },{validators:this.confirm});

  submitForm():void{
    if(this.Register.valid){
      this.isLoading=true;
      this.authService.sendRegisterForm(this.Register.value).subscribe({
        next:(res)=>{
         if(res.message==="success"){
          setTimeout(() => {
  localStorage.setItem('userData',res.token);
  
  this.authService.saveUserData();
  
            this.router.navigate(["/home"]);
          }, 500);
  this.msgsuc=res.message;
         }
         this.isLoading=false;
        },
        error:()=>{
          this.isLoading=false;
        }
        
      })
     }
     else{
      this.Register.markAllAsTouched();
     }
  
  
  
  }

  confirm(con:AbstractControl){
const password=con.get('password')?.value;
const rePassword=con.get('rePassword')?.value;
return password === rePassword ? null :{mismatch:true};

  }





}

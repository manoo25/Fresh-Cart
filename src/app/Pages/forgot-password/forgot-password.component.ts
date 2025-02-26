import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
private readonly authService=inject(AuthService);
private readonly router=inject(Router)

isLoading:boolean=false;
step:number=1;
msgErr:string='';
msgsuc:string='';
  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  });
  verifyResetCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  });
  ResetNewPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{7,}$/)])
  });


  submitverifyEmail():void{
if(this.verifyEmail.valid){
  this.msgErr='';
  this.msgsuc='';
  this.isLoading=true;
  this.authService.sendVerifyEmail(this.verifyEmail.value).subscribe({
   next:(res)=>{
    
     console.log(res);
     setTimeout(() => {
      this.msgErr='';
      this.msgsuc='';
       this.step=2;
     }, 1500);
    
     this.isLoading=false;
     this.msgsuc=res.message
   

   },
   error:(err)=>{
     
     console.log(err);
     this.step=1;
     this.isLoading=false;
     this.msgErr=err.error.message;
 
     
   }
   
  })
}

  }
  submitverifyResetCode():void{


    if(this.verifyResetCode.valid){
      this.msgErr='';
     this.msgsuc='';
      this.isLoading=true;
      this.authService.sendVerifycode(this.verifyResetCode.value).subscribe({
       next:(res)=>{
        
         console.log(res);
         setTimeout(() => {
           
           this.msgErr='';
           this.msgsuc='';
           this.step=3;
         }, 1000);
        
         this.isLoading=false;
         this.msgsuc=res.status
      
       },
       error:(err)=>{
         
         console.log(err);
         this.step=2;
         this.isLoading=false;
         this.msgErr=err.error.message;
    
       }
      })
    }

  }
  submitResetNewPassword():void{

    if(this.verifyEmail.valid){
      this.msgErr='';
      this.msgsuc='';
      this.isLoading=true;
      this.authService.sendNewPassword(this.ResetNewPassword.value).subscribe({
       next:(res)=>{
        
         console.log(res);
         setTimeout(() => {
          this.msgErr='';
          this.msgsuc='';
          localStorage.setItem('userData',res.token);
          this.authService.saveUserData();
           this.router.navigate(['/home'])
         }, 400);
        
         this.isLoading=false;
         this.msgsuc="sucssess"
       
    
       },
       error:(err)=>{
         
         console.log(err);
         this.step=3;
         this.isLoading=false;
         this.msgErr=err.error.message;
     
         
       }
       
      })
    }

  }

}

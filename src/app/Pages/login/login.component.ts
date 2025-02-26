import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService=inject(AuthService);
  private readonly router=inject(Router);

  isLoading:boolean=false;


  msgsuc!:string;
  Login:FormGroup=new FormGroup({
    email:new FormControl(null, [Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[A-Z]).{7,}$/)])

  });

  submitForm():void{
    this.getUserToken();
 
 
  }

  getUserToken(){
    if(this.Login.valid){
      this.isLoading=true;
      this.authService.sendLoginForm(this.Login.value).subscribe({
        next:(res)=>{
         if(res.message==="success"){
       
           localStorage.setItem('userData',res.token);  
            this.authService.saveUserData();
           
          setTimeout(() => {
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
      this.Login.markAllAsTouched();
     }
  
  }


}

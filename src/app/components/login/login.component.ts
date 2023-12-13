import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage !:string;
  loading:boolean=false;
  isCodeForm :boolean=true;
  sendToEmail :boolean=false;
  verify :boolean=false;
  ResetPassword :boolean=false;





  constructor( private _AuthService:AuthService,private _Router:Router){

  }

  forgetForm :FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email])
  })

  codeForm :FormGroup = new FormGroup({
    resetCode : new FormControl(null,[Validators.required])
  })


  ResetNewPasswordForm :FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    newPassword : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/)]),

  })


  loginForm :FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]/)]),
  })
/////login 
 loginSubmit(rForm:FormGroup){
    this.loading=true

      this._AuthService.SendLogin(rForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          ////lw eldania tmam go login
          /////1 localstorage token
          /////2 programming routing home
          /////3 savedata auth service
          if (res.message=="success"){
            this._Router.navigate(['/home'])
            localStorage.setItem("userToken",res.token)
            this._AuthService.saveData()

          }
          this.loading=false
        },


        error:(err)=>{
          ///lw eldania msh tamam show error
         this.errorMessage=(err.message)
         this.loading=false
        }
      })
    }


    gotoForget(){
      this.sendToEmail=true
     this. isCodeForm =false;
    }
 /////forget   
 forgetSubmit(rForm:FormGroup){
  this.sendToEmail=false
this.verify=true
console.log("forgitok")
  this._AuthService.SendEmail(rForm.value).subscribe({

    next:(res)=>{
      console.log(res);
     
    },


    error:(err)=>{
      ///lw eldania msh tamam show error
     console.log(err.message)
    }
     })
   }
codeSubmit(rForm:FormGroup){
  this.verify=false
  this.ResetPassword=true
  console.log("codeok")


    this._AuthService.verifyCode(rForm.value).subscribe({
  
  
      next:(res)=>{
        console.log(res)
        
        if (res.status=="Success"){
          this.isCodeForm=false;
       }
       
      },
  
  
      error:(err)=>{
        ///lw eldania msh tamam show error
       this.errorMessage=(err.message)
       console.log(err.message)
      }
       })
  }

  ResetPassSubmit(rForm:FormGroup){
    console.log("resetok")

   this._AuthService.ResetNewPassword(rForm.value).subscribe({
      next:(res)=>{
        console.log(res)
          localStorage.setItem("userToken",res.token)
          this._AuthService.saveData()
          this._Router.navigate(['/home'])
      },
  
  
      error:(err)=>{
        ///lw eldania msh tamam show error
       this.errorMessage=(err.message)
       console.log(err.message)
      }
       })
  }
  


}

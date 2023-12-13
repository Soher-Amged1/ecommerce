import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errorMessage!:string;
  loading:boolean=false;
constructor( private _AuthService:AuthService,private _Router:Router){

}
registerForm :FormGroup = new FormGroup({
    name : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword : new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    phone : new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  },this.validatePassword)

  registerSubmit(rForm:FormGroup):void{
    console.log(rForm.value)
    this.loading=true
    if(rForm.valid===true&& rForm.value!=null){
      
      this._AuthService.SendRegister(rForm.value).subscribe({
        next:(res)=>{
          console.log(res)
          ////lw eldania tmam go login
          /////programming routing
          this._Router.navigate(['/login'])
          this.loading=false
          console.log("result",res)
        },
        error:(err)=>{
           ///lw eldania msh tamam show error
           this.errorMessage=(err.error.message)
           console.log("error",err)
           this.loading=false
        }
      })
    }
   
  }
  validatePassword(g:any){
    return g.get('password').value === g.get('rePassword').value 
    ? null : {'mismatch':true}
  }
}

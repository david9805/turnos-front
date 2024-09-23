import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent {

  user:FormControl = new FormControl(null,[Validators.required]);
  password:FormControl = new FormControl(null,[Validators.required]);

  userForm:FormGroup = new FormGroup({
    user:this.user,
    password:this.password
  });

 

  constructor(private turnosService:TurnosService,
              private snackBarService:SnackbarService,
              private router:Router,
              private variables:VariablesService,
  ){

  }

  ngOnInit(): void {
    this.variables.deleteLocalVaribles();
    
  }

  login(){
    if (this.userForm.invalid){
      this.snackBarService.show('Debe digitar los campos','error');
      return;
    }
    this.turnosService.loginUsuarios(this.userForm.value).subscribe(
      (data:any)=>{        
        if (data.element){     
          localStorage.setItem('data',JSON.stringify(data.element));     
          localStorage.setItem('gran-type',data['grant-type']);
          this.variables.deserializeJson();
          
          this.router.navigate(['/dashboard/user'])
        }
        else{
          this.snackBarService.show('Usurio no existe','error')
        }
      },
      error=>{
        this.snackBarService.show(error.error.message,'error');
      }
    )
  }
}

import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
 
  @Input() label:string = '';
  @Input() typeForm: 'password' | 'text' | 'email' | 'date' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radiobox'  = 'text';
  @Input() controller!:FormControl;
  @Input() isDisabled:boolean = false;
  @Input() placeholder:string = '';
  @Input() dataSelect$: BehaviorSubject<any[]> | null = null; // Observable para dataSelect
  @Input() dataRadioBox:any = [];
  @Input() checked:string='';
  @Input() unchecked:string='';
  @Input() maxlength: any;

  @Input() mask:string='';


  controllerError = new FormControl('');
  private _dataSelect: any[] = []; // Declaración privada

  constructor(private cdr: ChangeDetectorRef){
    
  }


  ngOnInit(): void {
    if (this.dataSelect$ instanceof Subject) {
      this.dataSelect$.subscribe(data => {        
        this._dataSelect = data; // Usar una variable privada
        this.cdr.detectChanges();
      });
    }
  }

  get dataSelect(): any[] {
    return this._dataSelect;
  }

  get statusClass(){   
    if (this.controller){
      if (this.controller.invalid && this.controller.touched){
        return 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-md focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
      }
      else{
        return 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      }  
    }
    else{
      return 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    }
  }

  get labelClass(){
    if (this.controller){
      if (this.controller.invalid && this.controller.touched){
        return 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
      }
      else{
        return 'block text-sm font-medium leading-6 text-gray-900'
      } 
    }
    else{
      return 'block text-sm font-medium leading-6 text-gray-900'
    }  
  }

  get radioClass(){
    if (this.controller){
      if (this.controller.invalid && this.controller.touched){
        return 'w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
      }
      else{
        return 'w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
      } 
    }
    else{
      return 'w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
    } 
  }

  get maskInput(){
    let mask = '';    
    if (this.mask  === 'onlyText'){
      mask = '^[a-zA-Z\\s]*$'
    }
    else if(this.mask  === 'text'){
      mask = '^[a-zA-Z0-9\\s\\W]*$';
    }
    else if(this.mask  === 'textarea'){
      mask = '^[a-zA-Z0-9\\s\\W]*$';
    }
    else if (this.mask  === 'number'){
      mask = '^[0-9-\\s]*$'
    }
    else if (this.mask === 'email'){
      mask = '^[a-zA-Z0-9@._-]+$';
    }
    else if (this.mask === 'password') {
      mask = ''; // No aplicar máscara para campos de contraseña
    }
    return mask;
  }
}

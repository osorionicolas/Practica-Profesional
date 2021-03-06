import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/classes/user';
import { FcmService } from 'src/app/services/FcmService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  validations_form: FormGroup;
  errorMessage: string = '';
  defaultUsers: Array<User> = [];
  user: User;
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private fcm: FcmService,
  ) {}
 
  ngOnInit() {
    this.addDefaultUser();
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
 
 
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  addDefaultUser(){
    this.defaultUsers.push({"id":1, "email":"admin@admin.com", "password":"111111", "perfil":"admin", "sexo":"femenino"});
    this.defaultUsers.push({"id":2, "email":"invitado@invitado.com", "password":"222222", "perfil":"invitado", "sexo":"femenino"});
    this.defaultUsers.push({"id":3, "email":"usuario@usuario.com", "password":"333333", "perfil":"usuario", "sexo":"masculino"});
    this.defaultUsers.push({"id":4, "email":"anonimo@anonimo.com", "password":"444444", "perfil":"usuario", "sexo":"masculino"});
    this.defaultUsers.push({"id":5, "email":"tester@tester.com", "password":"555555", "perfil":"tester","sexo": "femenino"});
    this.defaultUsers.push(new User("nosorio@utn.com","nosorio"));
  }

  setDefaultUser(){
    this.loginUser(this.user);
  }
 
 
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.fcm.getToken();
      this.navCtrl.navigateForward('/dashboard');
    }, err => {
      this.errorMessage = err.message;
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }
 
}
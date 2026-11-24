
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent  implements OnInit {
//   username: string = '';
//   courseName: string = '';

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     // קבלת השם מהקישור בין הקומפוננטות
//     this.route.queryParams.subscribe(params => {
//       this.username = params['username'] || '';
//     });
//   }

//   register(): void {
//     // בדוק אם המשתמש כבר קיים (לדוג', בבדיקה צד שרת)
//     const userExists = this.checkIfUserExists(this.username);

//     if (userExists) {
//       // המשתמש כבר קיים - הצג הודעה מתאימה
//       Swal.fire('Error', 'User already exists. Please choose a different username.', 'error');
//     } else {
//       // הרשמה הצליחה - מועבר לדף הקורסים
//       Swal.fire('Success', 'Registration successful! Redirecting to courses page...', 'success');
//       // כאן יש לממש ניווט לדף הקורסים
//     }
//   }

//   private checkIfUserExists(username: string): boolean {
//     // פונקציה זו תבדוק בצד השרת אם המשתמש קיים
//     // אם יש מערכת אימות, יש להשתמש בה
//     // כאן אני מייצג פשוט את הלוגיקה
//     const existingUsers = ['user1', 'user2', 'user3'];
//     return existingUsers.includes(username);
//   }
// }
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  courseName: string = '';

  private _user!: User;

  id?: number;
  public get user(): User {
    //  if(this._student)
    //     return this._student;
    //this._student=new Student();
    return this._user;
  }

  @Input()
  public set user(value: User) {
    this._user = value;
    if (this._user != undefined) {
      this.userForm = new FormGroup({
        "id": new FormControl(this.user.id),
        "name": new FormControl(this.user.name, [Validators.required, Validators.minLength(3)]),
        "address": new FormControl(this.user.address),
        "email": new FormControl(this.user.email, [Validators.required, Validators.maxLength(20)]),
        "password": new FormControl(this.user.password, Validators.required)
      });
    }
  }

  userForm: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // קבלת השם מהקישור בין הקומפוננטות
    // this.route.queryParams.subscribe(params => {
    //   this.username = params['username'] || '';
    // });
  }

}
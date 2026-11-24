
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  users: User[] = []

  constructor(private router: Router, private userService: UserService) {}

  login(): void {
    const userExists = this.checkIfUserExists();
    const correctPassword = this.checkPassword(this.username, this.password);

    if (userExists && correctPassword) {
      Swal.fire('Success', 'Login successful! Redirecting to courses page...', 'success');
      //באן צריך לשמור את הנתונים ל- sessionStorg
      this.router.navigate(['/courses']);
    } else if (userExists && !correctPassword) {
      Swal.fire('Error', 'Incorrect password. Please try again.', 'error');
    } else {
      Swal.fire('Error', 'User does not exist. Redirecting to registration...', 'error');
      this.router.navigate(['/register'], { queryParams: { username: this.username } });
    }
  }

  private checkIfUserExists(): boolean {
    const user = this.users.find(x => x.name.toLowerCase() == this.username.toLowerCase());
    if (user)
      return true
    return false
  }

  private checkPassword(username: string, password: string): boolean {
    const user = this.users.find(x => x.name.toLowerCase() == username.toLowerCase());
    return password === user?.password;
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.users = data;
    })
  }
}

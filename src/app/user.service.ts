import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./models/user.model";

@Injectable({
    providedIn:'root'
})
export class UserService {

    //public Users: User[] = [] 

   
    getUser(): Observable<User[]> {
        return this._http.get<User[]>("/api/Users")
    }
    getByIdUser(id: number): Observable<User> {
        return this._http.get<User>("/api/Users/"+ id)
    }

    postUser(user: User): Observable<any> {
        return this._http.post<any>("api/Users", user)
    }
    // updateStudent(student: User): Observable<boolean> {
    //     console.log("aaaaa", student);
    //     student.isActive = Boolean(student.isActive);
    //     return this._http.put<boolean>(`api/Students/${student.id}`, student);
    // }
    // deleteStudent(id: number): Observable<boolean> {
    //     return this._http.delete<boolean>("api/Students/" + id);
    // }
 
    constructor(private _http: HttpClient) {
    }
}
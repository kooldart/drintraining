import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs';
import {UserModel} from './user.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseApi: string = 'https://salty-crag-12236.herokuapp.com';

  private apiUrl: string = this.baseApi + '/users';

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  createUser(usr): Observable<UserModel>{
    console.log("Created New User: ", usr);
    return this.http.post<UserModel>(this.baseApi + '/users', usr);
  }

  editUser(usr, id): Observable<UserModel>{
    return this.http.put<UserModel>(this.apiUrl + '/' + id, usr); 
  }

  deleteUser(usr): Observable<any> {
    console.log("Deleting: ", usr);
    return this.http.delete(this.apiUrl + '/' + usr.id);
  }

  getUser(id): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + '/' + id);
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }
}

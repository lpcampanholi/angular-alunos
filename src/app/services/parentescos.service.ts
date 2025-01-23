import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parentesco } from '../../types/parentesco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentescosService {

  private api = 'http://localhost:3000/parentescos';

  constructor(private http: HttpClient) { }

  listarParentescos(): Observable<Parentesco[]> {
    return this.http.get<Parentesco[]>(this.api);
  }

  criarParentesco(parentesco: Parentesco): Observable<Parentesco> {
    return this.http.post<Parentesco>(this.api, parentesco);
  }

}

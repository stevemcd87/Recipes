import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IPost} from './interface';

@Injectable()
export class PostService {
  private postsUrl = 'api/posts';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postsUrl)
      .pipe(
        tap(_ => console.log('fetched Posts')),
        catchError(this.handleError<IPost[]>('getPosts', []))
      );
  }

    /** GET hero by id. Will 404 if id not found */
  getPost(id: number): Observable<IPost> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<IPost>(url).pipe(
      tap(_ => console.log(`fetched post id=${id}`)),
      catchError(this.handleError<IPost>(`getPost id=${id}`))
    );
  }

  // getLottoGameOption(game: string, option: string): Observable<ILotto[] | IWinningHistory[] | IComparedLotto[]> {
  //   const url = `${this.nodeEndPoint}/lotto-games/${game}/${option}`
  //   return this.http.get<ILotto[] | IWinningHistory[] | IComparedLotto[]>(url)
  //     .pipe(
  //       tap(_ => console.log(`fetched Lotto Game option: ${option}`)),
  //       catchError(this.handleError<ILotto[] | IWinningHistory[] | IComparedLotto[]>(`getLottoGameOption game=${game} option=${option}`))
  //     );
  // }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

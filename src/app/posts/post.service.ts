import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IPost, IRecipe} from '../interface';

@Injectable()
export class PostService {
  private postsUrl = 'api/posts';
  private recipeUrl = 'api/recipes';  // URL to web api
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

  // getRecipes(): Observable<IRecipe[]> {
  //   return this.http.get<IRecipe[]>(this.recipeUrl)
  //     .pipe(
  //       tap(_ => console.log('fetched Recipes')),
  //       catchError(this.handleError<IRecipe[]>('getRecipes', []))
  //     );
  // }

    /** GET Post by id. Will 404 if id not found */
  getPost(id: number): Observable<IPost> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<IPost>(url).pipe(
      tap(_ => console.log(`fetched post id=${id}`)),
      catchError(this.handleError<IPost>(`getPost id=${id}`))
    );
  }

    /** POST: add a new Post to the server */
  addPost (post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.postsUrl, post, this.httpOptions).pipe(
      tap((newPost: IPost) => console.info(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<IPost>('addPost'))
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

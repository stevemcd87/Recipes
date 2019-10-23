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

    /** GET Post by id. Will 404 if id not found */
  getPost(id: number): Observable<IPost> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<IPost>(url).pipe(
      tap(_ => console.log(`fetched post id=${id}`)),
      catchError(this.handleError<IPost>(`getPost id=${id}`))
    );
  }

    /** PUT: update the post on the server */
  updatePost (post: IPost): Observable<any> {
    console.log(post);
    return this.http.put(this.postsUrl, post, this.httpOptions).pipe(
      tap(_ => console.log(`updated post id=${post.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

    /** POST: add a new Post to the server */
  addPost (post: IPost): Observable<IPost> {
    return this.http.post<IPost>(this.postsUrl, post, this.httpOptions).pipe(
      tap((newPost: IPost) => console.info(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<IPost>('addPost'))
    );
  }

  /** DELETE: delete the post from the server */
  deletePost (post: IPost): Observable<IPost> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.delete<IPost>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${post.id}`)),
      catchError(this.handleError<IPost>('deletePost'))
    );
  }


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

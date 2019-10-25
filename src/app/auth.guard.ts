import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
// import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PostService } from './posts/post.service';
import { tap } from 'rxjs/operators';
import { IPost} from './interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // user;
  // post: IPost;
  constructor(
    private auth: AuthService,
    private ps: PostService,
    private router: Router,
  ) {}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
      return this.auth.isAuthenticated$.pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.auth.login(state.url);
          } else {
            const url = state.url.split("/");
            if (url[url.length-1] === "edit") {
              const postId = url[2];
              this.auth.userProfile$.subscribe(user=>{
                // thiuser = user;
                this.getPost(user, postId);
              })
            }
          }
        })
      );
    }

    getPost(user,postId) {
      this.ps.getPost(+postId)
        .subscribe((data: IPost) => {
          const post = data;
          if(user.email !== post.userEmail) this.router.navigate(['/posts', postId])
        }, error => {
          console.error('Error in getting  post');
        });
    }

}

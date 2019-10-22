import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { PostListComponent } from './posts/post-list/post-list.component';
const routes: Routes = [
    {
       path: 'home',
       component: HomeComponent
     },
    {
      path: 'callback',
      component: CallbackComponent
    }, {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    //  {
    //   path: 'posts',
    //   component: PostListComponent
    // },
    //  {
    //   path: 'posts/:id',
    //   component: PostDetailComponent
    // },
     {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },{
      path: '**',
      component: PageNotFoundComponent
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

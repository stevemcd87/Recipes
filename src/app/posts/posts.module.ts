import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { IphoneComponent } from './iphone/iphone.component';
import { NavbarComponent } from '../navbar/navbar.component';
// import { AppComponent } from '../app.component';
@NgModule({
  declarations: [
    PostListComponent,
    PostAddComponent,
    PostDetailComponent,
    IphoneComponent,
    NavbarComponent
    // AppComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ],
  exports: [NavbarComponent]
})
export class PostsModule { }

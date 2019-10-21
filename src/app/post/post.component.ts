import { Component, OnInit,  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from './post.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';
import { IPost, IRecipe} from '../interface';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    user = this.auth.userProfile$ ;
    posts: IPost[];
    recipes: IRecipe[];
    postForm = this.fb.group({
      dishName: ['', Validators.required],
      ingredients: this.fb.array([
        this.fb.group({
          ingredient: this.fb.control(''),
          amount: this.fb.control('')
        })
      ]),
      directions: this.fb.array([
        this.fb.control('')
      ])
    });
    phonePost: IPost;
  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  // {
  //   "given_name": "Stephen",
  //   "family_name": "McDonald",
  //   "nickname": "stephenmcdonald8787",
  //   "name": "Stephen McDonald",
  //   "picture": "https://lh6.googleusercontent.com/-XZlWad7g3ao/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdk__b9LGXRme6pahIJO-SraGzMGw/photo.jpg",
  //   "locale": "en",
  //   "updated_at": "2019-10-20T06:45:40.831Z",
  //   "email": "stephenmcdonald8787@gmail.com",
  //   "email_verified": true,
  //   "sub": "google-oauth2|101678336332569181269"
  // }

  ngOnInit(  ) {
    this.showPosts();
    this.showRecipes()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPosts();
        this.showRecipes()
        console.log(this.recipes)
      }
    });
    this.postFormChanges();
  }

  postFormChanges():void {
    let profile = this.auth.userProfile$
    if (profile) {
      profile.subscribe(val=>{
      console.log(val)
      })
    }
    this.ingredients.valueChanges.subscribe(val=>{


    })
  }




  showPosts(): void {
    this.ps.getPosts().subscribe(posts => this.posts = posts);
  }

  showRecipes(): void {
    this.ps.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  get ingredients() {
    return this.postForm.get('ingredients') as FormArray;
  }

  get directions() {
    return this.postForm.get('directions') as FormArray;
  }

  // get profile() {
  //
  //   return ()
  // }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      ingredient: this.fb.control(''),
      amount:  this.fb.control('')
    }));
  }


  addDirection() {
    this.directions.push(this.fb.control(''));
  }

  addPost(): void {
      let profile = {userEmail:'efwec@fver.com', userName:'sytvweg'};
    console.log(this.auth)
    this.ps.addPost({...profile, ...this.postForm.value } as IPost)
      .subscribe(post => {
        this.posts.push(post);
        console.log('postd');
        console.log(this.posts);
      });
  }

  onSubmit() {
    let profile = {userEmail:'efwec@fver.com', userName:'sytvweg'};
    // TODO: Use EventEmitter with form value
    this.addPost()
    console.warn({...profile, ...this.postForm.value } );
  }
}

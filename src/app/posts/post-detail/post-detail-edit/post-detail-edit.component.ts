import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from '../../post.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray, FormGroup} from '@angular/forms';
import { IPost} from '../../../interface';
@Component({
  selector: 'app-post-detail-edit',
  templateUrl: './post-detail-edit.component.html',
  styleUrls: ['./post-detail-edit.component.scss']
})
export class PostDetailEditComponent implements OnInit {
  post: IPost;
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
  constructor(
    private auth: AuthService,
    private ps: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.showPost();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showPost();
      }
    })
  }

  showPost() {
    const post = this.route.snapshot.parent.paramMap.get('id');
    this.ps.getPost(+post)
      .subscribe((data: IPost) => {
        this.post = data;
        console.log(this.post);
        this.postForm = this.fb.group({
          dishName: [this.post.dishName, Validators.required],
          ingredients: this.fb.array(this.ingredientsFormArray),
          directions: this.fb.array(this.directionsFormArray)
        });
      }, error => {
        console.error('Error in getting  post');
      });
    }

  save(): void {
    const post = {...this.post, ...this.postForm.value};
     this.ps.updatePost(post)
       .subscribe((val)=>{
         this.router.navigate(['/posts',post.id])
       });
   }

   get ingredientsFormArray(){
     return (
       this.post.ingredients.map((ingredient)=>{
         return (
            this.fb.group({
             ingredient: this.fb.control(ingredient.ingredient),
             amount: this.fb.control(ingredient.amount)
           })
         ) as FormGroup
       })
     )
   }

   get directionsFormArray(){
     return this.post.directions.map(direction=> this.fb.control(direction))
   }


  get ingredients() {
    return this.postForm.get('ingredients') as FormArray;
  }

  get directions() {
    return this.postForm.get('directions') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      ingredient: this.fb.control(''),
      amount:  this.fb.control('')
    }));
  }


  addDirection() {
    this.directions.push(this.fb.control(''));
  }



}

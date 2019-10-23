import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { PostService } from '../../post.service';
import { Validators } from '@angular/forms';
import { FormBuilder, FormArray, FormGroup, FormControl} from '@angular/forms';
import { IPost} from '../../../interface';
@Component({
  selector: 'app-post-detail-edit',
  templateUrl: './post-detail-edit.component.html',
  styleUrls: ['./post-detail-edit.component.scss']
})
export class PostDetailEditComponent implements OnInit {
  post: IPost;
  postForm = this.fb.group({
    dishName: [''],
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
          dishName: [this.post.dishName, this.basicFormValidations()],
          ingredients: this.fb.array(this.ingredientsFormArray),
          directions: this.fb.array(this.directionsFormArray)
        });
      }, error => {
        console.error('Error in getting  post');
      });
    }

    basicFormValidations(){
      return [
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(2)
      ]
    }

  save(): void {
    const post = {...this.post, ...this.postForm.value};
    if (this.postForm.valid) {
      this.ps.updatePost(post)
        .subscribe((val)=>{
          this.router.navigate(['/posts',post.id])
        });
    } else {
      alert('Form is not valid')
    }

   }

   get dishName() {return this.postForm.get('dishName');}

   get ingredientsFormArray(){
     return (
       this.post.ingredients.map((ingredient)=>{
         return (
            this.fb.group({
             ingredient: this.fb.control(ingredient.ingredient,  this.basicFormValidations()),
             amount: this.fb.control(ingredient.amount,  this.basicFormValidations())
           })
         ) as FormGroup
       })
     )
   }

  get ingredients() {
    return this.postForm.get('ingredients') as FormArray;
  }

  ingredient(index) {
    return this.ingredients.controls[index].get('ingredient')
  }

  amount(index) {
    return this.ingredients.controls[index].get('amount')
  }

  get directionsFormArray(){
    return this.post.directions.map(direction=> this.fb.control(direction,  this.basicFormValidations()))
  }

  get directions() {
    return this.postForm.get('directions') as FormArray;
  }

  direction(index) {
    return this.directions.controls[index]
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

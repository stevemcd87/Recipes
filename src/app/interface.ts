export interface IPost {
  id?: number,
  userEmail?:string,
  userPicture?:string,
  userName?:string,
  dishName?: string,
  ingredients?: IIngredient[],
  directions?: string[]
}

export interface IIngredient {
  ingredient?: string,
  amount?: string
}

// export interface IPost {
//   id: number,
//   userEmail:string,
//   userName:string,
//   recipe?: IRecipe
// }

export interface IRecipe {
  id: number,
  postId: number,
  dishName?: string,
  ingredients?: IIngredient[],
  directions?: string[]
}

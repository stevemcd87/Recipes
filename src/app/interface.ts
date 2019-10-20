export interface IPost {
  id: number,
  userEmail:string,
  userName:string,
  dishName?: string,
  ingredients?: IIngredient[],
  directions?: string[]
}

export interface IIngredient {
  ingredient?: string,
  amount?: string
}

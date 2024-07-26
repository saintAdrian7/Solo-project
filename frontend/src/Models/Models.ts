export type User = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    image:string,
    role: 'ADMIN' | 'USER'
    products: Product[],
    orders: Order[],
    cart: Product[]
}

export interface LoginUserPayload {
    email: string,
    password: string
}

export interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    role: 'ADMIN'| 'USER'
    email: string;
    password: string;
    image: string
    
}

export interface FetchUserPayload{
    userId:string,
    property:'loggedInUser' | 'profileUser'
}

export interface Order  {
    _id:string
    user: User
    products: {
      product:Product;
      quantity: number;
    }[];
    totalAmount: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  }

  export interface Product {
    _id?:string
    Name:string,
    Description:string,
    DiscountedPrice:number,
    CashPrice:number,
    Category: 'Electronics'|'Fashion'|'Home'|'Books'|'Sports'|'Beauty'|'Toys'|'Groceries'|'Automotive'|'Health',
    Seller:string,
    Image:string[],
    Rating:number,
    reviews:ReviewData[]

}

export interface ProductPayload {
    Name:string,
    Description:string,
    DiscountedPrice?:string,
    CashPrice:string,
    Category: string,
    Seller:string | undefined,
    Image:string[],
    Rating?:number,
    Reviews?:string
}

export interface ReviewData {
    _id:string
    user: User;
    product: string;
    rating: number;
    comment: string;
    createdAt:Date;
  }
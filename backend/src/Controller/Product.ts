import { Request, Response } from "express";
import recommendProducts, { createProduct, deleteProduct, getAllProducts, getMostPopularProducts, getOneProduct, getProductsByCategory, getRecentlyAddedProducts, handleSearchQuery, updateProduct } from "../Services/Product";
import { IProduct } from "../models/ProductModel";
import { searchParams } from "../Interfaces/Product";


export async function PostProduct (req:Request, res:Response){
    const product = req.body
    try {
        const createdProduct = await createProduct(product);
        res.status(200).json({
          message: 'Product created successfully',
          createdProduct: {
            _id: createdProduct._id,
            Name: createdProduct.Name,
            price: createdProduct.price,
            Description: createdProduct.description,
            image: createdProduct.image,
            DiscountedPrice: createdProduct.DiscountedPrice,
            CashPrice: createdProduct.CashPrice,
            Category: createdProduct.Category,
            Seller: createdProduct.Seller,
            Image: createdProduct.image,
            Rating: createdProduct.Rating,
            Reviews: createdProduct.Reviews
          }
        });
      } catch (error: any) {
        res.status(500).json({ message: 'Unable to create product at this time', error: error.message });
      }
    }
    
    export async function GetAllProducts(req: Request, res: Response) {
      try {
        const products = await getAllProducts();
        const formattedProducts = products.map((product: IProduct) => ({
          _id: product._id,
          Name: product.Name,
          price: product.price,
          Description: product.description,
          DiscountedPrice: product.DiscountedPrice,
          CashPrice: product.CashPrice,
          Category: product.Category,
          Seller: product.Seller,
          Image: product.image,
          Rating: product.Rating,
          Reviews: product.Reviews
        }));
        res.status(200).json({ message: 'Retrieved products successfully', products});
      } catch (error: any) {
        res.status(500).json({ message: 'Unable to get products at this time', error: error.message });
      }
    }
export async function GetProduct (req:Request, res:Response){
    const id = req.params.id
    try{
        if(!id){
            return res.status(400).json({message:"Product id is required"})
        }
        const product = await getOneProduct(id)
        if(!product){
            res.status(404).json({message:"Product with that id was no found"})
        }else{
            res.status(200).json({message:"Product retrived successfully", product})
        }

    }catch(error:any){
        res.status(500).json({message:"unable tor retrive product at this time", error: error.message})

    }
}

export async function UpdateProduct(req:Request, res:Response){
    const id = req.params.id
    const updateData = req.body
    try{
        if(!id){
            return res.status(400).json({message:"Product id is required to update"})
        }
        const updatedProduct = await updateProduct(id, updateData)
        if(!updatedProduct){
          res.status(404).json({message:"The product with the id was not found"})
        }else{
            res.status(200).json({message:"Product successfully updated", updatedProduct})
        }

    }catch(error:any){
        res.status(500).json({message:"Unable to update product at this time",error: error.message})

    }
}

export async function DeleteProduct(req:Request, res:Response){
    const id = req.params.id
    try{
        if(!id){
            return res.status(400).json({message:'Product id is required to delete product'})
        }
        const deletedProduct = await deleteProduct(id)
        if(!deletedProduct){
            res.status(404).json({message:"The product with that id was not found"})
        }else{
            res.status(200).json({message:"Successfuly deleted the product"})
        }

    }catch(error:any){
         res.status(500).json({message:"Unable to delete Product at this time", error: error.message})
    }
}


export async function GetProductsByCategory(req: Request, res: Response) {
  const category  = req.params.category
  try {
    const products = await getProductsByCategory(category);
    res.status(200).json({ message: "Retrieved products successfully", products });
  } catch (error: any) {
    res.status(500).json({ message: "Unable to get products at this time", error: error.message });
  }
}


export async function GetMostPopularProducts(req: Request, res: Response) {
  try {
      const products = await getMostPopularProducts();
      res.status(200).json({ message: "Retrieved most popular products successfully", products });
  } catch (error: any) {
      res.status(500).json({ message: "Unable to get products at this time", error: error.message });
  }
}


export async function GetRecentlyAddedProducts(req: Request, res: Response) {
  try {
      const products = await getRecentlyAddedProducts();
      res.status(200).json({ message: "Retrieved recently added products successfully", products });
  } catch (error: any) {
      res.status(500).json({ message: "Unable to get products at this time", error: error.message });
  }
}

export async function HandleSearchProducts(req:Request, res:Response) {
  const searchParams:searchParams = req.query

  
  try{
    const products = await handleSearchQuery(searchParams)
    if(products){
      res.status(200).json({message:"Retrieved products successfully", products})
    }else{
      res.status(404).json({message:"No products found"})
    }

  }catch(error:any){
    res.status(500).json({message:"Unable to search products at this time", error:error.messsage})
  }
}

export async function GetUserReccomendations(req:Request, res:Response) {
  const userId = req.params.userId
  try{
    const products = await recommendProducts(userId)
    res.status(200).json({message:"Retrieved user recomendations successfully", products})

  }catch(error:any){
    res.status(500).json({message:"Unable to get user recomendations at this time",})
  }
}
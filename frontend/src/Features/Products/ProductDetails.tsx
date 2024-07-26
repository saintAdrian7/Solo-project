import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, Divider, CircularProgress, Alert, Button, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import { Product } from '../../Models/Models';
import AddToCart from './AddToCart';
import ReviewForm from './ReviewForm';
import { FetchProductsByCategory } from '../../context/ProductContext/ProductContextActions';
import { useProduct } from '../../context/ProductContext/ProductContextConsts';
import ProductCard from './ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [similarProducts, setSimilarProducts] = useState<Product [] | null>(null)
  const {dispatch} = useProduct()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/product/${id}`);
        setProduct(response.data.product);
        const fetchSimilarProducts = async () => {
          const products = await FetchProductsByCategory(dispatch, product?.Category as string)
          setSimilarProducts(products)
        }
        fetchSimilarProducts()
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
 

    fetchProduct();
  }, [id, dispatch, product?.Category]);



  const calculateRatings = () => {
    if (!product || !product.reviews || product.reviews.length === 0) {
      return "No ratings yet"; 
    }
  
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / product.reviews.length
  };
  

  if (loading) return <CircularProgress sx={{ position: 'absolute', left: '50%', top: '50%' }} />;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!product) return <Typography>No product found.</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#ecf0f1', textTransform: 'uppercase', letterSpacing: '2px', backgroundColor: '#34495e', border: '2px solid #c0392b', borderRadius: '8px', padding: '10px 15px', display: 'inline-block', fontFamily: '"Roboto", sans-serif', textAlign: 'center', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.6)', transform: 'rotate(2deg)', transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: '#2c3e50', color: '#e74c3c', borderColor: '#e74c3c', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', transform: 'rotate(-2deg)', } }}>
          {product.Name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia component="div" sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd', }}>
                <Carousel interval={5000} indicators={false} animation="slide" sx={{ width: '100%', height: '100%' }}>
                  {product.Image.map((img, index) => (
                    <CardMedia component="img" key={index} image={img} alt={`Product image ${index}`} sx={{ height: '100%', objectFit: 'contain' }} />
                  ))}
                </Carousel>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom>Product Images</Typography>
                <Grid container spacing={2}>
                  {product.Image.map((img, index) => (
                    <Grid item xs={4} key={index}>
                      <CardMedia component="img" image={img} alt={`product ${index}`} sx={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 1, boxShadow: 1, cursor: 'pointer', '&:hover': { boxShadow: 3, }, }} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>Price</Typography>
              <Box sx={{ mb: 2 }}>
                {product.CashPrice && (
                  <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', mr: 1 }}>
                    ${product.CashPrice}
                  </Typography>
                )}
                <Typography variant="h6" color="primary">${product.DiscountedPrice}</Typography>
              </Box>
             
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">Ratings:{calculateRatings()}</Typography>
                </Box>
             
              <Typography variant="body1" paragraph>{product.Description}</Typography>
              <AddToCart productId={product._id} />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" size="large">Add to Wishlist</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" onClick={() => setShowReviews(!showReviews)}>
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </Button>
        </Box>
        {showReviews && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Reviews</Typography>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <Box key={review._id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
                  <Avatar src={review.user.image} alt={review.user.firstName} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{[review.user.firstName,'', review.user.lastName]}</Typography>
                    <Typography variant="body2">{review.comment}</Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No reviews yet.</Typography>
            )}
          </Box>
        )}
      </Box>
      <ReviewForm productId={product._id} onReviewSubmit={() => setProduct({ ...product })} />
        
          <Typography sx={{fontFamily:'Inder', mt:'30', fontSize:'1.5rem', fontWeight:'600', textAlign:'center'}} variant="h6" gutterBottom>Similar Products</Typography>
          <Grid container spacing={2}>
            {similarProducts?.map((product) => (
              <Grid item key={product._id}xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}

          </Grid>

    </Container>
  );
};

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, MenuItem, Select, Divider, Alert, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import ProductCard from './ProductCard'; 
import { FetchAllProducts, FetchMostPopularProducts, FetchProductsByCategory} from '../../context/ProductContext/ProductContextActions';
import { useProduct } from '../../context/ProductContext/ProductContextConsts';
import { Product } from '../../Models/Models';
import SearchComponent from './Search';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';

const StyledContainer = styled(Container)({
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

const StyledSelect = styled(Select)({
  marginBottom: '1rem',
});

const ProductCategory: React.FC = () => {
  const [category, setCategory] = useState<string>('All');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { productState, dispatch } = useProduct();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const {state} = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (category === 'All') {
          await FetchAllProducts(dispatch);
          const popularProductsData = await FetchMostPopularProducts(dispatch);
          setPopularProducts(popularProductsData);
        } else {
          await FetchProductsByCategory(dispatch, category);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRecommendedProducts = async () => {
      try{
        const response = await axios.get(`http://localhost:5000/api/products/recommendations/${state.loggedInUser?._id}`)
        setRecommendedProducts(response.data.products)
      }catch(error){
        console.log(error);
        

      }
    }

    fetchProducts();
    if(state.loggedInUser){
      fetchRecommendedProducts()
    }
  
  }, [category, state.loggedInUser, dispatch]);

  if (productState.loading) return  (
   <Box  sx={{ position: 'absolute', left: '25%', top: '40%' }}>
     <Typography variant='h4' sx={{fontFamily:'Inder'}}>
      Loading Products....Please Wait
     </Typography>
   </Box>
  )

  if (productState.error) {
    return (
      <StyledContainer maxWidth="lg">
        <Alert sx={{ position: 'absolute', left: '30%', top: '40%' }} severity="error">
          Unable to retrieve products at this time. Please try again later.
        </Alert>
      </StyledContainer>
    );
  }

  if (!productState.products || productState.products.length === 0) {
    return (
      <StyledContainer maxWidth="lg">
        <Typography>No products available.</Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <StyledSelect
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
          fullWidth
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Fashion">Fashion</MenuItem>
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Books">Books</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Beauty">Beauty</MenuItem>
          <MenuItem value="Toys">Toys</MenuItem>
          <MenuItem value="Groceries">Groceries</MenuItem>
          <MenuItem value="Automotive">Automotive</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
        </StyledSelect>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowSearch(!showSearch)}
          sx={{ mb: 2 }}
        >
          {showSearch ? 'Hide Search' : 'Search Products'}
        </Button>
      </Box>

      {showSearch && <SearchComponent />}

      {category === 'All' && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>
            Most Popular
          </Typography>
          <Grid container spacing={2}>
            {popularProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />
          {state.loggedInUser && (
  <>
    <Typography sx={{ fontFamily: 'Inder' }} variant="h5" gutterBottom>
      Recommended Products
    </Typography>
    <Grid container spacing={2}>
      {recommendedProducts.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  </>
)}

        </>
      )}

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        {category} Products
      </Typography>
      <Grid container spacing={2}>
        {productState.products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default ProductCategory;

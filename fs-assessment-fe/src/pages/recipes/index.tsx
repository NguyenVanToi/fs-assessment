import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { Box, Card, CardContent, CardMedia, Chip, CircularProgress, Container, Grid2, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ICategory, IProduct, IResponse } from "@/lib/interface";
import { GetServerSidePropsContext } from "next";

type RecipesPageProps = {
  categoriesData: IResponse<ICategory[]>;
  productsData: IResponse<IProduct[]>;
  selectedCategoryIds: string;
}

export default function RecipesPage({ categoriesData, productsData, selectedCategoryIds }: RecipesPageProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCategoryIds) {
      const listCategories = selectedCategoryIds.split(',');
      if (categoriesData.data && listCategories && listCategories.length > 0) {
        const results = categoriesData.data.filter(cate => listCategories.includes(cate.id.toString()));
        setSelectedCategories(results);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { categories, ...rest } = router.query;
      router.replace(
        {
          pathname: router.pathname,
          query: rest,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [selectedCategoryIds, categoriesData]);

  useEffect(() => {
    if (categoriesData.count) {
      setCategories(categoriesData.data)
    }
    if (productsData.count) {
      setProducts(productsData.data)
    }
  }, [categoriesData, productsData])

  const getProductByCategories = async (categories?: ICategory[]) => {
    try {
      let endpoint = "/api/products";
      if (categories && categories.length > 0) {
        endpoint += `?categories=${categories.map(cate => cate.id).join(',')}`
      }
      const response = await fetch(endpoint);
      const responseJSON: IResponse<IProduct[]> = await response.json();
      setProducts(responseJSON.data);
    } catch (e) {
      console.log('Error while getting pokemon data by types :>> ', e);
    }
  }

  const goToDetail = (product: IProduct) => {
    router.push(`/recipes/${product.slug}`);
  }

  const handleSelectCategory = (category: ICategory) => {
    let _selectedCategories = [...selectedCategories];
    if (_selectedCategories.some(cate => cate.id === category.id)) {
      _selectedCategories = _selectedCategories.filter(item => item.id !== category.id);
    } else {
      _selectedCategories.push(category);
    }

    setSelectedCategories(_selectedCategories);
    getProductByCategories(_selectedCategories);
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ mb: 1 }}>
        Category List
      </Typography>
      {categories.map((category) => (
        <Chip
          key={`category_${category.id}`}
          label={category.name}
          onClick={() => handleSelectCategory(category)}
          color={`${selectedCategories.some(cate => cate.id === category.id) ? 'primary' : 'default'}`}
          variant={`${selectedCategories.some(cate => cate.id === category.id) ? 'filled' : 'outlined'}`}
          sx={{
            mr: 2,
            mb: 1,
            '&:hover': {
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main
            }
          }}
        />
      ))}
      {
        products && products.length > 0 ? (
          <Grid2 container spacing={2} sx={{ mt: 4 }}>
            {products.map((product) => (
              <Grid2 key={product.id} sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
                <Card
                  variant="outlined"
                  onClick={() => goToDetail(product)}
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/assets/images/${product.image || 'default.jpg'}`}
                    alt={product.title}
                  />
                  <CardContent sx={{padding: 1}}>
                    <Typography variant="subtitle1">{product.title}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        ) : (
          <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <HourglassEmptyIcon sx={{ fontSize: 80, color: 'gray.500', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No Content Available
              </Typography>
            </Box>
          </Container>
        )
      }
    </Container>
  )
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const categoryIds = query.categories ? query.categories : null;
  const response = await Promise.all([
    fetch(`${process.env.API_URL}/api/categories`),
    fetch(`${process.env.API_URL}/api/products${categoryIds ? '?categories=' + categoryIds : ''}`)
  ])
  const categoriesData: IResponse<ICategory[]> = await response[0].json();
  const productsData: IResponse<IProduct[]> = await response[1].json();

  return {
    props: {
      categoriesData: categoriesData || null,
      productsData: productsData || null,
      selectedCategoryIds: categoryIds
    }
  }
}
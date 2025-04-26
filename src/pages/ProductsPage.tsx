import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, ArrowUpDown, Grid, List, Search, X } from 'lucide-react';
import { products, Product } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(queryParams.get('category') || '');
  const [subcategoryFilter, setSubcategoryFilter] = useState(queryParams.get('subcategory') || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  
  // Get unique categories and subcategories
  const categories = Array.from(new Set(products.map(p => p.category)));
  const subcategories = Array.from(
    new Set(products.filter(p => p.subcategory).map(p => p.subcategory))
  ).filter(Boolean) as string[];
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }
    
    // Apply subcategory filter
    if (subcategoryFilter) {
      result = result.filter(p => p.subcategory === subcategoryFilter);
    }
    
    // Apply price range filter
    result = result.filter(
      p => 
        (p.discountedPrice || p.price) >= priceRange.min && 
        (p.discountedPrice || p.price) <= priceRange.max
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => 
          (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
        );
        break;
      case 'price-high-low':
        result.sort((a, b) => 
          (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
        );
        break;
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default: // 'featured' - bestsellers first
        result.sort((a, b) => (a.isBestseller === b.isBestseller ? 0 : a.isBestseller ? -1 : 1));
    }
    
    setFilteredProducts(result);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (categoryFilter) params.set('category', categoryFilter);
    if (subcategoryFilter) params.set('subcategory', subcategoryFilter);
    navigate({ search: params.toString() }, { replace: true });
  }, [
    searchTerm,
    categoryFilter,
    subcategoryFilter,
    priceRange,
    sortBy,
    navigate
  ]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setSubcategoryFilter('');
    setPriceRange({ min: 0, max: 100 });
    setSortBy('featured');
    navigate({ search: '' }, { replace: true });
  };
  
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };
  
  return (
    <div className="bg-neutral-50 pb-16">
      {/* Page header */}
      <div className="bg-primary-500 text-white py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-primary-100">Find everything you need for your garden</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top controls - mobile filter toggle, search, view toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMobileFilters}
              className="md:hidden flex items-center gap-1 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-neutral-700"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full md:w-60 pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-neutral-500" size={18} />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-white border border-neutral-300 rounded-lg p-1">
              <button
                className={`p-1.5 rounded-md ${isGridView ? 'bg-primary-500 text-white' : 'text-neutral-500'}`}
                onClick={() => setIsGridView(true)}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                className={`p-1.5 rounded-md ${!isGridView ? 'bg-primary-500 text-white' : 'text-neutral-500'}`}
                onClick={() => setIsGridView(false)}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
            
            <div className="flex items-center">
              <select
                className="pl-4 pr-8 py-2 border border-neutral-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 appearance-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
                <option value="newest">Newest</option>
              </select>
              <ArrowUpDown className="pointer-events-none relative -ml-6 text-neutral-500" size={14} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters - desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-900">Filters</h3>
                {(categoryFilter || subcategoryFilter || priceRange.min > 0 || priceRange.max < 100) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="py-4 border-t border-neutral-200">
                <h4 className="font-medium text-neutral-800 mb-2">Categories</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input
                      id="all-categories"
                      type="radio"
                      name="category"
                      checked={categoryFilter === ''}
                      onChange={() => setCategoryFilter('')}
                      className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                    />
                    <label htmlFor="all-categories" className="ml-2 text-neutral-700 text-sm">
                      All Categories
                    </label>
                  </div>
                  
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <input
                        id={`category-${category}`}
                        type="radio"
                        name="category"
                        checked={categoryFilter === category}
                        onChange={() => {
                          setCategoryFilter(category);
                          setSubcategoryFilter('');
                        }}
                        className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-neutral-700 text-sm capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {subcategories.length > 0 && (
                <div className="py-4 border-t border-neutral-200">
                  <h4 className="font-medium text-neutral-800 mb-2">Subcategories</h4>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <input
                        id="all-subcategories"
                        type="radio"
                        name="subcategory"
                        checked={subcategoryFilter === ''}
                        onChange={() => setSubcategoryFilter('')}
                        className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                      />
                      <label htmlFor="all-subcategories" className="ml-2 text-neutral-700 text-sm">
                        All Subcategories
                      </label>
                    </div>
                    
                    {subcategories.map((subcategory) => (
                      <div key={subcategory} className="flex items-center">
                        <input
                          id={`subcategory-${subcategory}`}
                          type="radio"
                          name="subcategory"
                          checked={subcategoryFilter === subcategory}
                          onChange={() => setSubcategoryFilter(subcategory)}
                          className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                        />
                        <label htmlFor={`subcategory-${subcategory}`} className="ml-2 text-neutral-700 text-sm capitalize">
                          {subcategory}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="py-4 border-t border-neutral-200">
                <h4 className="font-medium text-neutral-800 mb-2">Price Range</h4>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-neutral-600 text-sm">${priceRange.min}</span>
                  <span className="text-neutral-600 text-sm">${priceRange.max}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile filters */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-40 overflow-hidden md:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-25" onClick={toggleMobileFilters}></div>
              <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                      <h2 className="text-lg font-medium text-neutral-900">Filters</h2>
                      <button
                        type="button"
                        className="text-neutral-500"
                        onClick={toggleMobileFilters}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="divide-y divide-neutral-200 px-4">
                      <div className="py-4">
                        <h3 className="font-medium text-neutral-800 mb-2">Categories</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              id="mobile-all-categories"
                              type="radio"
                              name="category-mobile"
                              checked={categoryFilter === ''}
                              onChange={() => {
                                setCategoryFilter('');
                                setSubcategoryFilter('');
                              }}
                              className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                            />
                            <label htmlFor="mobile-all-categories" className="ml-2 text-neutral-700">
                              All Categories
                            </label>
                          </div>
                          
                          {categories.map((category) => (
                            <div key={category} className="flex items-center">
                              <input
                                id={`mobile-category-${category}`}
                                type="radio"
                                name="category-mobile"
                                checked={categoryFilter === category}
                                onChange={() => {
                                  setCategoryFilter(category);
                                  setSubcategoryFilter('');
                                }}
                                className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                              />
                              <label htmlFor={`mobile-category-${category}`} className="ml-2 text-neutral-700 capitalize">
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {subcategories.length > 0 && (
                        <div className="py-4">
                          <h3 className="font-medium text-neutral-800 mb-2">Subcategories</h3>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <input
                                id="mobile-all-subcategories"
                                type="radio"
                                name="subcategory-mobile"
                                checked={subcategoryFilter === ''}
                                onChange={() => setSubcategoryFilter('')}
                                className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                              />
                              <label htmlFor="mobile-all-subcategories" className="ml-2 text-neutral-700">
                                All Subcategories
                              </label>
                            </div>
                            
                            {subcategories.map((subcategory) => (
                              <div key={subcategory} className="flex items-center">
                                <input
                                  id={`mobile-subcategory-${subcategory}`}
                                  type="radio"
                                  name="subcategory-mobile"
                                  checked={subcategoryFilter === subcategory}
                                  onChange={() => setSubcategoryFilter(subcategory)}
                                  className="h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500"
                                />
                                <label htmlFor={`mobile-subcategory-${subcategory}`} className="ml-2 text-neutral-700 capitalize">
                                  {subcategory}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="py-4">
                        <h3 className="font-medium text-neutral-800 mb-2">Price Range</h3>
                        <div className="flex items-center">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-neutral-600">${priceRange.min}</span>
                          <span className="text-neutral-600">${priceRange.max}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-neutral-200">
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={toggleMobileFilters}
                      >
                        Apply Filters
                      </Button>
                      
                      <button
                        className="mt-2 w-full px-4 py-2 text-sm text-primary-500 border border-primary-500 rounded-md hover:bg-primary-50"
                        onClick={() => {
                          clearFilters();
                          toggleMobileFilters();
                        }}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Product grid */}
          <div className="flex-grow">
            <div className="mb-4">
              <p className="text-neutral-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> products
                {categoryFilter && <span> in <span className="font-medium capitalize">{categoryFilter}</span></span>}
                {subcategoryFilter && <span> / <span className="font-medium capitalize">{subcategoryFilter}</span></span>}
              </p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-soft p-8 text-center">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
                <p className="text-neutral-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className={isGridView ? 
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : 
                "space-y-6"
              }>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} isCompact={!isGridView} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';

const EarringsPage = ({ onViewProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('featured');
    const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', rating: 0 });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const headerImage = 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600';

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const earringsProducts = await fetchProducts('Earrings', false, 0, sortOrder, filters);
                setProducts(earringsProducts);
            } catch (err) {
                if (err instanceof TypeError && err.message === 'Failed to fetch') {
                    setError('Unable to connect to the server. Please try again later.');
                } else {
                    setError(err.message || 'Failed to fetch earrings products.');
                }
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [sortOrder, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <header className="page-header" style={{ backgroundImage: `url(${headerImage})`}}>
                <h1 className="page-header-title">Elegant Earrings</h1>
            </header>

            <div className="container page-with-sidebar">
                <FilterSidebar 
                    initialFilters={filters} 
                    onFilterChange={handleFilterChange} 
                    isOpen={isFilterOpen} 
                    onClose={() => setIsFilterOpen(false)}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                    showSort={true}
                />

                <div className="page-content">
                    <div className="page-controls-bar">
                        <button 
                        className="filter-toggle-button" 
                        onClick={() => setIsFilterOpen(true)}
                        >
                            <span>Filter & Sort</span>
                        </button>
                    </div>

                    <ProductGrid
                        loading={loading}
                        error={error}
                        products={products}
                        onViewProduct={onViewProduct}
                        emptyStateOptions={{ 
                            title: "No Earrings Found", 
                            message: "Try adjusting your filters to find the perfect earrings." 
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default EarringsPage;
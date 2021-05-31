import React, { useEffect, useState } from 'react';
import { Product } from '../interfaces/product';

const Menu = () => {
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:8001/api/products`);

                const data = await response.json();

                setProducts(data);
            }
        )();

    }, []);

    const like = async (id: number) => {
        await fetch(`http://localhost:8001/api/products/${id}/like`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });

        setProducts(products.map(
            (p: Product) => {
                console.log(p.likes)
                if (p.id === id){
                    if (p.likes === undefined){
                        p.likes = 0;
                    }
                    p.likes++;
                }

                return p;
            }
        ));

    }

    return (
        <main>
            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {products.map(
                            (p: Product) => {
                                return (
                                    <div className="col">
                                        <div className="card shadow-sm" key={p.id}>
                                            <img src={p.image} height="180" />

                                            <div className="card-body">
                                                <p className="card-text">{p.title}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="button" 
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => like(p.id)}
                                                        >
                                                            Like
                                                            </button>
                                                    </div>
                                                    <small className="text-muted">{p.likes} likes</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>

        </main>

    );
};

export default Menu
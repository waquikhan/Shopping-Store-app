import React, { useEffect, useState } from "react";
import "./shopping.css";

export default function Shopping() {
  const Titale = "FakeStore";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  function GetCartCount(){
    setCartCount(cartItems.length)
  }

  function LoadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        data.unshift("All");
        setCategories(data);
      });
  }
  function LoadProducts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }
  useEffect(() => {
    LoadCategories();
    LoadProducts("https://fakestoreapi.com/products");
    GetCartCount();
  },[]);

  function handleCategoryChange(event){
    if(event.target.value === 'all')
    {
      LoadProducts("https://fakestoreapi.com/products");
    }else
    {
      LoadProducts(`https://fakestoreapi.com/products/category/${event.target.value} `)
    }
  }

  function handleAddToCartClick(e){
    fetch(`https://fakestoreapi.com/products/${e.target.id}`)
    .then(response => response.json())
    .then(data =>{
      cartItems.push(data)
      GetCartCount();
      alert(`${data.title}\n Added to Cart`)
    })
  }

  function handleHomeChange (){
    LoadProducts("https://fakestoreapi.com/products");
  }
  function handleElectronicChange(){
    LoadProducts("https://fakestoreapi.com/products/category/electronics");
  }
  function handleJaweleryChange(){
    LoadProducts("https://fakestoreapi.com/products/category/jewelery");
  }
  function handleMenChange(){
    LoadProducts("https://fakestoreapi.com/products/category/men's%20clothing");
  }
  function handleWomenChange(){
    LoadProducts("https://fakestoreapi.com/products/category/women's%20clothing");
  }

  return (
    <div className="conatiner-fluid">
      <header className="conatiner d-flex justify-content-between p-2 mt-1 bg-dark text-white">
        <div>
          <h2>{Titale}</h2>
        </div>
        <div>
          <span className="me-5"><button onClick={handleHomeChange} className="btn text-white ">Home</button></span>
          <span className="me-5"><button onClick={handleElectronicChange} className="btn text-white ">Electronics</button></span>
          <span className="me-5"><button onClick={handleJaweleryChange} className="btn text-white ">Jewelery</button></span>
          <span className="me-5"><button onClick={handleMenChange} className="btn text-white ">Men's Fashions</button></span>
          <span className="me-5"><button onClick={handleWomenChange} className="btn text-white ">Women's Fashions</button></span>
        </div>
        <div>
          <span className="bi bi-search me-4"></span>
          <span className="bi bi-heart me-4"></span>
          <span className="bi bi-person me-4"></span>
          <button className="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#cart">
            <span className="bi bi-cart "></span>
            <span className="badge badge-light">{cartCount}</span>
          </button>
          <div className="modal fade " id="cart">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="text-primary" >Your Cart Item</h2>
                  <button className="btn btn-close" data-bs-dismiss='modal'></button>
                </div>
                <div className="modal-body">
                  <table className=" table table-hover text-dark">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map(item=>
                          <tr >
                          <td>{item.title}</td>
                          <td><img src={item.image} alt="..." width="50" height="50"/></td>
                          <td>{item.price}</td>
                          <td>
                            <button className="btn btn-danger">
                              <span className="bi bi-trash-fill"></span>
                            </button>
                          </td>
                          </tr>
                          )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="mt-4  row ">
        <nav className="col-2 m-2">
          <div>
            <label className="form-label"> Select Categories</label>
            <div>
              <select onChange={handleCategoryChange} className="form-select">
                {categories.map((category) => (
                  <option key={category}>{category.toLowerCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </nav>
        <main className="col-9 d-flex flex-wrap">
          {products.map((product) => (
            <div key={product.id} className="card m-1  p-2">
              <img
                src={product.image}
                alt=".."
                height="190"
                className="card-img-top"
              />
              <div className="card-header">{product.title}</div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>{product.price}</dd>
                  <dt>Category</dt>
                  <dd>{product.category}</dd>
                  <dt>Rating</dt>
                  <dd>
                    <span className="bi bi-star-fill text-warning"></span>
                    {product.rating.rate}[{product.rating.count}]
                  </dd>
                </dl>
              </div>
              <div className="card-footer d-flex m-1 e-1">
                <button id={product.id} onClick={handleAddToCartClick} className="btn btn-danger  w-50">
                  <span className="bi bi-cart-plus"></span>ToCard
                </button>
                <button className="btn btn-success  w-50">
                  <span className="bi bi-cart-check"></span> ByNow
                </button>
              </div>
            </div>
          ))}
        </main>
      </section>
    </div>
  );
}

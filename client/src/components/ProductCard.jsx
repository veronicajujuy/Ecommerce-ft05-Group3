import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from 'react-redux';
import {getProductById} from '../actions/product';
import { addProductToCart, getProductsFromCart,} from '../actions/order';
import {reloadProductCard} from '../actions/product';
import { Spinner } from "react-bootstrap";
// import {constructor, getCarrito, addItemCarrito} from './GuestCart' 

function ProductCard({currentProducts, current, name, price, stock, images, id, addProductToCart, cartProducts, user, isAuthenticated }) {

  const body = {
    quantity: 1,
    productId:"" 
}

// manejo de carrito de guest------------
  const logueado = isAuthenticated

  const [cantidad, setCantidad] = useState(0)
  const setItemToCart = (id) => {
    if (!localStorage.getItem('carrito')){
      localStorage.setItem('carrito','[]')}

  let getCart = JSON.parse(localStorage.getItem('carrito'))
  let product = {
        id: id,
        name: name,
        price: price,
        stock: stock-1,
        images: images ? [images] : '',
        quantity: 1
      }
  getCart.push(product)
  localStorage.setItem('carrito', JSON.stringify(getCart))
  }

  useEffect(()=>{
    if (!logueado){
      let productos = JSON.parse(localStorage.getItem('carrito'))
      let prodLocal = productos && productos.find(product => product.id == id)
      setCantidad(prodLocal ? prodLocal.quantity:0)
    }
  }, []);
  // manejo de carrito de guest------------
 
  const[showCard, setShowCard] = useState("")

  const handleClick = (id) => {
    if (!logueado){
      setItemToCart(id)
      setShowCard(false);
      let cant = 1
      setCantidad(cant)
      return
    }

    if(user) {
      body.productId = id;
    setShowCard(false);
     
    addProductToCart(user.id, body); //idUser
    
  } 
   }

  useEffect(()=>{
    // mapear el localStorage para setear los botones-----------------------
    if (!logueado){
      let productos = JSON.parse(localStorage.getItem('carrito'))
      productos && productos.find(product => product.id == id) ? setShowCard(false) : setShowCard(true)
      return
    }
    // mapear el localStorage para setear los botones-----------------------

      cartProducts.product && (cartProducts.product.find(product => product.id === id)) ? setShowCard(false) : setShowCard(true)
  } 
    ,[current, currentProducts, isAuthenticated]);

     
  return (
    <div className="product-card card-container">
      <div className="img d-flex justify-content-center">
        <img variant="top" style={{width: '19rem'}} src={images?images.image:'https://bitsofco.de/content/images/2018/12/broken-1.png'} alt="product" className="image"></img> 
      </div>
      <Link to={`/user/product/${id}`} className="title-card" > 
        <div className="title-card">
          <p style={{ color: "black" }} >{name}</p>
        </div>
      </Link>
      <div className="d-flex justify-content-around stock-price-cart">
        <div>
          <p
            className="price-card"
            style={{ color: "black", border: "none" }}
          >
            ${price}
          </p>
          <p className="stock-card">Stock: {stock-cantidad}</p>
        </div>
        <div className="d-flex align-self-center">
          {
            !stock ? (
              <button disabled={true} className="RO-border-button">
              Runned Out  &nbsp;&nbsp;
              <BsFillDashCircleFill />
            </button>
            ) : ( showCard ? 
              <button className="border-buttom"  onClick={()=> handleClick(id)}   >
                Add to Cart&nbsp;
                <FiShoppingCart className="h5 mt-1" />
              </button> 
              :
              <button disabled={true} className="RO-border-button">
                 Added  &nbsp;&nbsp;
              <BsCheck />
            </button>
            )
          }
          
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
        cartState: state.orderReducer.cart,
        isAuthenticated: state.userReducer.isAuthenticated,
        user: state.userReducer.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProductToCart: (idUser, body) => dispatch(addProductToCart(idUser, body)),
    getProductById: (id) => dispatch(getProductById(id)),
    reloadProductCard: () => dispatch(reloadProductCard()),
    getProductsFromCart: (idUser) => dispatch(getProductsFromCart(idUser)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);
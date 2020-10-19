import React, { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi";
import {Container, Row, Col, Modal, Button} from 'react-bootstrap'
import {IoMdTrash, IoMdPhotos, IoIosCart} from 'react-icons/io'
import NumberFormat from "react-number-format"
import OrderUse from './OrderUse'
import swal from 'sweetalert'
import { Redirect } from 'react-router-dom'
import './CartUse.css'

//-------------- Redux ------------------------
import { connect } from 'react-redux'
import { getOrder, cambioEstadoCarrito, vaciarCarrito, quitarItemCarrito} from '../../actions/order'
import { getProducts, updateProduct } from "../../actions/product"



const Cart = ({order, getOrder, products, getProducts, updateProduct, cambioEstadoCarrito, vaciarCarrito, quitarItemCarrito}) => {
    
      //const [state, setState] = useState({
      //products: products
      //})
      console.log('-------------', order)
      const [total, setTotal] = useState(0)

      // ------------------redireccionar --------------
      const [stateRedirect, setRedirect] = useState({ redirect: null })

      // ------------------redireccionar --------------

    let prod = []

    let totalCostTmp=0;

    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        getOrder()
      }, [totalCost])

    


      //useEffect(() => {
      //  setState({
      //    products: order.product
      //    })
      // console.log('state luego de borrar',state)
      //}, [quitarItemCarrito])
    
    const quantityChange = (e, id) =>{
        let cantCambiada = e
        prod = order.product
        prod ? prod.forEach( e => {
          if (e.orderline.id === id){
            e.stock = e.stock + e.orderline.quantity - cantCambiada
            e.orderline.quantity = cantCambiada
          }}
        ) : console.log('nada')


        if(prod){
          prod.forEach(element => {
              totalCostTmp = totalCostTmp + parseInt(element.price)
          })
        }setTotalCost(totalCostTmp)
        
       
        
        
    }
    console.log(totalCostTmp)
    console.log(totalCost)


    const handleDelete = (id) =>{
      swal({
        title: "Are you sure?",
        text: "You will delete this item from your cart!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          quitarItemCarrito(id)

          
          swal("Your cart is Empty!", {
            icon: "success",
          }).then(() =>  {
                      

          })
  
      } } )
       

    }

    const handleFinCompra =() =>{

      let prodEnviar = []
        products.map (e => {
          prodEnviar = {
            name: e.name,
            description: e.description,
            price: e.price,
            stock: e.stock,
            categories:'',
            images: ''
          }
          updateProduct(e.id, prodEnviar)}
        ) 
      cambioEstadoCarrito(order.orderId, 'Created')
      swal("Order Created!", {
        icon: "success",
      }).then(() => {
          setRedirect({ redirect: "/user/catalogo" });
        }
      )
        
      }

    const handleVaciarCarrito = () =>{
      swal({
        title: "Are you sure?",
        text: "You will empty your cart!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          vaciarCarrito()

          swal("Your cart is Empty!", {
            icon: "success",
          }).then(() => {
          setRedirect({ redirect: "/user/catalogo" });
            })
  
      } } )
  
    }
    if (stateRedirect.redirect) {
            return <Redirect to={stateRedirect.redirect} />
          }
      
  return ( 
    
    <Container className="container-cart-use">
      <Row className='m-3 d-none d-md-block cart-text '>
        <Col className=" text-center py-2" style={{color: 'white'}}> 
        My Cart <IoIosCart />
        </Col> 
      </Row>
        <Row className="m-3 d-none d-md-block">
          <Col>
            {/* <Row className="bg-light text-center py-2"> */}
              {/* <Col xs={3} md={2}>
                <span className="h3">
                  <IoMdPhotos />
                </span>
              </Col> */}
              {/* ------------------ */}
              {/* <Col>
                <Row>
                  <Col xs={6} md={4} className="text-center number" >
                    <span className="h6">Products</span>
                  </Col>
                  <Col xs={6} md={3} className="text-left ml-2 number">
                    <span className="h6">Quantity</span>
                  </Col>
                  <Col className="text-center number">
                    <span className="h6">Price</span>
                  </Col>
                  <Col className="text-left ml-4 number">
                    <span className="h3">
                      <IoMdTrash />
                    </span>
                  </Col>
                </Row>
              </Col> */}
            {/* </Row> */}
          </Col>
        </Row>
        <Row className="m-3 d-none d-md-block">
          <Col>
            <Row className="bg-light text-center py-2  ">
              <Col className="mx-3">
                  
                  {products ? products.map (e => 
                  <OrderUse orderline={e} quantityChange={quantityChange} handleDelete={handleDelete}/>) :
                  <div>
                  <p>
                    <img src="../images/shopping_Sad-512.png" alt="sad cart"></img>
                    <h3> Your cart is empty!</h3> <br></br> Add something to make me
                    happy :)
                  </p>
                </div>}
                
              </Col>
            </Row>
            </Col>
        </Row>

          <Row className="mx-3 text-center">
       
            <Col xs={6} className="text-center bg-light p-3 ml-auto">
              <h4 className="mb-4 ">
                Total:
                <NumberFormat
                  prefix=" $"
                  value={total}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType={"text"}
                />
              </h4>
              <Button
                className="btn  boton"
                onClick={handleFinCompra}
                style={{backgroundColor: '#8a2be2', color: 'white', border: 'none'}}
              >
                Finalize Purchase
                </Button>
              <button
                className="btn  boton"
                style={{backgroundColor: '#8a2be2', color: 'white'}}
                onClick={handleVaciarCarrito}
              >
                Empty Cart
              </button>
            </Col>
          </Row>
        {/* )} */}
      </Container>
    );
}

function mapStateToProps(state) {
    return {
            order: state.orderReducer.order,
            products: state.orderReducer.products,
          
    }
}


function mapDispatchToProps(dispatch) {
    return {
            getOrder: () => dispatch(getOrder()),
            getProducts: () => dispatch(getProducts()),
            cambioEstadoCarrito: (id, status) => dispatch(cambioEstadoCarrito(id, status)),
            updateProduct: (id, prod) => dispatch(updateProduct(id, prod) ),
            vaciarCarrito: () => dispatch(vaciarCarrito()),
            quitarItemCarrito: (id) => dispatch(quitarItemCarrito(id))
          
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
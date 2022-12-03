function Cart(props) {
  return (
    <>
      {!props.isLoggedIn && (
        <div>You must Log In First to add product to Cart</div>
      )}

      {props.isLoggedIn && <div>Cart is Empty</div>}
    </>
  );
}

export default Cart;

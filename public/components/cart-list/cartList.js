function CartController(CartService) {
    const ctrl = this;
    ctrl.cartItems = [];

    ctrl.storeProducts = [
    {
        id: 1,
        name: "eggs",
        price: 1.99,
        quantity: 1,
        image: "/images/egg-banner.jpg"
    },
    {
        id: 2,
        name: "bacon",
        price: 4.99,
        quantity: 3,
        image: "/images/bacon-banner.jpg"

    },
    {
        id: 3,
        name: "bread",
        price: 1.29,
        quantity: 1,
        image: "/images/bread-banner.jpg"

    },
    {
        id: 4,
        name: "butter",
        price: 2.09,
        quantity: 2,
        image: "/images/butter-banner.jpg"

    },
    {
        id: 5,
        name: "maple syrup",
        price: 2.99,
        quantity: 1,
        image: "/images/syrup-banner.jpg"

    }
    ];
    ctrl.banner = '';
    ctrl.isHovering = false;

    ctrl.cartList = () => {
        CartService.getCart()
        .then( (data) => {

            data.forEach(function(item)  {
                let cartObj = {
                    id: item.id,
                    product: item.product,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                }
                ctrl.cartItems.push(cartObj);
            })

        })
        .catch( (error) => {
            console.log(error);
        })

    }

    ctrl.pushCartList = (itemProduct, itemPrice, itemQuantity, itemImage) => {
        let item  = {
            product: itemProduct,
            price: itemPrice,
            quantity: itemQuantity,
            image: itemImage
        }
        CartService.pushToCart(JSON.stringify(item))
        CartService.reloadData();
    }

    ctrl.deleteCartItem = (id) => {
        CartService.deleteFromCart(id);
        CartService.reloadData();


    }

    ctrl.updateCartItem = (itemQuantity, itemProduct, itemID) => {
        let item  = {
            id: itemID,
            product: itemProduct,
            price: 1.09,
            quantity: itemQuantity,
            image: ""
        }

        console.log(item.id);


        CartService.updateCart(JSON.stringify(item));
        CartService.reloadData();

    }

    ctrl.cartList();

    ctrl.getBanner = (image) => {
        ctrl.isHovering = true;
        ctrl.banner = image;
        // console.log(ctrl.isHovering);
    }
    // console.log(ctrl.isHovering);




}

angular.module("CartApp")
.component('cartList', {
    controller: CartController,
    template: `
    <dynamic-banner background="$ctrl.banner"></dynamic-banner>



    <div class="container">
        <div class="cart">
        <form class="cart-item">
        <select ng-model="newProduct" ng-options="item.name for item in $ctrl.storeProducts track by item.name">
            <option select="selected" value="">Pick An Item!</option>
        </select>
       <p>price: \${{newProduct.price}}</p>
    <input type="number" ng-model="newQuantity" placeholder="Quantity" />
    <button ng-click="$ctrl.pushCartList(newProduct.name, newProduct.price, newQuantity, newProduct.image)">Add Item</button>
    </form>

            <div class="cart-item" ng-repeat="item in $ctrl.cartItems" ng-mouseover="$ctrl.getBanner(item.image)" ng-mouseleave="$ctrl.isHovering = false;">

            <form>
            <button type="submit" ng-click="$ctrl.deleteCartItem(item.id)">DELETE</button>
            </form>

            <form>
                <input type="number" ng-model="quantity"/>
                <button type="submit" ng-click="$ctrl.updateCartItem(quantity, item.product, item.id)">Update Qty</button>
            </form>

            
            <div ng-if="item.product">
                <div class="item-header ">{{item.product}}</div>
                <div class="item-cost">Cost: \${{ (item.quantity * item.price).toFixed(2)}}</div>

                <div class="item-info-container">
                <div class="item-info quantity">Qty: {{item.quantity}}</div>
                <div class="item-info price">Price: \${{item.price.toFixed(2)}}</div>
            </div>
                </div>
            </div>
        </div>
    </div>
    `
})
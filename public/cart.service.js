function CartService($http, $q, $window) {
    const service = this;

    service.getCart = () => {
        return $q(function(resolve, reject)  {
            $http.get('/cart-items')
            .then( (response) => {
                // console.log(response.data);
                resolve(response.data);
            })
            .catch( (error) => {
                console.log(error);
                reject(error);
            })

        })
    }

    service.pushToCart = (cartItem) => {
        return $q(function(resolve, reject)  {
                return $http({
                url: "/cart-items",
                method: "POST",
                data: cartItem
            }).then((response) => {
                return response.data;
            })

        })
    }

    service.deleteFromCart = (id) => {
        return $q(function(resolve, reject)  {
                return $http({
                url: `/cart-items/${id}`,
                method: "DELETE",
                data: id
            }).then((response) => {
                console.log(id);
                return response.data;
            })

        })
    }

    service.updateCart = (item) => {
        return $q(function(resolve, reject) {
            return $http ({
                url: `/cart-items/${item.itemID}`,
                method: "PUT",
                data: item
            })
            .then( (response) => {
                return response.data;
            })
        })
    }

    service.reloadData = function () {
        $window.location.reload();
    }

}


angular.module("CartApp")
.service("CartService", ["$http", "$q", "$window", CartService]);
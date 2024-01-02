class OrderRequest{
    transformSelection = (food, user, qty)=>{
        let order = {
            customerId: user._id,
            foodId: food._id,
            detail: {
                title: food.title,
                price: food.price,
                image: food.images[0]
            },
            qty: qty,
            status: 'new',
            rate: food.afterDiscount,
            VatAmt: 0.13*food.afterDiscount*qty,
            discount: food.discount,
            serviceCharge: 0.05*food.afterDiscount*qty,
            amount: qty*food.afterDiscount + 0.13*food.afterDiscount*qty + 0.05*food.afterDiscount*qty,
        }

        return order
    }
}

module.exports = OrderRequest
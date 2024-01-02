class OrderRequest{
    transformSelection = (food, user, qty)=>{
        let order = {
            billId: null,
            customerId: user._id,
            foodId: food._id,
            detail: {
                title: food.title,
                price: food.price,
                image: food.images[0]
            },
            qty: qty,
            rate: food.afterDiscount,
            status: 'new',
            VatAmt: 0.13*rate,
            discount: food.discount,
            serviceCharge: 100,
            amount: qty*food.afterDiscount + 0.13*food.afterDiscount + 100,
        }

        return order
    }
}

module.exports = OrderRequest
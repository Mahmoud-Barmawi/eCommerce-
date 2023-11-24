import cartModle from "../../../../DB/models/cart.model.js";

export const createCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await cartModle.findOne({ userId: req.user._id })
    if (!cart) {
        const newCart = await cartModle.create({
            userId: req.user._id,
            products: { productId, quantity }
        })

        return res.json({ messge: "success", newCart })
    }
    let matchProduct = false;
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId == productId) {
            cart.products[i].quantity = quantity;
            matchProduct = true;
            break;
        }
    }
    if (!matchProduct) {
        cart.products.push({ productId, quantity })
    }
    await cart.save()
    return res.json({ message: 'success', cart });
}

export const removeItem = async (req, res) => {
    const { productId } = req.body;
    await cartModle.updateOne({ userId: req.user._id }, {
        $pull: {
            products: {
                productId
            }
        }
    })
    return res.json("ok");
}
export const removeItems = async (req, res) => {
    await cartModle.updateOne({ userId: req.user._id }, {
        products: []
    })
    return res.json("ok");
}

export const getCart = async (req, res) => {
    const cart = await cartModle.findOne({ userId: req.user._id })
    return res.json({ message: "Success", cart })
}
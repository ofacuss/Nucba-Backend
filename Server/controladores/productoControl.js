const Product = require('../Modelos/producto');

// Traer productos, GET
const getProducts = async (req, res) => {
    try {
        const productos = await Product.find();
        res.json({
            ok: true,
            productos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener productos'
        });
    }
};

// Crear producto
const createProduct = async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        await nuevoProducto.save();
        res.status(201).json({
            ok: true,
            producto: nuevoProducto
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el producto'
        });
    }
};

module.exports = {
    getProducts,
    createProduct
};

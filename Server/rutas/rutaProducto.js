const { Router } = require('express');
const Product = require('../Modelos/producto');
const router = Router();

// Ruta de producto Metodo POST
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Product(req.body);
        await nuevoProducto.save();
        res.status(201).json({ ok: true, producto: nuevoProducto });
    } catch (error) {
        res.status(400).json({ ok: false, msg: 'Error al crear producto', error });
    }
});

// Ruta de obtener productos con GET
router.get('/', async (req, res) => {
    try {
        const productos = await Product.find();
        res.json({ ok: true, productos });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener productos' });
    }
});

module.exports = router;

const { hasUser } = require('../middlewares/guards');
const { create, getById, update, deleteById, like } = require('../services/stoneService');
const { parseError } = require('../util/parser');

const stoneController = require('express').Router();

stoneController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

stoneController.post('/create', hasUser(), async (req, res) => {
    const stone = {
        name: req.body.name,
        category: req.body.category,
        color: req.body.color,
        image: req.body.image,
        location: req.body.location,
        formula: req.body.formula,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(stone);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            stone
        });
    }
});

stoneController.get('/:id', async (req, res) => {
    const stone = await getById(req.params.id);

    if (req.user) {
        stone.isOwner = stone.owner.toString() === req.user._id.toString();
        stone.isLiked = stone.likedList.map(l => l.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details page', stone });
});

stoneController.get('/like/:id', async (req, res) => {
    const stone = await getById(req.params.id);

    if (stone.owner.toString() !== req.user._id.toString() &&
        !stone.likedList.map(d => d.toString()).includes(req.user._id.toString())) {
        await like(req.params.id, req.user._id);
        res.redirect(`/stone/${req.params.id}`);
    }
});

stoneController.get('/edit/:id', hasUser(), async (req, res) => {
    const stone = await getById(req.params.id);

    if (stone.owner.toString() !== req.user._id.toString()) {
        res.redirect('/login');
    }

    res.render('edit', { title: 'Edit page', stone });
});

stoneController.post('/edit/:id', hasUser(), async (req, res) => {
    const stone = await getById(req.params.id);

    if (stone.owner.toString() !== req.user._id.toString()) {
        res.redirect('/login');
    }

    try {
        await update(req.params.id, req.body);
        res.redirect(`/stone/${req.params.id}`);
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            errors,
            stone: req.body
        });
    }
});

stoneController.get('/delete/:id', hasUser(), async (req, res) => {
    const stone = await getById(req.params.id);

    if (stone.owner.toString() !== req.user._id.toString()) {
        res.redirect('/login');
    }

    await deleteById(req.params.id);
    res.redirect('/catalog');
});

module.exports = stoneController;
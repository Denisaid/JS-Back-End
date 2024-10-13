const { hasUser } = require('../middlewares/guards');
const { create, getById, update, deleteById, buyGame } = require('../services/gameService');
const { parseError } = require('../util/parser');

const gameController = require('express').Router();

gameController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page', idStyle: 'create' });
});

gameController.post('/create', hasUser(), async (req, res) => {
    const game = {
        platform: req.body.platform,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        genre: req.body.genre,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(game);
        res.redirect('/catalog');
    } catch (error) {
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            idStyle: 'create',
            errors,
            game
        });
    }
});

gameController.get('/:id', async (req, res) => {
    const game = await getById(req.params.id);

    if (req.user) {
        game.isOwner = game.owner.toString() === req.user._id.toString();
        game.isBought = game.boughtBy.map(b => b._id.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details Page', idStyle: 'details', game });
});

gameController.get('/:id/edit', hasUser(), async (req, res) => {
    const game = await getById(req.params.id);
    const platformMap = {
        'PC': 'PC',
        'Nintendo': 'Nintendo',
        'PS4': 'PS4',
        'PS5': 'PS5',
        'XBOX': 'XBOX'
    };

    if (game.owner.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    const platform = Object.keys(platformMap).map(key => ({
        value: key,
        label: platformMap[key],
        isSelected: game.platform == key
    }));

    res.render('edit', { title: 'Edit Page', idStyle: 'edit', game, platform });
});

gameController.post('/:id/edit', hasUser(), async (req, res) => {
    const game = await getById(req.params.id);

    if (game.owner.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    try {
        await update(req.params.id, req.body);
        res.redirect(`/game/${req.params.id}`);
    } catch (error) {
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            idStyle: 'edit',
            errors,
            game
        });
    }
});

gameController.get('/:id/delete', hasUser(), async (req, res) => {
    const game = await getById(req.params.id);

    if (game.owner.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    await deleteById(req.params.id)
    res.redirect('/catalog');
});

gameController.get('/:id/buy', hasUser(), async (req, res) => {
    const game = await getById(req.params.id);

    if (game.owner.toString() !== req.user._id.toString() &&
        !game.boughtBy.map(b => b._id.toString()).includes(req.user._id.toString())) {
        await buyGame(req.params.id, req.user._id);
    }

    res.redirect(`/game/${req.params.id}`);
});

module.exports = gameController;
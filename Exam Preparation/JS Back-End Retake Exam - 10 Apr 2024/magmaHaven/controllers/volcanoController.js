const { hasUser } = require('../middlewares/guards');
const { create, getById, update, deleteById, vote } = require('../services/volcanoService');
const { parseError } = require('../util/parser');

const volcanoController = require('express').Router();

volcanoController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

volcanoController.post('/create', hasUser(), async (req, res) => {
    const volcano = {
        name: req.body.name,
        location: req.body.location,
        elevation: req.body.elevation,
        lastEruption: req.body.lastEruption,
        image: req.body.image,
        typeVolcano: req.body.typeVolcano,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(volcano);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            volcano
        });
    }
});

volcanoController.get('/:id', async (req, res) => {
    const volcano = await getById(req.params.id);

    if (req.user) {
        volcano.isOwner = volcano.owner.toString() === req.user._id.toString();
        volcano.isVoted = volcano.voteList.map(v => v.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details page', volcano });
});

volcanoController.get('/vote/:id', async (req, res) => {
    const volcano = await getById(req.params.id);

    if (volcano.owner.toString() !== req.user._id.toString() &&
        !volcano.voteList.map(v => v.toString()).includes(req.user._id.toString())) {
        await vote(req.params.id, req.user._id);
        res.redirect(`/volcano/${req.params.id}`);
    }
});

volcanoController.get('/edit/:id', hasUser(), async (req, res) => {
    const volcano = await getById(req.params.id);
    const typeMap = {
        'Supervolcanoes': 'Supervolcanoes',
        'Submarine': 'Submarine',
        'Subglacial': 'Subglacial',
        'Mud': 'Mud',
        'Stratovolcanoes': 'Stratovolcanoes',
        'Shield': 'Shield'
    };


    if (volcano.owner.toString() !== req.user._id.toString()) {
        res.redirect('/login');
    }

    const typeVolcano = Object.keys(typeMap).map(key => ({
        value: key,
        label: typeMap[key],
        isSelected: volcano.typeVolcano == key
    }));

    console.log(typeVolcano);

    res.render('edit', { title: 'Edit page', volcano, typeVolcano });
});

volcanoController.post('/edit/:id', hasUser(), async (req, res) => {
    const volcano = await getById(req.params.id);

    if (volcano.owner.toString() !== req.user._id.toString()) {
        res.redirect('/login');
    }

    try {
        await update(req.params.id, req.body);
        res.redirect(`/volcano/${req.params.id}`);
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            errors,
            volcano: req.body
        });
    }
});

volcanoController.get('/delete/:id', hasUser(), async (req, res) => {
    const volcano = await getById(req.params.id);

    if (volcano.owner.toString() !== req.user._id.toString()) {
        res.redirect('/login');
    }

    await deleteById(req.params.id);
    res.redirect('/catalog');
});

module.exports = volcanoController;
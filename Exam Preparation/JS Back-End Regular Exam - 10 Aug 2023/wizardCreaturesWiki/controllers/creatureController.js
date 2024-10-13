const creatureController = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { create, getById, update, deleteById, giveVote } = require("../services/creatureService");
const { parseError } = require("../util/parser");

creatureController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

creatureController.post('/create', hasUser(), async (req, res) => {
    const creature = {
        name: req.body.name,
        species: req.body.species,
        skinColor: req.body.skinColor,
        eyeColor: req.body.eyeColor,
        image: req.body.image,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(creature);
        res.redirect('/catalog');
    } catch (error) {
        console.error(error);
        const errors = parseError(error);
        res.render('create', {
            title: 'Create Page',
            errors,
            creature
        });
    }
});

creatureController.get('/:id', async (req, res) => {
    const creature = await getById(req.params.id);

    if (req.user) {
        creature.isOwner = creature.owner._id.toString() === req.user._id.toString();
        creature.hasVote = creature.votes.find(v => v._id.toString() === req.user._id.toString());
    }
    
    creature.printVotes = creature.votes.map(v => {
        const votes = [];
        votes.push(v.email);
        return votes;
    }).join(', ');

    res.render('details', { title: 'Details Page', creature });
});

creatureController.get('/:id/edit', hasUser(), async (req, res) => {
    const creature = await getById(req.params.id);

    if (creature.owner._id.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    res.render('edit', { title: 'Edit Page', creature });
});

creatureController.post('/:id/edit', hasUser(), async (req, res) => {
    const creature = await getById(req.params.id);

    if (creature.owner._id.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    try {
        await update(req.params.id, req.body);
        res.redirect(`/creature/${req.params.id}`);
    } catch (error) {
        console.error(error);
        const errors = parseError(error);
        res.render('edit', {
            title: 'Edit Page',
            errors,
            creature: req.body
        });
    }
});

creatureController.get('/:id/delete', hasUser(), async (req, res) => {
    const creature = await getById(req.params.id);

    if (creature.owner._id.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/catalog');
});

creatureController.get('/:id/vote', hasUser(), async (req, res) => {
    const creature = await getById(req.params.id);

    if (creature.owner._id.toString() !== req.user._id.toString() &&
        !creature.votes.map(v => v.toString()).includes(req.user._id.toString())) {
        await giveVote(req.params.id, req.user._id);
        res.redirect(`/creature/${req.params.id}`);
    }
});

module.exports = creatureController;
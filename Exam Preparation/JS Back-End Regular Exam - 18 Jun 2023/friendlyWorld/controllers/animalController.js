const { hasUser } = require("../middlewares/guards");
const { create, getById, donate, update, deleteById } = require("../services/animalService");
const { parseError } = require("../util/parser");

const animalController = require("express").Router();

animalController.get('/create', hasUser(), (req, res) => {
    res.render('create', { title: 'Create Page' });
});

animalController.post('/create', hasUser(), async (req, res) => {
    const animal = {
        name: req.body.name,
        years: req.body.years,
        kind: req.body.kind,
        image: req.body.image,
        need: req.body.need,
        location: req.body.location,
        description: req.body.description,
        owner: req.user._id
    };

    try {
        await create(animal);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render("create", {
            title: "Create Page",
            errors,
            animal
        });
    }
});

animalController.get('/:id', async (req, res) => {
    const animal = await getById(req.params.id);

    if (req.user) {
        animal.isOwner = animal.owner.toString() === req.user._id.toString();
        animal.isDonated = animal.donations.map(d => d.toString()).includes(req.user._id.toString());
    }

    res.render('details', { title: 'Details page', animal });
});

animalController.get('/:id/donate', async (req, res) => {
    const animal = await getById(req.params.id);

    if (animal.owner.toString() !== req.user._id.toString() &&
        !animal.donations.map(d => d.toString()).includes(req.user._id.toString())) {
        await donate(req.params.id, req.user._id);
        res.redirect(`/animal/${req.params.id}`);
    }
});

animalController.get('/:id/edit', hasUser(), async (req, res) => {
    const animal = await getById(req.params.id);

    if (animal.owner.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    res.render('edit', { title: 'Edit page', animal });
});

animalController.post('/:id/edit', hasUser(), async (req, res) => {
    const animal = await getById(req.params.id);

    if (animal.owner.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    try {
        await update(req.params.id, req.body);
        res.redirect(`/animal/${req.params.id}`);
    } catch (error) {
        console.log(error);
        const errors = parseError(error);
        res.render("edit", {
            title: "Edit Page",
            errors,
            animal: req.body
        });
    }
});

animalController.get('/:id/delete', hasUser(), async (req, res) => {
    const animal = await getById(req.params.id);

    if (animal.owner.toString() !== req.user._id.toString()) {
        res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/catalog');
});

module.exports = animalController;
const crud = (Model, { populate, sort = {}, filter = () => ({}) } = {}) => {
  const withPopulate = (query) => (populate ? query.populate(populate) : query);

  return {
    list: async (req, res) => {
      res.json(await withPopulate(Model.find(filter(req))).sort(sort));
    },

    getOne: async (req, res) => {
      const doc = await withPopulate(Model.findById(req.params.id));
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    },

    create: async (req, res) => {
      res.status(201).json(await Model.create(req.body));
    },

    update: async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    },

    remove: async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.status(204).end();
    },
  };
};

export default crud;
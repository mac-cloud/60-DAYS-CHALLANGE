router.post('/api/tent', upload.single('tentImage'), async (req, res) => {
    try {
        const { name, description, dayTimePrice, nightPrice} = req.body;
        const tentImage = req.file ? `uploads/${req.file.filename}` : null;
        const newTent = new TentImage({
            name,
            description,
            tentImage,
            dayTimePrice,
            nightPrice,
        });
     await newTent.save();
     res.status(201).json({ message: 'Tent details added successfully', tent: newTent});
    } catch (error) {
        console.error('Error adding tent', error);
        res.status(500).json({ message: 'Failed to add to tent detailes', error});
    }
});
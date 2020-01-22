module.exports ={
    create: (req,res) => {
        const {name, description, price, img_url} = req.body; 
        const db = req.app.get('db');

        db.create_product([name, description, price,img_url]).then(product => {
            res.sendStatus(200)
        })
        .catch(err => {res.status(500).send(err)}); 
    }, 
    getOne: (req,res) => {
        const {id} = req.params; 
        const db = req.app.get('db'); 

        db.read_product(id).then(product => {
            res.status(200).send(product)
        })
        .catch(err => res.status(500).send(err)); 
    }, 
    getAll:(req,res) => { 
        const db = req.app.get('db'); 

        db.read_products().then(products => {
            res.status(200).send(products)
        })
        .catch(err => res.status(500).send(err)); 
    }, 
    update: (req,res) => { 
        const {id} = req.params; 
        const {description} =req.query; 
        const db = req.app.get('db'); 

        db.update(id,description).then(products => {
            db.getAll().then(products => {
                res.status(200).send(products); 
            })
        })
    }, 
    delete: (req,res) => { 
        const {id} = req.params; 
        const db = req.app.get('db'); 

        db.delete(id).then(products => { 
            res.status(200).send(`Product deleted`)
        })
        .catch(err => res.status(500).send(err));
    }
} 


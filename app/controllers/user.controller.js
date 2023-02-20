/* *
[     script:moxx_dev] Player identifier: steam:110000104186670
[     script:moxx_dev] Player identifier: license:4ec077e0d835f058ba3107d79c1b8c277747fe48
[     script:moxx_dev] Player identifier: xbl:2533274905688171
[     script:moxx_dev] Player identifier: live:914800660427603
[     script:moxx_dev] Player identifier: discord:102511115476406272
[     script:moxx_dev] Player identifier: fivem:6539731
[     script:moxx_dev] Player identifier: license2:1b41ac122b6ce2ff7717b7d9be9ba23ebb4b76b5
[     script:moxx_dev] Player identifier: ip:192.168.0.130

* */

const db = require('../models');
const User = db.user;

exports.create = (req, res) => {
    if(!req.body.steam || !req.body.license || !req.body.xbl || !req.body.live || !req.body.discord || !req.body.fivem || !req.body.license2 || !req.body.ip || !req.body.username){
        res.status(400).send({message: `Content cannot be empty!`})
        return;
    }

    const user = new User({
        steam: req.body.steam,
        license: req.body.license,
        xbl: req.body.xbl,
        live: req.body.live,
        discord: req.body.discord,
        fivem: req.body.fivem,
        license2: req.body.license2,
        ip: req.body.ip,
        username: req.body.username,
        whitelist: req.body.whitelist
    });

    user.save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User"
            });
        });
};
exports.findAll = (req, res) => {
    let query = req.query;
    let queryLength = Object.keys(query).length
    if(queryLength <= 0){
        User.find({})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Users"
                });
            });
    }else{
        let queryKey = Object.keys(query)[0];
        let queryValue = query[queryKey];
        User.findOne().where(queryKey).equals(queryValue)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || `Some error occurred while retrieving User by license: ${license}`
                })
            });
    }

};
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Not found User with id ${id}`});
            }else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: `Error retrieving User with id=${id}`});
        });
};
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`
                });
            }else {
                res.send({ message: "User was updated successfully." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating User with id=${id}`
            });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }else{
                res.send({
                    message: `User was deleted successfully!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id=${id}`
            });
        });
};
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deelted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred while removing all users.`
            });
        });
};
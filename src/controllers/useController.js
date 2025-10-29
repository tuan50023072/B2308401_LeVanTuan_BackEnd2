const ContactService = require("../services/contact.service");
const ApiError = require("../utils/apiError");

const create = async (req,res,next) => {
    if(!req.body?.name){
        return next(new ApiError(400,"Name can not be empty"));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
};

const findAll = async (req,res,next) => {
    let documents =[]
     try{
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            documents = await contactService.findByName(name);
        }
        else{
            documents = await contactService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
};

const findOne = (req,res) => {
    res.send({message : "findOne handler"})
};

const update = (req,res) => {
    res.send({message : "update handler"})
};

const remove = (req,res) => {
    res.send({message : "remove handler"})
};

const removeAll = (req,res) => {
    res.send({message : "removeAll handler"})
};

const findAllFavorite = (req,res) => {
    res.send({message : "findAllFavorite handler"})
};

module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
    removeAll,
    findAllFavorite
}
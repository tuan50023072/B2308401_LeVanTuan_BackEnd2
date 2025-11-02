const ContactService = require("../services/contact.service");
const ApiError = require("../utils/apiError");
const MongoDB = require("../utils/mongodb.util")

const create = async (req,res,next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);

        console.log(document);

        return res.status(201).json({
            message: "Contact created successfully",
            data: document,
        });
    } catch (error) {
        console.error("🔥 Error creating contact:", error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }

};

const findAll = async (req,res,next) => {
   let documents = []
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (err) { 
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents); 
};

const findOne = async (req,res,next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        console.log(req.params.id);
        if (!document) { 
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(document);
    }catch (err) {
            return next(
                new ApiError(500, `Error retrieving contact with id ${req.params.id}`)
            );
    } 
};

const update = async (req,res,next) => {
     if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        console.log(document);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (err) { 
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

const remove = async (req,res,next) => {
     try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (err) { 
        return next(
            new ApiError(500, `Could not delete contact with id = ${req.params.id}`)
        );
    }
};

const removeAll = async (req,res,next) => {
     try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch {
        return next(
            new ApiError(500, "An error occured while removing favorite contacts")
        );
    }
};

const findAllFavorite = async (req,res,next) => {
      try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch {
        return next(
            new ApiError(500, "An error occured while retrieving favorite contacts")
        );
    }
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
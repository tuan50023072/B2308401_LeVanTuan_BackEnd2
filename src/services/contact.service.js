const {ObjectID} = require("mongodb");

class ContactService{
    constructor(client){
        this.Contact = client.db().collection("contacts");
    }
    extractContactData(payload){
        const contact = {
            name : payload.name,
            email : payload.email,
            address : payload.address,
            phone : payload.phone,
            favorite : payload.favorite,
        };
        // remove undefined fields
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create (payload){
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set : { favorite : contact.favorite === true}},
            {returnDocument: "after", upset :true}
        );
        return result;
    }

    async find(filler){
        return await this.find({
            name :{$regex:new RegExp(new RegExp(name)), $options :"i"}
        });
    }
}

module.exports = ContactService;
class Contact {

    constructor(id, fName, lName, phone, email, categoryID, organization)
    {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.phone = phone;
        this.email = email;
        this.categoryID = categoryID;
        this.organization = organization;
        this.dateCreated = Date.now();
        this.slug = "/" + this.fName.split(' ').join('-').toLowerCase() + "-" + this.lName.split(' ').join('-').toLowerCase();
    }
}
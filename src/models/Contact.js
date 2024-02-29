class Contact 
{
    constructor(contactID, fName, lName, phone, email, categoryID, organization)
    {
        this.contactID = contactID;
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
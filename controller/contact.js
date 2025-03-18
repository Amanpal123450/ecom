const Contact =require("../model/contactSchema");

async function contact(req,res) {
          console.log("lll")
    try {
        const { name, email, message } = req.body;
    
        if (!name || !email || !message) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        const newContact = await Contact({ name, email, message });
        await newContact.save();
    
        res.status(201).json({ message: "Message sent successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      } 

}

module.exports={
    contact
}
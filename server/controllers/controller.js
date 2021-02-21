exports.test=(req,res)=>{
    throw new Error("Test");
    res.send({message:"hi"});
}
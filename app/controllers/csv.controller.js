 exports.uploadedFiles = (req, res)=>{
    try{
        const customers = [];
        fs.createReadStream(__basedir + '/uploads' + req.file.filename).pipe(csv.parse({headers:true})).on(
            'error', error=>{
                console.error(error)
                throw error.message;
            }
        ).on('data', row =>{
            customers.push(row);
            console.log(row);
        }).on('end', ()=>{
            // save customer to MySql/PostgreSQL database
            Customer.bulkCreate(customer).then(()=>{
                const result ={
                    status:"ok",
                    filename:req.file.originalname,
                    message: "upload successfully!",
                }
                res.json(result);
            })
        })
    }catch(error){
       
      const result ={
        status:"fail",
        filename:file.originalname,
        message:"error ->" + error.message
 
      }
     res.json(result)
    }
 }


 exports.uploadMultipleFIles = async (req, res) => {
    const message = [];

    for (const file of req.files) {
        try{
            const csvParserStream = fs.createReadStream(__basedir + '/uploads' + req.file.filename).pipe(csv.parse({headers:true}));
           var end = new Promise(function(resolve, reject){
            let customers = [];

            csvParserStream.on('data', object => {
                customers.push(object);
                console.log(object);
            });
            csvParserStream.on('end', ()=>{
                resolve(customers)
            });
            csvParserStream.on('error', error=>{
                console.error(error);
                reject
            })// or something like that. might need to close 'hash'
           })

           await (async function(){
            let customers = await end;

            await customer.bulkCreate(customers).then(()=>{
                const result ={
                    status:"ok",
                    filename:file.orginalname,
                    message:"upload successfully"
                }
                    messages.push(result);
            });
           }())
        }catch(error){
         console.log(error)

         const result = {
            status: "fail",
            filename:file.originalname,
            message:"Error =>" + error.message
         }
         messages.push(result)
        }
    }

    return res.json(messages)
    }
 
    exports.downloadFile = (req, res)=>{
        Customer.findAll({attributes:['id', 'name', "address", "age"]}).then(objects =>{
           const jsonCUstomers = JSON.parse(JSON.stringify(objecrs));
           const csvFields = ['Id, Name', "Address", "Age"];
           const json2csvParser = new Json2csvParser({csvFields});
           const csData = json2csvParser.parse(jsonCUstomers);
           
           res.setHeader('Content-dispostion', 'attachment', filename=customers.csv);
           res.set('content-Type', 'text/csv')
           res.status(200).end(csvData);
        })
    }

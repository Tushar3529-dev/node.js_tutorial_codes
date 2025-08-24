const fs =require("fs");

function logReqRes(filename){
    return (req, res, next) => {
        fs.appendFile(filename, ` \n Request: ${req.method} ${req.url}\n`, (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            }
        });
        next();
    };
}

module.exports={logReqRes};
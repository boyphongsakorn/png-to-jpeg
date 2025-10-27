// Change 'import' to 'require'
const Png = require("png-js");
const { encode } = require("jpeg-js");

// Change 'export default' to 'module.exports'
module.exports = opts => {
    // Set default quality
    opts = Object.assign({quality: 50}, opts);

    // Input validation for quality
    if (!Number.isInteger(opts.quality)) {
        return Promise.reject(new Error("'quality' only accepts integers"));
    }

    if (opts.quality < 1 || opts.quality > 100) {
        return Promise.reject(new Error("'quality' has to be between 1-100"));
    }

    // Return the function that processes the buffer
    return buf => {
        let png = new Png(buf);
        // Decode the PNG buffer
        return new Promise(resolve => png.decode(resolve))
        .then(data => 
            // Encode to JPEG using jpeg-js
            encode({data, width: png.width, height: png.height}, opts.quality).data
        );
    }
}
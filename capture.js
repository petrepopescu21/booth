var exec = require('async-child-process').execAsync

module.exports.one = (filename) => exec('gphoto2 --capture-image-and-download --filename '+filename)

module.exports.many = async (count) => {
    var x = count
    var limit = 15
    while(x) 
    {
        if(!limit) 
            break
        else {
            var message = await exec('gphoto2 --capture-image-and-download --filename "images/'+(count-x).toString()+'.jpg"')
            if (message.stdout !== '' && message.stderr === '')
                x--
        }
    }
}